const elementos = {
  gridProdutos: document.getElementById('products-grid'),
  gridFavoritos: document.getElementById('favorites-grid'),
  secaoProdutos: document.getElementById('products-section'),
  secaoFavoritos: document.getElementById('favorites-section'),
  estadoVazio: document.getElementById('empty-state'),
  estadoVazioFavoritos: document.getElementById('empty-favorites'),
  estadoErro: document.getElementById('error-state'),
  inputBusca: document.getElementById('search-input'),
  btnTodos: document.getElementById('btn-all'),
  btnFavoritos: document.getElementById('btn-favorites'),
  btnRetry: document.getElementById('btn-retry'),
  btnBrowse: document.getElementById('btn-browse'),
  contadorFavoritos: document.getElementById('fav-count'),
  tituloSecaoProdutos: document.getElementById('products-heading')
};

let todosProdutos = [];
let viewAtual = 'todos';
let termoBusca = '';

const iconeCoracao = `
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
`;

function formatarPreco(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'USD'
  }).format(valor);
}

function normalizarTexto(texto) {
  return String(texto || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function filtrarProdutos(produtos) {
  if (!termoBusca.trim()) return produtos;
  const termo = normalizarTexto(termoBusca);
  return produtos.filter(p => normalizarTexto(p.title).includes(termo));
}

function criarCard(produto) {
  const favoritado = ehFavorito(produto.id);
  const card = document.createElement('article');
  card.className = 'product-card';
  card.setAttribute('data-id', produto.id);

  card.innerHTML = `
    <div class="product-image-wrap">
      <img class="product-image" src="${produto.thumbnail}" alt="" loading="lazy">
      <button
        class="favorite-btn"
        aria-label="${favoritado ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}"
        aria-pressed="${favoritado ? 'true' : 'false'}"
        title="${favoritado ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}"
      >
        ${iconeCoracao}
      </button>
    </div>
    <div class="product-body">
      <p class="product-category">${produto.category}</p>
      <h3 class="product-title">${produto.title}</h3>
      <p class="product-price">${formatarPreco(produto.price)}</p>
    </div>
  `;

  const btnFav = card.querySelector('.favorite-btn');
  btnFav.addEventListener('click', () => {
    alternarFavorito(produto.id);
    const agoraFavoritado = ehFavorito(produto.id);
    btnFav.setAttribute('aria-pressed', agoraFavoritado ? 'true' : 'false');
    btnFav.setAttribute('aria-label', agoraFavoritado ? 'Remover dos favoritos' : 'Adicionar aos favoritos');
    btnFav.setAttribute('title', agoraFavoritado ? 'Remover dos favoritos' : 'Adicionar aos favoritos');
    atualizarContadorFavoritos();
    if (viewAtual === 'favoritos') {
      renderizarFavoritos();
    }
  });

  return card;
}

function renderizarGrid(container, produtos) {
  container.innerHTML = '';
  if (produtos.length === 0) {
    return false;
  }
  const fragmento = document.createDocumentFragment();
  produtos.forEach(produto => {
    fragmento.appendChild(criarCard(produto));
  });
  container.appendChild(fragmento);
  return true;
}

function atualizarContadorFavoritos() {
  const total = obterFavoritos().length;
  elementos.contadorFavoritos.textContent = total;
  elementos.contadorFavoritos.hidden = total === 0;
}

function renderizarTodos() {
  const filtrados = filtrarProdutos(todosProdutos);
  const temResultados = renderizarGrid(elementos.gridProdutos, filtrados);
  elementos.estadoVazio.hidden = temResultados;
  elementos.gridProdutos.hidden = !temResultados;

  const textoBusca = termoBusca.trim() ? ` — "${termoBusca.trim()}"` : '';
  elementos.tituloSecaoProdutos.textContent = `Todos os produtos${textoBusca}`;
}

function renderizarFavoritos() {
  const ids = obterFavoritos();
  const favoritos = todosProdutos.filter(p => ids.includes(p.id));
  const temFavoritos = favoritos.length > 0;

  elementos.estadoVazioFavoritos.hidden = temFavoritos;
  elementos.gridFavoritos.hidden = !temFavoritos;

  if (temFavoritos) {
    renderizarGrid(elementos.gridFavoritos, favoritos);
  } else {
    elementos.gridFavoritos.innerHTML = '';
  }
}

function alternarView(novaView) {
  viewAtual = novaView;

  if (viewAtual === 'todos') {
    elementos.secaoProdutos.hidden = false;
    elementos.secaoFavoritos.hidden = true;
    elementos.btnTodos.classList.add('active');
    elementos.btnTodos.setAttribute('aria-pressed', 'true');
    elementos.btnFavoritos.classList.remove('active');
    elementos.btnFavoritos.setAttribute('aria-pressed', 'false');
    renderizarTodos();
  } else {
    elementos.secaoProdutos.hidden = true;
    elementos.secaoFavoritos.hidden = false;
    elementos.btnTodos.classList.remove('active');
    elementos.btnTodos.setAttribute('aria-pressed', 'false');
    elementos.btnFavoritos.classList.add('active');
    elementos.btnFavoritos.setAttribute('aria-pressed', 'true');
    renderizarFavoritos();
  }
}

function mostrarErro(mostrar) {
  elementos.estadoErro.hidden = !mostrar;
  if (mostrar) {
    elementos.secaoProdutos.hidden = true;
    elementos.secaoFavoritos.hidden = true;
  }
}

async function inicializar() {
  try {
    mostrarErro(false);
    todosProdutos = await carregarProdutos();
    atualizarContadorFavoritos();
    alternarView(viewAtual);
  } catch (erro) {
    console.error(erro);
    mostrarErro(true);
  }
}

elementos.inputBusca.addEventListener('input', (e) => {
  termoBusca = e.target.value;
  if (viewAtual === 'todos') {
    renderizarTodos();
  } else {
    alternarView('todos');
    renderizarTodos();
  }
});

elementos.btnTodos.addEventListener('click', () => alternarView('todos'));
elementos.btnFavoritos.addEventListener('click', () => alternarView('favoritos'));
elementos.btnRetry.addEventListener('click', inicializar);
elementos.btnBrowse.addEventListener('click', () => alternarView('todos'));

inicializar();
