# Tasks — 001 Luxury Redesign

## Setup e base
- [x] Criar estrutura de pastas `js/pages/`
- [x] Criar `js/utils.js` com funções compartilhadas puras
- [x] Criar `js/cart.js` com operações de CRUD do carrinho
- [x] Criar `js/ui.js` com renderização de header, footer e toast
- [x] Adicionar `carregarProduto(id)` em `js/api.js`

## Design system CSS
- [x] Refatorar `css/style.css` com nova paleta e tipografia
- [x] Criar classes de utilidade para animações
- [x] Implementar header fixo compartilhado
- [x] Implementar footer compartilhado
- [x] Garantir responsividade mobile/tablet/desktop

## Página inicial (index.html)
- [x] Redesenhar hero editorial
- [x] Implementar filter-bar com busca, categoria e ordenação
- [x] Refatorar grid de produtos com novo card design
- [x] Integrar favoritos no novo card
- [x] Linkar cada card para `produto.html?id=X`

## Página de detalhes (produto.html)
- [x] Criar markup semântico
- [x] Ler `id` da URL e carregar produto
- [x] Renderizar galeria, breadcrumbs, descrição, specs
- [x] Implementar botão "Adicionar ao carrinho" com seleção de quantidade
- [x] Exibir toast de confirmação
- [x] Estado 404 elegante para produto não encontrado

## Página do carrinho (carrinho.html)
- [x] Criar markup semântico
- [x] Ler itens do carrinho no localStorage
- [x] Buscar produtos na API para renderizar detalhes
- [x] Permitir alterar quantidade e remover itens
- [x] Calcular e exibir subtotal
- [x] Estado vazio refinado

## Páginas institucionais
- [x] Criar `sobre.html` com layout editorial
- [x] Criar `contato.html` com formulário validado
- [x] Implementar validação em `js/pages/contato.js`

## Testes e polimento
- [x] Criar `tests/index.html` com testes manuais das funções puras
- [x] Verificar fluxo completo: home → produto → carrinho → contato
- [x] Verificar persistência de carrinho e favoritos após reload
- [x] Ajustar animações e respeitar `prefers-reduced-motion`
- [x] Limpar arquivos e código legado não utilizados

## Entrega
- [ ] Commit das alterações (Shipper)
- [ ] Push para `origin/main` (Shipper)
- [x] Verificar servidor local
