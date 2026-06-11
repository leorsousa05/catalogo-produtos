# Design e Arquitetura

## Conceito visual

"Galeria particular" — um espaço digital que parece o catálogo de uma galeria de arte ou leilão de alto padrão. A experiência valoriza o objeto, o vazio ao redor e pequenos detalhes de ouro velho.

## Paleta

```css
--bg-primary: #F5F2EC;       /* marfim profundo */
--bg-secondary: #FAFAF8;     /* papel quente */
--bg-dark: #1A1A1A;          /* carvão */
--text-primary: #1A1A1A;
--text-secondary: #6B6B6B;
--text-muted: #9A9A9A;
--accent-gold: #B8860B;      /* ouro velho */
--accent-terracotta: #A0522D; /* terracota queimado */
--border: #E3DDD3;
--shadow: rgba(26, 26, 26, 0.06);
```

## Tipografia

- Display: `Cormorant Garamond` (serif elegante, alto contraste)
- Body/UI: `Libre Franklin` (sans-serif refinada)
- Accent/labels: uppercase, letter-spacing generoso

## Componentes principais

- `site-header` — fixo no topo, logo central, navegação minimal, ícones de carrinho/favoritos
- `hero` — página inicial com título dramático e chamada curta
- `filter-bar` — busca + select de categoria + select de ordenação
- `product-card` — imagem grande, categoria em small caps, título serif, preço
- `product-detail` — galeria, breadcrumbs, descrição, specs, botão add to cart
- `cart-drawer` ou `cart-page` — lista de itens, quantidade, remover, subtotal
- `footer` — minimal, links e créditos

## Animações

- Fade-in suave nos cards ao carregar (`@keyframes fadeInUp`)
- Hover nos cards: leve elevação + shadow
- Botões: transição de cor/borda 200ms
- Ícone de coração: scale pop ao favoritar
- Respeitar `prefers-reduced-motion`

## Arquitetura de estado

### API
- `GET https://dummyjson.com/products` — lista de produtos
- `GET https://dummyjson.com/products/:id` — detalhes de um produto

### localStorage
- `lindex:favoritos` → `number[]` (IDs dos produtos favoritados)
- `lindex:carrinho` → `{ id: number, quantidade: number }[]`

### URL
- `produto.html?id=<number>` — navegação para detalhes
- Parâmetros de query lidos via `URLSearchParams`

### Módulos JS
- `js/api.js` — fetch de produtos
- `js/storage.js` — favoritos
- `js/cart.js` — carrinho (get, add, remove, updateQty, clear, getTotal)
- `js/ui.js` — renderização de componentes compartilhados (header, footer, toast)
- `js/utils.js` — formatarPreco, normalizarTexto, debounce
- `js/pages/home.js` — lógica da homepage
- `js/pages/produto.js` — lógica da página de detalhes
- `js/pages/carrinho.js` — lógica do carrinho
- `js/pages/contato.js` — validação do formulário
- `js/pages/sobre.js` — (pode ser apenas inicialização de UI)

## Estrutura de arquivos

```
/
├── index.html
├── produto.html
├── carrinho.html
├── sobre.html
├── contato.html
├── css/
│   └── style.css
├── js/
│   ├── api.js
│   ├── storage.js
│   ├── cart.js
│   ├── ui.js
│   ├── utils.js
│   └── pages/
│       ├── home.js
│       ├── produto.js
│       ├── carrinho.js
│       ├── sobre.js
│       └── contato.js
└── specs/
    └── changes/
        └── 001-luxury-redesign/
```

## Fluxos principais

1. **Homepage**: carrega produtos → popula filtros de categoria → renderiza grid → aplica busca/filtro/ordenação → clique no card vai para `produto.html?id=X`.
2. **Produto**: lê `id` da URL → busca produto na API → renderiza galeria e detalhes → botão "Adicionar ao carrinho" → redireciona para carrinho ou exibe toast.
3. **Carrinho**: lê itens do localStorage → busca produtos na API para montar view → permite alterar quantidade/remover → exibe subtotal.
4. **Contato**: validação de campos no submit → exibe mensagem de sucesso (sem envio real).

## Contratos (interfaces)

```typescript
// DummyJSON Product (relevant fields)
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  images: string[];
  rating: number;
  stock: number;
  brand: string;
}

// CartItem stored in localStorage
interface CartItem {
  id: number;
  quantidade: number;
}

// Public functions
function carregarProdutos(): Promise<Product[]>
function carregarProduto(id: number): Promise<Product>
function obterFavoritos(): number[]
function alternarFavorito(id: number): number[]
function ehFavorito(id: number): boolean
function obterCarrinho(): CartItem[]
function adicionarAoCarrinho(id: number, quantidade?: number): CartItem[]
function removerDoCarrinho(id: number): CartItem[]
function atualizarQuantidade(id: number, quantidade: number): CartItem[]
function limparCarrinho(): void
function renderizarHeader(): void
function renderizarFooter(): void
```

## Testes recomendados

- `utils.test.js`: `formatarPreco`, `normalizarTexto`, `ordenarProdutos`, `filtrarProdutos`
- `cart.test.js`: adicionar, remover, atualizar quantidade, limpar
- `storage.test.js`: salvar/recuperar favoritos

## Riscos e trade-offs

- DummyJSON não expõe endpoint de categorias; categorias devem ser derivadas da lista de produtos.
- Full page reload entre páginas (escolha deliberada para manter vanilla JS puro).
- Carrinho armazena apenas IDs + quantidades, então produtos removidos da API podem quebrar a view (tratar como item indisponível).
- Imagens da DummyJSON têm backgrounds inconsistentes; a estética luxo depende delas.
