function formatarPreco(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'USD'
  }).format(valor);
}

function normalizarTexto(texto) {
  return String(texto || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function filtrarProdutos(produtos, termoBusca) {
  if (!termoBusca || !termoBusca.trim()) return produtos;
  const termo = normalizarTexto(termoBusca);
  return produtos.filter(p => normalizarTexto(p.title).includes(termo));
}

function ordenarProdutos(produtos, criterio) {
  const copia = [...produtos];
  switch (criterio) {
    case 'preco-menor':
      return copia.sort((a, b) => a.price - b.price);
    case 'preco-maior':
      return copia.sort((a, b) => b.price - a.price);
    case 'nome-asc':
      return copia.sort((a, b) => normalizarTexto(a.title).localeCompare(normalizarTexto(b.title)));
    case 'nome-desc':
      return copia.sort((a, b) => normalizarTexto(b.title).localeCompare(normalizarTexto(a.title)));
    default:
      return copia;
  }
}

function extrairCategorias(produtos) {
  const set = new Set(produtos.map(p => p.category).filter(Boolean));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

function lerParametroUrl(nome) {
  const params = new URLSearchParams(window.location.search);
  return params.get(nome);
}

function navegarPara(url) {
  window.location.href = url;
}

function animarEntrada(elementos, delayInicial = 0, delayEntre = 60) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elementos.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }
  elementos.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(32px)';
    el.style.transition = 'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1)';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, delayInicial + i * delayEntre);
  });
}
