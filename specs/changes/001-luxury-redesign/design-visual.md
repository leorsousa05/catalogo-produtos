# Especificação Visual — L'Index Redesign

## Direção estética

**"Galeria particular de objetos raros"** — uma experiência digital que evoca o catálogo de uma galeria milanesa ou leilão parisiense. A estética combina **luxo refinado** com **ousadia editorial**: espaço em branco generoso, tipografia dramática, linhas arquitetônicas finas e um acente terroso-ouro que aquece a paleta sem torná-la convencional. Cada página deve parecer uma página de revista que respira.

## Sistema de cores

```css
:root {
  --bg-primary: #F5F2EC;        /* marfim profundo, base de toda a página */
  --bg-secondary: #FAFAF8;      /* papel quente, cards e seções */
  --bg-elevated: #FFFFFF;       /* superfícies em destaque */
  --bg-dark: #1A1A1A;           /* carvão, botões primários e footer */

  --text-primary: #1A1A1A;      /* títulos e corpo principal */
  --text-secondary: #5C5C5C;    /* descrições e legendas */
  --text-muted: #9A9590;        /* metadados, placeholders */

  --accent-gold: #C9A227;       /* ouro velho vivo — detalhes, ícones, hover */
  --accent-terracotta: #A44A3F; /* terracota queimado — CTA secundário, tags ativas */
  --accent-warm: #D4A574;       /* areia dourada — estados sutil */

  --border-light: #E8E4DD;
  --border-medium: #D9D3CA;
  --border-dark: #1A1A1A;

  --shadow-soft: 0 4px 24px rgba(26, 26, 26, 0.06);
  --shadow-medium: 0 8px 40px rgba(26, 26, 26, 0.10);
  --shadow-gold: 0 0 0 3px rgba(201, 162, 39, 0.18);
}
```

## Tipografia

- **Display (títulos, logo, hero):** `Cormorant Garamond` — pesos 400, 600, 700. Itálico usado em destaques e citações.
- **Body/UI:** `Libre Franklin` — pesos 300, 400, 500, 600.
- **Accent/labels:** `Libre Franklin` — uppercase, `letter-spacing: 0.14em`, `font-size: 0.7rem`, peso 600.

### Escala tipográfica

| Elemento | Fonte | Tamanho | Peso | Line-height |
|----------|-------|---------|------|-------------|
| Logo | Cormorant Garamond | 1.5rem | 700 | 1 |
| Hero H1 | Cormorant Garamond | clamp(3rem, 8vw, 6.5rem) | 400 | 0.95 |
| H2 section | Cormorant Garamond | clamp(2rem, 4vw, 3rem) | 600 | 1.1 |
| H3 card title | Cormorant Garamond | 1.25rem | 600 | 1.25 |
| Body | Libre Franklin | 1rem | 400 | 1.7 |
| Body large | Libre Franklin | 1.125rem | 300 | 1.6 |
| Label | Libre Franklin | 0.7rem | 600 | 1.2 |
| Caption | Libre Franklin | 0.8rem | 400 | 1.5 |
| Price | Libre Franklin | 1.1rem | 500 | 1 |

## Texturas e fundos

- **Grain overlay:** camada fixa sutil (`opacity: 0.25`) usando SVG noise fractal. Cria atmosfera de papel artesanal.
- **Linhas arquitetônicas:** divisores de 1px em `--border-medium`, ocasionalmente 2px em `--border-dark` para ênfase.
- **Cards:** fundo `--bg-secondary`, sem border-radius (arestas vivas), sombra `--shadow-soft` no hover.

## Componentes

### Site Header

- Fixo no topo, altura 72px, fundo `rgba(245, 242, 236, 0.92)` com `backdrop-filter: blur(8px)`.
- Layout: logo à esquerda, navegação central (escondida em hamburger no mobile), ícones à direita.
- Ícones: coração (favoritos) e sacola (carrinho), com contadores em círculo dourado quando > 0.
- Link ativo da navegação: underline fino dourado de 1px.

```
┌─────────────────────────────────────────────────────┐
│ L'INDEX        [Início] [Sobre] [Contato]    ♡  🛍 │
└─────────────────────────────────────────────────────┘
```

### Hero (homepage)

- Altura mínima 70vh, alinhamento à esquerda.
- Kicker em uppercase/label dourado.
- Título em serif enorme, itálico na última palavra para quebrar a formalidade.
- Subtítulo em body large, cor `--text-secondary`, max-width 520px.
- Botão CTA primário: fundo `--bg-dark`, texto `--bg-secondary`, padding generoso, border-radius 0.

```
    EDIÇÃO ESPECIAL — COLEÇÃO 2026

    Objetos com
    propósito,
    escolhidos à mão

    Um catálogo curado de peças selecionadas
    para quem valoriza o essencial.

    [ EXPLORAR COLEÇÃO ]
```

### Filter Bar

- Barra horizontal logo abaixo do hero.
- Busca: input minimal com ícone de lupa, borda inferior 1px ao invés de caixa completa.
- Selects de categoria e ordenação: estilo customizado, seta dourada, bordas sutis.
- Result count em `--text-muted`, alinhado à direita.

```
[ 🔍 Buscar objetos... ]    [ Categoria ▾ ]    [ Ordenar ▾ ]          30 peças
────────────────────────────────────────────────────────────────────────────
```

### Product Card

- Formato vertical, proporção de imagem 4:5 (mais editorial que 4:3).
- Imagem ocupa o topo inteiro com `object-fit: cover`.
- Botão de favoritar: círculo 40px no canto superior direito, fundo semi-transparente, ícone de coração fino (stroke, não preenchido). Ao favoritar, preenche com `--accent-terracotta` e faz scale-pop.
- Corpo do card: categoria em label dourada, título em serif, preço em sans-serif.
- Hover: elevação `-6px`, shadow média, imagem scale 1.05.
- Linka para `produto.html?id=X` — card inteiro clicável, exceto o botão de favoritar.

```
┌──────────────────┐
│         [♡]      │
│                  │
│    [imagem]      │
│                  │
│                  │
├──────────────────┤
│ FRAGRANCES       │
│ Chanel Coco Noir │
│ US$ 129,99       │
└──────────────────┘
```

### Product Detail Page

- Breadcrumbs: `Início / Categoria / Nome do Produto` em caption cinza.
- Layout em duas colunas no desktop: galeria à esquerda (60%), informações à direita (40%).
- Galeria: imagem principal grande + thumbnails em linha fina abaixo.
- Lado direito: categoria em label dourado, título enorme em serif, preço em 1.5rem, descrição em body, specs em lista minimal.
- Botão "Adicionar à sacola": largura total, altura 56px, fundo `--bg-dark`, texto claro, hover inverte para borda escura + fundo claro.
- Quantidade: stepper minimal ( `-  1  +` ) com bordas finas.

### Cart Page

- Título dramático no topo.
- Layout: lista de itens à esquerda (70%), resumo à direita (30%).
- Item do carrinho: imagem pequena 80×100px, título, preço unitário, stepper de quantidade, link "Remover" em terracota.
- Resumo: subtotal, frete (mensagem "Simulado"), total, botão "Finalizar pedido" (desabilitado esteticamente, apenas visual).
- Estado vazio: ilustração de sacola vazia em linhas finas + copy convidativo + CTA para loja.

### About Page

- Layout assimétrico: imagem grande ocupando 55% à esquerda, texto à direita com grande espaço em branco.
- Título em serif com palavra em itálico.
- Blocos de texto com pull quote centralizado entre eles.
- Citação em itálico com borda lateral dourada de 2px.

### Contact Page

- Layout dividido: informações à esquerda, formulário à direita.
- Inputs: borda inferior 1px apenas, sem caixa. Label flutuante ou estático acima.
- Focus: borda inferior muda para dourado + shadow dourado sutil.
- Botão de envio: largura total, fundo escuro, hover inverte.
- Mensagem de sucesso: overlay elegante com check dourado.

### Footer

- Fundo `--bg-dark`, texto `--text-muted`.
- Logo em branco, links em caption, linha divisória dourada fina no topo.
- Créditos centralizados na parte inferior.

## Animações e motion

### Page load

- Elementos do hero fade-in + translateY(24px → 0) com stagger:
  - kicker: 0ms
  - título: 120ms
  - subtítulo: 240ms
  - CTA: 360ms
- Duração: 700ms, easing: `cubic-bezier(0.22, 1, 0.36, 1)`.

### Cards stagger

- Ao renderizar o grid, cada card aparece com delay crescente de 60ms.
- `opacity: 0 → 1`, `translateY(32px → 0)`.
- Duração: 500ms, easing: `cubic-bezier(0.22, 1, 0.36, 1)`.

### Hover states

- Cards: `transform: translateY(-6px)`, shadow intensificada, 250ms ease.
- Botões primários: background inverte, 200ms ease.
- Links de navegação: underline dourado expande da esquerda para direita via `scaleX(0 → 1)`.
- Favoritar: scale 1 → 1.25 → 1 em 300ms com easing elástico sutil.

### Toast

- Entrada: slide da direita + fade-in, 300ms ease-out.
- Saída automática após 3s: fade-out + translateX(20px), 250ms.

### Reduced motion

- Se `prefers-reduced-motion: reduce`, todas as transições viram `0.01ms` e fades são instantâneos.
- Hover continua funcionando, mas sem transformações.

## Iconografia

- **Biblioteca:** Lucide (via CDN SVG), traço fino de 1.5px.
- Ícones usados: coração, sacola, lupa, menu (hamburger), seta, x, plus, minus, check, mail, map-pin, phone.
- Nunca usar emoji como ícone estrutural.

## Responsividade

### Mobile (< 768px)

- Hero: título centralizado, 80% de largura, CTA largura total.
- Filter bar: empilhado verticalmente, busca em largura total.
- Cards: 1 coluna, gap 2rem.
- Produto: imagem em largura total, info empilhada abaixo.
- Header: logo + ícones, menu em drawer lateral escuro deslizando da direita.
- Footer: colunas empilhadas, centralizado.

### Tablet (768px - 1023px)

- Cards: 2 colunas.
- Produto: imagem 50%, info 50%.
- Sobre: imagem empilhada acima do texto.

### Desktop (>= 1024px)

- Cards: 3 colunas (pode quebrar para 4 em >= 1440px).
- Produto: layout 60/40.
- Sobre: layout assimétrico 55/45.

## Estados e feedback

### Loading

- Skeleton cards: retângulos cinza claros com animação de shimmer sutil (gradiente se movendo).
- Texto "Curando objetos..." em itálico serif abaixo.

### Empty states

- Ícone em linha fina + título serif + descrição + CTA.
- Centralizado com generoso espaço em branco.

### Error

- Mensagem em caixa com borda lateral terracota de 2px.
- Botão "Tentar novamente" minimal.

### Form validation

- Campo inválido: borda inferior terracota.
- Mensagem de erro em caption terracota abaixo do campo.
- Focus em campo válido: borda dourada.

## Pre-implementation checklist

- [x] Paleta definida com tokens CSS
- [x] Tipografia escolhida e escalada
- [x] Componentes principais especificados
- [x] Animações com timing e easing
- [x] Mobile, tablet, desktop responsivos
- [x] Estados vazio, loading, erro desenhados
- [x] Contraste texto/fundo atende WCAG 4.5:1
- [x] Touch targets >= 48px nos botões de ícone
- [x] `prefers-reduced-motion` definido
- [x] Nenhum emoji usado como ícone estrutural
