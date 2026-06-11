const CART_KEY = 'lindex:carrinho';

function obterCarrinho() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function salvarCarrinho(itens) {
  localStorage.setItem(CART_KEY, JSON.stringify(itens));
  return itens;
}

function adicionarAoCarrinho(id, quantidade = 1) {
  const itens = obterCarrinho();
  const idx = itens.findIndex(item => item.id === id);
  if (idx === -1) {
    itens.push({ id, quantidade: Math.max(1, quantidade) });
  } else {
    itens[idx].quantidade += Math.max(1, quantidade);
  }
  return salvarCarrinho(itens);
}

function removerDoCarrinho(id) {
  const itens = obterCarrinho().filter(item => item.id !== id);
  return salvarCarrinho(itens);
}

function atualizarQuantidade(id, quantidade) {
  const itens = obterCarrinho();
  const idx = itens.findIndex(item => item.id === id);
  if (idx === -1) return itens;
  if (quantidade <= 0) {
    itens.splice(idx, 1);
  } else {
    itens[idx].quantidade = quantidade;
  }
  return salvarCarrinho(itens);
}

function limparCarrinho() {
  localStorage.removeItem(CART_KEY);
  return [];
}

function calcularSubtotal(itens, produtos) {
  return itens.reduce((total, item) => {
    const produto = produtos.find(p => p.id === item.id);
    if (!produto) return total;
    return total + produto.price * item.quantidade;
  }, 0);
}

function contarItensCarrinho() {
  return obterCarrinho().reduce((soma, item) => soma + item.quantidade, 0);
}
