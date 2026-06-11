const API_URL = 'https://dummyjson.com/products';

async function carregarProdutos() {
  const resposta = await fetch(API_URL);
  if (!resposta.ok) {
    throw new Error(`Erro na API: ${resposta.status}`);
  }
  const dados = await resposta.json();
  return Array.isArray(dados.products) ? dados.products : [];
}
