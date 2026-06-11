const elementosHome = {
  searchInput: document.getElementById('search-input'),
  categorySelect: document.getElementById('category-select'),
  sortSelect: document.getElementById('sort-select'),
  resultsCount: document.getElementById('results-count'),
  productsGrid: document.getElementById('products-grid'),
  loadingState: document.getElementById('loading-state'),
  emptyState: document.getElementById('empty-state'),
  errorState: document.getElementById('error-state'),
  btnRetry: document.getElementById('btn-retry'),
  btnClearFilters: document.getElementById('btn-clear-filters')
};

let todosProdutos = [];
let termoBusca = '';
let categoriaAtual = '';
let ordenacaoAtual = '';

const iconeCoracao = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
`;

function filtrarEOrdenar() {
  let resultado = [...todosProdutos];

  resultado = filtrarProdutos(resultado, termoBusca);

  if (categoriaAtual) {
    resultado = resultado.filter(p => p.category === categoriaAtual);
  }

  resultado = ordenarProdutos(resultado, ordenacaoAtual);

  return resultado;
}

function atualizarContagem(quantidade) {
  elementosHome.resultsCount.textContent = `${quantidade} ${quantidade === 1 ? 'peça' : 'peças'}`;
}

function criarCard(produto) {
  const favoritado = ehFavorito(produto.id);
  const card = document.createElement('article');
  card.className = 'product-card';
  card.setAttribute('data-id', produto.id);

  card.innerHTML = `
    <a href="produto.html?id=${produto.id}" class="product-card-link" aria-label="Ver ${produto.title}">
      <div class="product-image-wrap">
        <img class="product-image" src="${produto.thumbnail}" alt="" loading="lazy">
      </div>
    </a>
    <button
      class="favorite-btn"
      aria-label="${favoritado ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}"
      aria-pressed="${favoritado ? 'true' : 'false'}"
    >
      ${iconeCoracao}
    </button>
    <div class="product-body">
      <p class="product-category">${produto.category}</p>
      <h3 class="product-title">${produto.title}</h3>
      <p class="product-price">${formatarPreco(produto.price)}</p>
    </div>
  `;

  const btnFav = card.querySelector('.favorite-btn');
  btnFav.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    alternarFavorito(produto.id);
    const agoraFavoritado = ehFavorito(produto.id);
    btnFav.setAttribute('aria-pressed', agoraFavoritado ? 'true' : 'false');
    btnFav.setAttribute('aria-label', agoraFavoritado ? 'Remover dos favoritos' : 'Adicionar aos favoritos');
    btnFav.classList.remove('animate');
    void btnFav.offsetWidth;
    btnFav.classList.add('animate');
  });

  return card;
}

function renderizarProdutos() {
  const produtos = filtrarEOrdenar();
  const grid = elementosHome.productsGrid;
  grid.innerHTML = '';

  if (produtos.length === 0) {
    grid.hidden = true;
    elementosHome.emptyState.hidden = false;
    atualizarContagem(0);
    return;
  }

  grid.hidden = false;
  elementosHome.emptyState.hidden = true;

  const fragmento = document.createDocumentFragment();
  produtos.forEach(produto => {
    fragmento.appendChild(criarCard(produto));
  });
  grid.appendChild(fragmento);

  animarEntrada(Array.from(grid.querySelectorAll('.product-card')), 0, 60);
  atualizarContagem(produtos.length);
}

function popularCategorias() {
  const categorias = extrairCategorias(todosProdutos);
  const select = elementosHome.categorySelect;
  select.innerHTML = '<option value="">Todas as categorias</option>' +
    categorias.map(cat => `<option value="${cat}">${cat}</option>`).join('');
}

function mostrarLoading(mostrar) {
  elementosHome.loadingState.hidden = !mostrar;
  elementosHome.productsGrid.hidden = mostrar;
  elementosHome.emptyState.hidden = true;
  elementosHome.errorState.hidden = true;
}

function mostrarErro(mostrar) {
  elementosHome.errorState.hidden = !mostrar;
  elementosHome.loadingState.hidden = mostrar;
  elementosHome.productsGrid.hidden = mostrar;
  elementosHome.emptyState.hidden = true;
}

async function inicializar() {
  try {
    mostrarLoading(true);
    todosProdutos = await carregarProdutos();
    popularCategorias();
    mostrarLoading(false);
    renderizarProdutos();
  } catch (erro) {
    console.error(erro);
    mostrarErro(true);
  }
}

elementosHome.searchInput.addEventListener('input', debounce((e) => {
  termoBusca = e.target.value;
  renderizarProdutos();
}, 200));

elementosHome.categorySelect.addEventListener('change', (e) => {
  categoriaAtual = e.target.value;
  renderizarProdutos();
});

elementosHome.sortSelect.addEventListener('change', (e) => {
  ordenacaoAtual = e.target.value;
  renderizarProdutos();
});

elementosHome.btnRetry.addEventListener('click', inicializar);

elementosHome.btnClearFilters.addEventListener('click', () => {
  elementosHome.searchInput.value = '';
  elementosHome.categorySelect.value = '';
  elementosHome.sortSelect.value = '';
  termoBusca = '';
  categoriaAtual = '';
  ordenacaoAtual = '';
  renderizarProdutos();
});

document.addEventListener('DOMContentLoaded', () => {
  renderizarHeader();
  renderizarFooter();
  inicializar();
});
