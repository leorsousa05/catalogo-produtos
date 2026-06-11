const elementosProduto = {
  loading: document.getElementById('loading-state'),
  content: document.getElementById('product-content'),
  error: document.getElementById('error-state'),
  breadcrumbCategory: document.getElementById('breadcrumb-category'),
  breadcrumbTitle: document.getElementById('breadcrumb-title'),
  mainImage: document.getElementById('main-image'),
  thumbnails: document.getElementById('thumbnails'),
  category: document.getElementById('product-category'),
  title: document.getElementById('product-title'),
  price: document.getElementById('product-price'),
  description: document.getElementById('product-description'),
  specBrand: document.getElementById('spec-brand'),
  specRating: document.getElementById('spec-rating'),
  specStock: document.getElementById('spec-stock'),
  qtyInput: document.getElementById('qty-input'),
  qtyMinus: document.getElementById('qty-minus'),
  qtyPlus: document.getElementById('qty-plus'),
  btnAddCart: document.getElementById('btn-add-cart')
};

let produtoAtual = null;

function atualizarQuantidade(delta) {
  let valor = parseInt(elementosProduto.qtyInput.value, 10) || 1;
  valor = Math.max(1, Math.min(99, valor + delta));
  elementosProduto.qtyInput.value = valor;
}

function trocarImagem(src) {
  elementosProduto.mainImage.style.opacity = '0';
  setTimeout(() => {
    elementosProduto.mainImage.src = src;
    elementosProduto.mainImage.onload = () => {
      elementosProduto.mainImage.style.opacity = '1';
    };
  }, 200);
}

function renderizarThumbnails(imagens) {
  elementosProduto.thumbnails.innerHTML = '';
  if (!Array.isArray(imagens) || imagens.length === 0) return;

  imagens.slice(0, 4).forEach((src, idx) => {
    const btn = document.createElement('button');
    btn.className = 'detail-thumb' + (idx === 0 ? ' active' : '');
    btn.type = 'button';
    btn.setAttribute('aria-label', `Ver imagem ${idx + 1}`);
    btn.innerHTML = `<img src="${src}" alt="" loading="lazy">`;
    btn.addEventListener('click', () => {
      elementosProduto.thumbnails.querySelectorAll('.detail-thumb').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      trocarImagem(src);
    });
    elementosProduto.thumbnails.appendChild(btn);
  });
}

function renderizarProduto(produto) {
  produtoAtual = produto;

  elementosProduto.breadcrumbCategory.textContent = produto.category;
  elementosProduto.breadcrumbCategory.href = `index.html?categoria=${encodeURIComponent(produto.category)}`;
  elementosProduto.breadcrumbTitle.textContent = produto.title;

  elementosProduto.mainImage.src = produto.thumbnail;
  elementosProduto.mainImage.alt = produto.title;

  renderizarThumbnails(produto.images && produto.images.length ? produto.images : [produto.thumbnail]);

  elementosProduto.category.textContent = produto.category;
  elementosProduto.title.textContent = produto.title;
  elementosProduto.price.textContent = formatarPreco(produto.price);
  elementosProduto.description.textContent = produto.description;

  elementosProduto.specBrand.textContent = produto.brand || '—';
  elementosProduto.specRating.textContent = `${produto.rating || 0} / 5`;
  elementosProduto.specStock.textContent = produto.stock || '—';

  elementosProduto.loading.hidden = true;
  elementosProduto.error.hidden = true;
  elementosProduto.content.hidden = false;
}

function mostrarErro() {
  elementosProduto.loading.hidden = true;
  elementosProduto.content.hidden = true;
  elementosProduto.error.hidden = false;
}

async function inicializar() {
  const id = lerParametroUrl('id');
  if (!id) {
    mostrarErro();
    return;
  }

  try {
    const produto = await carregarProduto(id);
    if (!produto || !produto.id) {
      mostrarErro();
      return;
    }
    renderizarProduto(produto);
  } catch (erro) {
    console.error(erro);
    mostrarErro();
  }
}

elementosProduto.qtyMinus.addEventListener('click', () => atualizarQuantidade(-1));
elementosProduto.qtyPlus.addEventListener('click', () => atualizarQuantidade(1));

elementosProduto.qtyInput.addEventListener('change', () => {
  let valor = parseInt(elementosProduto.qtyInput.value, 10) || 1;
  valor = Math.max(1, Math.min(99, valor));
  elementosProduto.qtyInput.value = valor;
});

elementosProduto.btnAddCart.addEventListener('click', () => {
  if (!produtoAtual) return;
  const quantidade = parseInt(elementosProduto.qtyInput.value, 10) || 1;
  adicionarAoCarrinho(produtoAtual.id, quantidade);
  atualizarContadorCarrinho();
  mostrarToast(`${produtoAtual.title} adicionado à sacola`);
});

document.addEventListener('DOMContentLoaded', () => {
  renderizarHeader();
  renderizarFooter();
  inicializar();
});
