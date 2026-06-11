const API_BASE = 'https://dummyjson.com/products';

async function carregarProdutos() {
  const resposta = await fetch(API_BASE);
  if (!resposta.ok) {
    throw new Error(`Erro na API: ${resposta.status}`);
  }
  const dados = await resposta.json();
  return Array.isArray(dados.products) ? dados.products : [];
}

async function carregarProduto(id) {
  const resposta = await fetch(`${API_BASE}/${id}`);
  if (!resposta.ok) {
    throw new Error(`Erro na API: ${resposta.status}`);
  }
  return resposta.json();
}
