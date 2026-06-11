const LUCIDE_ICONS = {
  heart: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  shoppingBag: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 10a4 4 0 0 1-8 0"/><path d="M3.103 6.034h17.794"/><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/></svg>',
  search: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  menu: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>',
  x: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  plus: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
  minus: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>',
  check: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  mail: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>',
  mapPin: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>',
  phone: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>',
  arrowLeft: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
  trash: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
  package: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>',
  heartEmpty: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>'
};

function getIcon(name) {
  return LUCIDE_ICONS[name] || '';
}

function renderizarHeader() {
  const favoritos = obterFavoritos();
  const carrinhoCount = contarItensCarrinho();
  const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';

  const links = [
    { url: 'index.html', label: 'Início' },
    { url: 'sobre.html', label: 'Sobre' },
    { url: 'contato.html', label: 'Contato' }
  ];

  const navLinks = links.map(link => {
    const ativo = paginaAtual === link.url || (paginaAtual === '' && link.url === 'index.html');
    return `<a href="${link.url}" class="nav-link ${ativo ? 'active' : ''}">${link.label}</a>`;
  }).join('');

  const html = `
    <header class="site-header-fixed">
      <div class="header-inner container">
        <a href="index.html" class="logo" aria-label="L'Index — Início">L'Index</a>
        <nav class="main-nav" aria-label="Navegação principal">
          ${navLinks}
        </nav>
        <div class="header-actions">
          <a href="carrinho.html" class="icon-btn" aria-label="Carrinho">
            ${getIcon('shoppingBag')}
            <span id="cart-count" class="count-badge ${carrinhoCount > 0 ? '' : 'hidden'}" aria-hidden="true">${carrinhoCount}</span>
          </a>
        </div>
        <button id="menu-toggle" class="menu-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="mobile-menu">
          ${getIcon('menu')}
        </button>
      </div>
      <div id="mobile-menu" class="mobile-menu" aria-hidden="true">
        <div class="mobile-menu-inner">
          <button id="menu-close" class="menu-close" aria-label="Fechar menu">${getIcon('x')}</button>
          <nav class="mobile-nav" aria-label="Navegação mobile">
            ${links.map(link => `<a href="${link.url}" class="mobile-nav-link">${link.label}</a>`).join('')}
            <a href="carrinho.html" class="mobile-nav-link">Carrinho ${carrinhoCount > 0 ? `(${carrinhoCount})` : ''}</a>
          </nav>
        </div>
      </div>
    </header>
    <div class="header-spacer" aria-hidden="true"></div>
  `;

  const container = document.createElement('div');
  container.innerHTML = html;
  document.body.insertBefore(container.firstElementChild, document.body.firstChild);
  document.body.insertBefore(container.lastElementChild, document.body.firstChild.nextSibling);

  configurarMenuMobile();
}

function configurarMenuMobile() {
  const toggle = document.getElementById('menu-toggle');
  const close = document.getElementById('menu-close');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  function abrir() {
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function fechar() {
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', abrir);
  if (close) close.addEventListener('click', fechar);
  menu.addEventListener('click', (e) => {
    if (e.target === menu) fechar();
  });
}

function renderizarFooter() {
  const html = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-top">
          <a href="index.html" class="footer-logo">L'Index</a>
          <nav class="footer-nav" aria-label="Navegação do rodapé">
            <a href="index.html">Início</a>
            <a href="sobre.html">Sobre</a>
            <a href="contato.html">Contato</a>
            <a href="carrinho.html">Carrinho</a>
          </nav>
        </div>
        <div class="footer-bottom">
          <p>L'Index — Catálogo acadêmico desenvolvido para fins educacionais.</p>
          <p class="footer-credit">Dados fornecidos por DummyJSON.</p>
        </div>
      </div>
    </footer>
  `;
  const footer = document.createRange().createContextualFragment(html);
  document.body.appendChild(footer);
}

function atualizarContadorCarrinho() {
  const badge = document.getElementById('cart-count');
  if (!badge) return;
  const count = contarItensCarrinho();
  badge.textContent = count;
  badge.classList.toggle('hidden', count === 0);
}

function mostrarToast(mensagem, tipo = 'success') {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `${tipo === 'success' ? getIcon('check') : ''}<span>${mensagem}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function renderIcon(name, attrs = '') {
  const icon = getIcon(name);
  return attrs ? icon.replace(/<svg/, `<svg ${attrs}`) : icon;
}
