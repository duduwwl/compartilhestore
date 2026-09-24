const money = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
const img = n => `assets/products-clean/produto-${String(n).padStart(2, '0')}.webp`;

const products = [
  {id:1,name:'Perfume Diesel Only The Brave',category:'Perfumes',price:25,oldPrice:59.9,image:img(1),badge:'ÚLTIMA UNIDADE',sizes:['50 ml'],description:'Fragrância masculina marcante em embalagem de 50 ml. Uma escolha intensa para completar sua presença.'},
  {id:2,name:'Trio Camisetas Surf',category:'Camisetas',price:99.99,oldPrice:149.9,image:img(2),badge:'3 POR 99,99',sizes:['P','M','G','GG'],description:'Combo com três camisetas casuais em cores versáteis para renovar o guarda-roupa.'},
  {id:3,name:'Kit 3 Bermudas Quiksilver Azul',category:'Bermudas',price:99.99,oldPrice:159.9,image:img(3),badge:'3 POR 99,99',sizes:['38','40','42','44'],description:'Três bermudas leves com estampas esportivas e combinação em tons de azul e preto.'},
  {id:4,name:'Kit 3 Bermudas Surf Black',category:'Bermudas',price:99.99,oldPrice:159.9,image:img(4),badge:'3 POR 99,99',sizes:['38','40','42','44'],description:'Kit de bermudas para o dia a dia com visual esportivo e ajuste confortável.'},
  {id:5,name:'Calça Jeans Destroyed Grafite',category:'Calças',price:119.99,image:img(5),badge:'NOVO',sizes:['40','42','44'],description:'Jeans grafite com lavagem estonada, detalhes destroyed e modelagem moderna.'},
  {id:6,name:'Calça Jeans Jogador Sky',category:'Calças',price:119.99,image:img(6),sizes:['38','40','42','44'],description:'Calça jeans em lavagem cinza com corte jogador, confortável e fácil de combinar.'},
  {id:7,name:'Conjunto Mizuno Branco',category:'Kits',price:89.99,oldPrice:120,image:img(7),badge:'OFERTA',sizes:['GG'],description:'Conjunto esportivo branco com camiseta e bermuda. Última peça disponível em GG.'},
  {id:8,name:'Bermuda Linho Areia',category:'Bermudas',price:39.99,image:img(8),badge:'ÚLTIMAS PEÇAS',sizes:['P','M','G'],description:'Bermuda de linho leve em tom areia, ideal para dias quentes e looks claros.'},
  {id:9,name:'Camisa Flamengo I',category:'Futebol',price:55,oldPrice:89.99,image:img(9),badge:'OFERTA PIX',sizes:['P','M','G','GG'],description:'Camisa rubro-negra com visual de jogo e tecido esportivo de secagem rápida.'},
  {id:10,name:'Camisa Corinthians II',category:'Futebol',price:55,oldPrice:70,image:img(10),badge:'OFERTA',sizes:['P','M','G','GG'],description:'Camisa branca do Corinthians com gola preta e detalhes em dourado.'},
  {id:11,name:'Chinelo Slide Croco Preto',category:'Calçados',price:59.99,image:img(11),badge:'CONFORTO',sizes:['38','39','40','41','42'],description:'Slide preto leve, macio e confortável para acompanhar sua rotina.'},
  {id:12,name:'Boné Mizuno Heritage',category:'Acessórios',price:59.99,image:img(12),badge:'NOVO',sizes:['Único'],description:'Boné de aba curva com regulagem traseira, disponível em cores selecionadas.'},
  {id:13,name:'Conjunto Street Grafite & Rosa',category:'Kits',price:99.99,oldPrice:119.99,image:img(13),badge:'OFERTA',sizes:['P','M','G','GG'],description:'Conjunto street em moletinho leve com estampa maxi rosa e modelagem solta.'},
  {id:14,name:'Kit Gangster Navy',category:'Kits',price:109.99,image:img(14),badge:'KIT COMPLETO',sizes:['P','M','G','GG'],description:'Camiseta navy estampada e bermuda azul: combinação pronta para o fim de semana.'},
  {id:15,name:'Conjunto Street Black',category:'Kits',price:99.99,oldPrice:119.99,image:img(15),badge:'MAIS VENDIDO',sizes:['P','M','G','GG'],description:'Conjunto preto com estampa de traço branco, tecido leve e caimento urbano.'},
  {id:16,name:'Camiseta Nike Minimal Black',category:'Camisetas',price:69.99,image:img(16),badge:'NOVO',sizes:['P','M','G','GG'],description:'Camiseta preta de modelagem confortável com arte minimalista no peito.'},
  {id:17,name:'Kit Manchester City',category:'Futebol',price:99.99,image:img(17),badge:'KIT',sizes:['P','M','G','GG'],description:'Kit azul e branco com camisa e short inspirado no Manchester City.'},
  {id:18,name:'Kit Chelsea Away',category:'Futebol',price:99.99,image:img(18),badge:'KIT',sizes:['P','M','G','GG'],description:'Kit completo do Chelsea em marinho e branco, com tecido esportivo.'},
  {id:19,name:'Camisa Cruzeiro Treino',category:'Futebol',price:69.99,image:img(19),badge:'P–M',sizes:['P','M'],description:'Camisa de treino azul do Cruzeiro, leve e respirável. Disponível em P e M.'},
  {id:20,name:'Look Essential Chumbo',category:'Kits',price:149.99,image:img(20),badge:'LOOK COMPLETO',sizes:['P','M','G'],description:'Camiseta premium chumbo e calça jeans azul para um visual limpo e atual.'},
  {id:21,name:'Chuteira Air Zoom Prata',category:'Calçados',price:249.99,image:img(21),badge:'LANÇAMENTO',sizes:['38','39','40','41','42'],description:'Chuteira de campo em prata com detalhes neon, ajuste firme e visual de velocidade.'},
  {id:22,name:'Chuteira Air Zoom Turquesa',category:'Calçados',price:249.99,image:img(22),badge:'LANÇAMENTO',sizes:['38','39','40','41','42'],description:'Chuteira turquesa com detalhes preto e roxo para quem quer se destacar em campo.'},
  {id:25,name:'Kit Mizuno Cinza & Azul',category:'Kits',price:149.99,image:img(25),badge:'NOVO',sizes:['P','M','G','GG'],description:'Kit esportivo completo com camiseta, bermuda e visual coordenado em cinza e azul.'},
  {id:26,name:'Kit Lacoste Branco & Verde',category:'Kits',price:159.99,image:img(26),badge:'PREMIUM',sizes:['P','M','G','GG'],description:'Polo branca, bermuda verde e boné: um conjunto fresco e sofisticado.'},
  {id:27,name:'Kit Lacoste Marinho',category:'Kits',price:159.99,image:img(27),badge:'PREMIUM',sizes:['P','M','G','GG'],description:'Polo marinho com faixa lateral, bermuda coordenada e boné branco.'}
];

const state = { search:'', category:'Todos', checkedCategories:new Set(), sizes:new Set(), maxPrice:300, saleOnly:false, sort:'featured', cart:JSON.parse(localStorage.getItem('compartilhe-cart') || '[]'), wishlist:new Set(JSON.parse(localStorage.getItem('compartilhe-wishlist') || '[]')), activeProduct:null, activeSize:null };
state.cart = state.cart.filter(item => products.some(product => product.id === item.id));
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const categories = ['Todos', ...new Set(products.map(p => p.category))];
const commonSizes = ['P','M','G','GG','38','40','42','44'];

function productCard(p){
  const sale = p.oldPrice && p.oldPrice > p.price;
  return `<article class="product-card reveal visible" data-product="${p.id}"><div class="product-media"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-badge ${sale?'sale':''}">${p.badge || 'NOVIDADE'}</span><button class="wishlist ${state.wishlist.has(p.id)?'active':''}" data-wish="${p.id}" aria-label="Favoritar ${p.name}">${state.wishlist.has(p.id)?'♥':'♡'}</button><button class="quick-add" data-quick="${p.id}">VER OPÇÕES</button></div><div class="product-info"><span class="product-category">${p.category}</span><h3 class="product-name">${p.name}</h3><div class="product-price"><b>${money(p.price)}</b>${p.oldPrice?`<del>${money(p.oldPrice)}</del>`:''}</div><small class="product-installments">ou 3x de ${money(p.price/3)} sem juros</small></div></article>`;
}

function filteredProducts(){
  let list=products.filter(p=>{
    const text=(p.name+' '+p.category).toLowerCase();
    const categoryOk=state.category==='Todos'||p.category===state.category;
    const checksOk=!state.checkedCategories.size||state.checkedCategories.has(p.category);
    const sizesOk=!state.sizes.size||p.sizes.some(s=>state.sizes.has(s));
    return text.includes(state.search.toLowerCase())&&categoryOk&&checksOk&&sizesOk&&p.price<=state.maxPrice&&(!state.saleOnly||p.oldPrice);
  });
  if(state.sort==='price-low') list.sort((a,b)=>a.price-b.price);
  if(state.sort==='price-high') list.sort((a,b)=>b.price-a.price);
  if(state.sort==='name') list.sort((a,b)=>a.name.localeCompare(b.name));
  if(state.sort==='newest') list.sort((a,b)=>b.id-a.id);
  return list;
}

function renderProducts(){
  const list=filteredProducts();
  $('#productGrid').innerHTML=list.map(productCard).join('');
  $('#resultCount').textContent=`${list.length} produto${list.length===1?'':'s'}`;
  $('#activeFilterText').textContent=state.search?`Busca: “${state.search}”`:state.category==='Todos'?'Todos os produtos':state.category;
  $('#emptyState').hidden=!!list.length;
  bindProductActions();
}

function renderFilterUI(){
  $('#categoryTabs').innerHTML=categories.map(c=>`<button role="tab" aria-selected="${state.category===c}" class="${state.category===c?'active':''}" data-tab="${c}">${c}</button>`).join('');
  $('#categoryChecks').innerHTML=categories.slice(1).map(c=>`<label class="check-row"><span><input type="checkbox" value="${c}" ${state.checkedCategories.has(c)?'checked':''}>${c}</span><span>${products.filter(p=>p.category===c).length}</span></label>`).join('');
  $('#sizeFilters').innerHTML=commonSizes.map(s=>`<button class="${state.sizes.has(s)?'active':''}" data-size-filter="${s}">${s}</button>`).join('');
  $$('[data-tab]').forEach(btn=>btn.onclick=()=>{state.category=btn.dataset.tab;renderFilterUI();renderProducts()});
  $$('#categoryChecks input').forEach(input=>input.onchange=()=>{input.checked?state.checkedCategories.add(input.value):state.checkedCategories.delete(input.value);renderProducts()});
  $$('[data-size-filter]').forEach(btn=>btn.onclick=()=>{state.sizes.has(btn.dataset.sizeFilter)?state.sizes.delete(btn.dataset.sizeFilter):state.sizes.add(btn.dataset.sizeFilter);renderFilterUI();renderProducts()});
}

function bindProductActions(){
  $$('[data-quick]').forEach(b=>b.onclick=()=>openProduct(Number(b.dataset.quick)));
  $$('[data-product]').forEach(card=>card.querySelector('img').onclick=()=>openProduct(Number(card.dataset.product)));
  $$('[data-wish]').forEach(b=>b.onclick=()=>{const id=Number(b.dataset.wish);state.wishlist.has(id)?state.wishlist.delete(id):state.wishlist.add(id);localStorage.setItem('compartilhe-wishlist',JSON.stringify([...state.wishlist]));renderProducts()});
}

function openProduct(id){
  const p=products.find(item=>item.id===id); state.activeProduct=p; state.activeSize=p.sizes.length===1?p.sizes[0]:null;
  $('#modalImage').src=p.image;$('#modalImage').alt=p.name;$('#modalCategory').textContent=p.category;$('#modalProductName').textContent=p.name;$('#modalPrice').textContent=money(p.price);$('#modalOldPrice').textContent=p.oldPrice?money(p.oldPrice):'';$('#modalInstallments').textContent=`ou 3x de ${money(p.price/3)} sem juros`;$('#modalDescription').textContent=p.description;$('#modalBadge').textContent=p.badge||'NOVIDADE';
  $('#modalSizes').innerHTML=p.sizes.map(s=>`<button data-modal-size="${s}" class="${state.activeSize===s?'active':''}">${s}</button>`).join('');
  $$('[data-modal-size]').forEach(b=>b.onclick=()=>{state.activeSize=b.dataset.modalSize;$$('[data-modal-size]').forEach(x=>x.classList.toggle('active',x===b))});
  openLayer($('#productModal'));
}

function addToCart(product,size){
  if(!size){showToast('Escolha um tamanho para continuar');return false}
  const key=`${product.id}-${size}`; const found=state.cart.find(i=>i.key===key); found?found.qty++:state.cart.push({key,id:product.id,size,qty:1}); saveCart(); showToast(`${product.name} • ${size}`); return true;
}
function saveCart(){localStorage.setItem('compartilhe-cart',JSON.stringify(state.cart));renderCart()}
function renderCart(){
  const count=state.cart.reduce((s,i)=>s+i.qty,0);const total=state.cart.reduce((s,i)=>s+products.find(p=>p.id===i.id).price*i.qty,0);
  $('#cartCount').textContent=count;$('#mobileCartCount').textContent=`${count} ${count===1?'item':'itens'}`;$('#mobileCartTotal').textContent=money(total);$('#mobileCartBar').classList.toggle('show',count>0);
  $('#cartEmpty').hidden=count>0;$('#cartFooter').hidden=count===0;$('#cartSubtotal').textContent=money(total);
  $('#cartItems').innerHTML=state.cart.map(i=>{const p=products.find(x=>x.id===i.id);return `<div class="cart-item"><img src="${p.image}" alt="${p.name}"><div class="cart-item-info"><b>${p.name}</b><small>Tamanho: ${i.size}</small><div class="qty"><button data-qty="${i.key}" data-delta="-1">−</button><span>${i.qty}</span><button data-qty="${i.key}" data-delta="1">+</button></div></div><div class="cart-item-price"><b>${money(p.price*i.qty)}</b><button data-remove="${i.key}">Remover</button></div></div>`}).join('');
  $$('[data-qty]').forEach(b=>b.onclick=()=>{const item=state.cart.find(i=>i.key===b.dataset.qty);item.qty+=Number(b.dataset.delta);if(item.qty<1)state.cart=state.cart.filter(i=>i!==item);saveCart()});
  $$('[data-remove]').forEach(b=>b.onclick=()=>{state.cart=state.cart.filter(i=>i.key!==b.dataset.remove);saveCart()});
}

function openLayer(el){$('#overlay').classList.add('open');el.classList.add('open');el.setAttribute('aria-hidden','false');document.body.classList.add('locked')}
function closeLayers(){$('#overlay').classList.remove('open');$$('.cart-drawer,.product-modal,.mobile-menu,.filters').forEach(el=>{el.classList.remove('open');el.setAttribute('aria-hidden','true')});document.body.classList.remove('locked')}
let toastTimer;function showToast(text){$('#toastText').textContent=text;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),2600)}
function clearAll(){state.category='Todos';state.checkedCategories.clear();state.sizes.clear();state.maxPrice=300;state.saleOnly=false;state.search='';$('#globalSearch').value='';$('#priceRange').value=300;$('#priceOutput').textContent=money(300);$('#saleOnly').checked=false;renderFilterUI();renderProducts()}

function init(){
  renderFilterUI();renderProducts();renderCart();
  $('#priceRange').oninput=e=>{state.maxPrice=Number(e.target.value);$('#priceOutput').textContent=money(state.maxPrice);renderProducts()};
  $('#saleOnly').onchange=e=>{state.saleOnly=e.target.checked;renderProducts()};$('#sortSelect').onchange=e=>{state.sort=e.target.value;renderProducts()};
  $('#globalSearch').oninput=e=>{state.search=e.target.value;renderProducts();document.querySelector('#produtos').scrollIntoView({behavior:'smooth'})};
  $('#searchToggle').onclick=()=>{$('#searchPanel').classList.toggle('open');setTimeout(()=>$('#globalSearch').focus(),100)};$('#closeSearch').onclick=()=>$('#searchPanel').classList.remove('open');
  $('#cartToggle').onclick=$('#mobileCartBar').onclick=()=>openLayer($('#cartDrawer'));$('#closeCart').onclick=$('#continueShopping').onclick=closeLayers;$('#keepShopping').onclick=()=>{closeLayers();$('#produtos').scrollIntoView({behavior:'smooth'})};
  $('#menuBtn').onclick=()=>openLayer($('#mobileMenu'));$('#closeMenu').onclick=closeLayers;$('#overlay').onclick=closeLayers;$('#modalClose').onclick=closeLayers;
  $$('#mobileMenu>a').forEach(a=>a.onclick=closeLayers);$('#filterMobile').onclick=()=>openLayer($('#filters'));$('#closeFilters').onclick=closeLayers;
  $('#clearFilters').onclick=$('#emptyClear').onclick=clearAll;
  $$('.category-card,.category-jump').forEach(b=>b.onclick=()=>{state.category=b.dataset.category;renderFilterUI();renderProducts();$('#produtos').scrollIntoView({behavior:'smooth'})});
  $$('.quick-view-trigger').forEach(b=>b.onclick=()=>openProduct(Number(b.dataset.id)));
  $('#modalAdd').onclick=()=>{if(addToCart(state.activeProduct,state.activeSize))closeLayers()};
  $('#modalWhatsapp').onclick=()=>window.open(`https://wa.me/message/FGE5K6V6CN2TH1?text=${encodeURIComponent('Olá! Quero saber mais sobre '+state.activeProduct.name+'.')}`,'_blank');
  $('#checkoutButton').onclick=()=>{window.location.href='checkout.html'};
  if($('#newsletterForm')) $('#newsletterForm').onsubmit=e=>{e.preventDefault();showToast('Cadastro realizado. Você está na lista!');e.target.reset()};
  if($('#accordion')) $('#accordion').addEventListener('toggle',e=>{if(e.target.open)$$('#accordion details').filter(d=>d!==e.target).forEach(d=>d.open=false)},true);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeLayers();$('#searchPanel').classList.remove('open')}});
  window.addEventListener('scroll',()=>$('.site-header').classList.toggle('scrolled',scrollY>20));
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('visible',entry.isIntersecting)),{threshold:.08});$$('.reveal').forEach(el=>observer.observe(el));
}
document.addEventListener('DOMContentLoaded',init);
