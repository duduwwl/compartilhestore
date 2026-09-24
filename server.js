const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = __dirname;
const envFile = path.join(root, '.env');

if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
}

const port = Number(process.env.PORT || 4173);
const originCep = '37200036';
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function json(res, status, body) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  res.end(JSON.stringify(body));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1_000_000) reject(new Error('Payload muito grande.'));
    });
    req.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}); }
      catch { reject(new Error('JSON inválido.')); }
    });
    req.on('error', reject);
  });
}

function packageFor(id) {
  if ([5, 6].includes(id)) return { width: 25, height: 7, length: 32, weight: 0.65 };
  if ([11, 21, 22].includes(id)) return { width: 22, height: 13, length: 34, weight: 0.8 };
  if ([7, 13, 14, 15, 17, 18, 20, 25, 26, 27].includes(id)) return { width: 28, height: 10, length: 35, weight: 0.9 };
  return { width: 22, height: 6, length: 30, weight: 0.4 };
}

async function shippingQuote(req, res) {
  if (!process.env.MELHOR_ENVIO_TOKEN) {
    return json(res, 503, { message: 'Token do Melhor Envio ainda não configurado.' });
  }

  const body = await readJson(req);
  const destinationCep = String(body.destinationCep || '').replace(/\D/g, '');
  const items = Array.isArray(body.items) ? body.items : [];
  if (destinationCep.length !== 8 || !items.length) {
    return json(res, 400, { message: 'CEP e itens do carrinho são obrigatórios.' });
  }

  const products = items.map((item, index) => {
    const id = Number(item.id);
    const dimensions = packageFor(id);
    return {
      id: String(id || index + 1),
      ...dimensions,
      insurance_value: Math.max(0, Number(item.price) || 0),
      quantity: Math.max(1, Number(item.quantity) || 1)
    };
  });

  const sandbox = process.env.MELHOR_ENVIO_SANDBOX === 'true';
  const endpoint = sandbox
    ? 'https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate'
    : 'https://melhorenvio.com.br/api/v2/me/shipment/calculate';
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.MELHOR_ENVIO_TOKEN}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent': process.env.MELHOR_ENVIO_USER_AGENT || 'Compartilhe Store (contato@compartilhestore.com.br)'
    },
    body: JSON.stringify({
      from: { postal_code: originCep },
      to: { postal_code: destinationCep },
      products,
      options: { receipt: false, own_hand: false }
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) return json(res, response.status, { message: 'Não foi possível cotar o frete.', details: data.message });

  const options = data
    .filter(option => option && !option.error && option.price)
    .map(option => ({
      id: option.id,
      name: option.name,
      company: option.company && option.company.name,
      price: Number(option.custom_price || option.price),
      days: `${option.custom_delivery_time || option.delivery_time} dias úteis`
    }));

  if (!options.length) return json(res, 422, { message: 'Nenhuma transportadora atende este CEP.' });
  return json(res, 200, { source: 'melhor-envio', originCep, options });
}

async function createPayment(req, res) {
  if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
    return json(res, 503, { message: 'Credencial privada do Mercado Pago ainda não configurada.' });
  }

  const input = await readJson(req);
  const amount = Number(input.transaction_amount);
  if (!Number.isFinite(amount) || amount <= 0 || !input.payer || !input.payment_method_id) {
    return json(res, 400, { message: 'Dados do pagamento incompletos.' });
  }

  const allowed = {
    transaction_amount: Number(amount.toFixed(2)),
    token: input.token,
    description: String(input.description || 'Pedido Compartilhe Store').slice(0, 120),
    installments: Math.max(1, Number(input.installments) || 1),
    payment_method_id: input.payment_method_id,
    issuer_id: input.issuer_id,
    payer: input.payer,
    metadata: input.metadata
  };
  Object.keys(allowed).forEach(key => allowed[key] === undefined && delete allowed[key]);

  const response = await fetch('https://api.mercadopago.com/v1/payments', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      'X-Idempotency-Key': req.headers['x-idempotency-key'] || crypto.randomUUID()
    },
    body: JSON.stringify(allowed)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) return json(res, response.status, { message: data.message || 'Pagamento não autorizado.', cause: data.cause });
  return json(res, 201, data);
}

function serveStatic(req, res) {
  const requestPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const relative = requestPath === '/' ? 'index.html' : requestPath.replace(/^\/+/, '');
  const file = path.resolve(root, relative);
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Página não encontrada.');
  }
  res.writeHead(200, {
    'Content-Type': contentTypes[path.extname(file).toLowerCase()] || 'application/octet-stream',
    'Cache-Control': 'no-cache',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  });
  fs.createReadStream(file).pipe(res);
}

const server = http.createServer(async (req, res) => {
  try {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    if (req.method === 'GET' && pathname === '/api/config') {
      return json(res, 200, {
        paymentsEnabled: Boolean(process.env.MERCADO_PAGO_PUBLIC_KEY && process.env.MERCADO_PAGO_ACCESS_TOKEN),
        shippingEnabled: Boolean(process.env.MELHOR_ENVIO_TOKEN),
        mercadoPagoPublicKey: process.env.MERCADO_PAGO_PUBLIC_KEY || null,
        originCep
      });
    }
    if (req.method === 'POST' && pathname === '/api/shipping-quote') return await shippingQuote(req, res);
    if (req.method === 'POST' && pathname === '/api/payment') return await createPayment(req, res);
    if (!['GET', 'HEAD'].includes(req.method)) return json(res, 405, { message: 'Método não permitido.' });
    return serveStatic(req, res);
  } catch (error) {
    return json(res, 500, { message: 'Erro interno ao processar a solicitação.', details: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Compartilhe Store: http://127.0.0.1:${port}`);
});
