# Compartilhe Store

Loja virtual responsiva criada a partir das referências enviadas.

## Como visualizar

É necessário servir a pasta pelo servidor Node incluído, pois o checkout usa rotas privadas para frete e pagamento:

```powershell
node server.js
```

Depois acesse `http://127.0.0.1:4173/`.

## O que está pronto

- Landing page responsiva com menu de três pontos e logo centralizada
- Página exclusiva `catalogo.html` com 25 produtos
- Fotos tratadas, centralizadas e com fundo branco
- Busca, categorias, filtros por tamanho/preço/oferta e ordenação
- Favoritos, modal de produto, tamanhos e carrinho persistente
- Checkout interno com identificação, endereço, retirada na loja ou entrega
- Consulta automática de endereço por CEP
- Cotação de frete pelo Melhor Envio, saindo do CEP 37200-036 em Lavras–MG
- Pagamento via Pix e rota segura para cartão pelo Mercado Pago
- Resumo do pedido, frete, total, parcelamento, cupom e validações

## Ativação de frete e pagamentos reais

1. Copie `config.example.env` para `.env`.
2. Preencha o token do Melhor Envio e as credenciais do Mercado Pago.
3. Em produção, execute o servidor atrás de HTTPS e configure o domínio/webhooks nas duas plataformas.
4. Nunca envie `.env` para o repositório nem coloque o access token no JavaScript do navegador.

Sem credenciais, o checkout permanece navegável em modo demonstração. O frete mostra estimativas locais/regionais e o botão final explica o que falta ativar. Com o token do Melhor Envio, os valores vêm da cotação oficial em tempo real.

## Antes de publicar

Confirme preços, tamanhos, estoque, pesos/dimensões, horários, política de troca e dados fiscais. Os preços que não estavam legíveis nas referências foram preenchidos para demonstração. Ajuste os pesos e dimensões da função `packageFor` em `server.js` para refletir as embalagens reais antes de cobrar frete.

O formulário de newsletter ainda precisa ser conectado a uma plataforma de e-mail. Para cartões, use os componentes seguros do Mercado Pago com a chave pública; os dados de cartão não devem passar pelos seus próprios campos HTML nem ser armazenados pelo site.
