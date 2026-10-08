'use strict';
// jQuery é utilizado nos filtros; Bootstrap controla o carrossel, modal e offcanvas.
document.addEventListener('DOMContentLoaded', () => {
  const itens = [];
  const quantidade = document.getElementById('quantidadeCarrinho');
  const lista = document.getElementById('itensCarrinho');
  const vazio = document.getElementById('carrinhoVazio');
  const toastEl = document.getElementById('toastCarrinho');
  const toast = toastEl && window.bootstrap ? bootstrap.Toast.getOrCreateInstance(toastEl) : null;
  const painelEl = document.getElementById('painelCarrinho');
  const painel = painelEl && window.bootstrap ? bootstrap.Offcanvas.getOrCreateInstance(painelEl) : null;
  function atualizarCarrinho(){
    quantidade.textContent = String(itens.length);
    lista.replaceChildren();
    itens.forEach((nome) => {const li=document.createElement('li');li.textContent=nome;lista.appendChild(li);});
    vazio.hidden=itens.length>0;
  }
  document.querySelectorAll('.buy-button').forEach(botao=>botao.addEventListener('click',()=>{
    const produto=botao.dataset.produto;
    itens.push(produto);atualizarCarrinho();
    document.getElementById('toastMensagem').textContent=`${produto} adicionado ao carrinho!`;
    toast?.show();
  }));
  document.getElementById('abrirCarrinho')?.addEventListener('click',()=>painel?.show());
  document.getElementById('limparCarrinho')?.addEventListener('click',()=>{itens.length=0;atualizarCarrinho();});
  atualizarCarrinho();
  document.querySelectorAll('.gallery-button').forEach(botao=>botao.addEventListener('click',()=>{
    const arquivo=botao.dataset.imagem;
    if (!/^\d-setup\.png$/.test(arquivo)) return;
    const imagem=document.getElementById('imagemAmpliada');
    imagem.src=`src/assets/imagens/${arquivo}`;
    imagem.alt=botao.querySelector('img').alt;
  }));
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link=>link.addEventListener('click',()=>{
    const nav=document.getElementById('menuPrincipal');
    if(nav?.classList.contains('show') && window.bootstrap){bootstrap.Collapse.getOrCreateInstance(nav).hide();}
  }));
  function filtrar(categoria){
    document.querySelectorAll('.filter-button').forEach(botao=>{const ativo=botao.dataset.filtro===categoria;botao.classList.toggle('ativo',ativo);botao.setAttribute('aria-pressed',String(ativo));});
    let visiveis=0;
    document.querySelectorAll('.product-item').forEach(card=>{const exibir=categoria==='todos'||card.dataset.categoria===categoria;card.classList.toggle('d-none',!exibir);if(exibir)visiveis++;});
    document.getElementById('semResultados').classList.toggle('d-none',visiveis!==0);
  }
  if(window.jQuery){
    jQuery('.filter-button').on('click',function(){filtrar(this.dataset.filtro);});
    jQuery('.category-card').on('click',function(){filtrar(this.dataset.filtro);});
  } else {
    console.warn('jQuery não carregou. Os filtros usarão JavaScript puro.');
    document.querySelectorAll('.filter-button,.category-card').forEach(botao=>botao.addEventListener('click',()=>filtrar(botao.dataset.filtro)));
  }
});
