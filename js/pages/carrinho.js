const elementosCarrinho = {
  loading: document.getElementById('loading-state'),
  content: document.getElementById('cart-content'),
  empty: document.getElementById('empty-state'),
  itemsContainer: document.getElementById('cart-items'),
  subtotal: document.getElementById('summary-subtotal'),
  total: document.getElementById('summary-total'),
  btnCheckout: document.getElementById('btn-checkout')
};

let produtosCache = [];

function criarItemCarrinho(item, produto) {
  const el = document.createElement('div');
  el.className = 'cart-item';
  el.setAttribute('data-id', item.id);

  const imagem = produto ? produto.thumbnail : '';
  const titulo = produto ? produto.title : 'Produto indisponível';
  const preco = produto ? produto.price : 0;

  el.innerHTML = `
    <div class="cart-item-image">
      ${imagem ? `<img src="${imagem}" alt="">` : ''}
    </div>
    <div class="cart-item-info">
      <h3 class="cart-item-title">${titulo}</h3>
      <p class="cart-item-price">${formatarPreco(preco)} un.</p>
      <div class="cart-item-actions">
        <div class="quantity-stepper" aria-label="Quantidade">
          <button class="qty-minus" aria-label="Diminuir quantidade" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
          </button>
          <input class="qty-input" type="number" value="${item.quantidade}" min="1" max="99" aria-label="Quantidade">
          <button class="qty-plus" aria-label="Aumentar quantidade" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          </button>
        </div>
        <button class="btn-text btn-remove" type="button">Remover</button>
      </div>
    </div>
  `;

  const minus = el.querySelector('.qty-minus');
  const plus = el.querySelector('.qty-plus');
  const input = el.querySelector('.qty-input');
  const remove = el.querySelector('.btn-remove');

  minus.addEventListener('click', () => {
    let valor = parseInt(input.value, 10) || 1;
    if (valor > 1) {
      valor -= 1;
      input.value = valor;
      atualizarQuantidade(item.id, valor);
    }
  });

  plus.addEventListener('click', () => {
    let valor = parseInt(input.value, 10) || 1;
    if (valor < 99) {
      valor += 1;
      input.value = valor;
      atualizarQuantidade(item.id, valor);
    }
  });

  input.addEventListener('change', () => {
    let valor = parseInt(input.value, 10) || 1;
    valor = Math.max(1, Math.min(99, valor));
    input.value = valor;
    atualizarQuantidade(item.id, valor);
  });

  remove.addEventListener('click', () => {
    removerDoCarrinho(item.id);
    renderizarCarrinho();
    atualizarContadorCarrinho();
  });

  return el;
}

function renderizarCarrinho() {
  const itens = obterCarrinho();

  if (itens.length === 0) {
    elementosCarrinho.content.hidden = true;
    elementosCarrinho.loading.hidden = true;
    elementosCarrinho.empty.hidden = false;
    return;
  }

  elementosCarrinho.empty.hidden = true;
  elementosCarrinho.content.hidden = false;
  elementosCarrinho.itemsContainer.innerHTML = '';

  const fragmento = document.createDocumentFragment();
  itens.forEach(item => {
    const produto = produtosCache.find(p => p.id === item.id);
    fragmento.appendChild(criarItemCarrinho(item, produto));
  });
  elementosCarrinho.itemsContainer.appendChild(fragmento);

  const subtotal = calcularSubtotal(itens, produtosCache);
  elementosCarrinho.subtotal.textContent = formatarPreco(subtotal);
  elementosCarrinho.total.textContent = formatarPreco(subtotal);
}

async function inicializar() {
  const itens = obterCarrinho();

  if (itens.length === 0) {
    elementosCarrinho.loading.hidden = true;
    elementosCarrinho.empty.hidden = false;
    elementosCarrinho.content.hidden = true;
    return;
  }

  try {
    produtosCache = await carregarProdutos();
    elementosCarrinho.loading.hidden = true;
    renderizarCarrinho();
  } catch (erro) {
    console.error(erro);
    elementosCarrinho.loading.textContent = 'Erro ao carregar produtos. Recarregue a página.';
  }
}

elementosCarrinho.btnCheckout.addEventListener('click', () => {
  mostrarToast('Este é um projeto acadêmico. Nenhuma transação será processada.');
});

document.addEventListener('DOMContentLoaded', () => {
  renderizarHeader();
  renderizarFooter();
  inicializar();
});
