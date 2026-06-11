# L'Index — Catálogo de Produtos Interativo

> Trabalho acadêmico desenvolvido para a **USJT — Universidade São Judas Tadeu**, como parte da disciplina de Desenvolvimento Front-End.

---

## 📌 Sobre o projeto

O **L'Index** é um catálogo de produtos online totalmente client-side, construído com **HTML5**, **CSS3 (Bootstrap 5)** e **JavaScript Vanilla**. O projeto consome dados da API pública [DummyJSON](https://dummyjson.com/products) e oferece uma experiência de navegação multi-página com curadoria visual no estilo galeria particular de luxo.

Este trabalho demonstra o domínio de:

- Manipulação do DOM com JavaScript puro
- Consumo de APIs REST com `fetch()`
- Persistência de dados no navegador com `localStorage`
- Organização modular de código front-end
- Design responsivo e acessibilidade básica

---

## 🛠️ Tecnologias utilizadas

- **HTML5** semântico
- **CSS3** com Bootstrap 5
- **JavaScript Vanilla** (ES6+)
- **DummyJSON API** para dados dos produtos
- **Git** para versionamento

---

## ✨ Funcionalidades

### Obrigatórias

- [x] Listagem de produtos em cards com nome, preço, imagem e categoria
- [x] Campo de busca dinâmica por nome do produto
- [x] Favoritar/desfavoritar produtos com indicador visual
- [x] Persistência dos favoritos no `localStorage`
- [x] Seção dedicada aos produtos favoritados

### Extras implementadas

- [x] Página de detalhes do produto com galeria de imagens
- [x] Filtro por categoria
- [x] Ordenação por preço (menor/maior) e nome (A-Z / Z-A)
- [x] Carrinho de compras com persistência no `localStorage`
- [x] Páginas institucionais: Sobre e Contato
- [x] Formulário de contato com validação client-side
- [x] Design responsivo para mobile, tablet e desktop
- [x] Micro-interações e animações refinadas
- [x] Testes manuais das funções puras

---

## 📁 Estrutura do projeto

```
/
├── index.html              # Página inicial (catálogo)
├── produto.html            # Detalhes do produto
├── carrinho.html           # Carrinho de compras
├── sobre.html              # Página institucional
├── contato.html            # Formulário de contato
├── css/
│   └── style.css           # Estilos unificados
├── js/
│   ├── api.js              # Comunicação com DummyJSON
│   ├── cart.js             # Gerenciamento do carrinho
│   ├── storage.js          # Gerenciamento dos favoritos
│   ├── ui.js               # Componentes compartilhados
│   ├── utils.js            # Funções utilitárias puras
│   └── pages/
│       ├── home.js         # Lógica da homepage
│       ├── produto.js      # Lógica da página de detalhes
│       ├── carrinho.js     # Lógica do carrinho
│       └── contato.js      # Validação do formulário
├── tests/
│   └── index.html          # Testes manuais das funções puras
├── specs/
│   └── changes/
│       └── 001-luxury-redesign/  # Especificações do redesign
└── README.md
```

---

## 🚀 Como executar localmente

1. Clone o repositório:

```bash
git clone https://github.com/leorsousa05/catalogo-produtos.git
```

2. Acesse a pasta do projeto:

```bash
cd catalogo-produtos
```

3. Abra o arquivo `index.html` diretamente no navegador, ou inicie um servidor local simples:

```bash
python3 -m http.server 8765
```

4. Acesse `http://localhost:8765` no navegador.

---

## 🎓 Informações acadêmicas

- **Instituição:** USJT — Universidade São Judas Tadeu
- **Curso:** [Preencher com o nome do curso]
- **Disciplina:** [Preencher com o nome da disciplina]
- **Professor(a):** [Preencher com o nome do professor]
- **Aluno(a):** [Preencher com o nome do aluno]
- **Semestre:** [Preencher com o semestre/ano]

---

## 📚 API utilizada

Os dados dos produtos são fornecidos por [DummyJSON](https://dummyjson.com/products), uma API pública gratuita para fins de teste e prototipagem.

---

## 📝 Observações

Este projeto foi desenvolvido estritamente para fins educacionais. Nenhuma transação comercial real é processada — o carrinho de compras e o formulário de contato funcionam apenas no front-end, sem integração com backend ou serviços de pagamento.

---

## 📄 Licença

Uso acadêmico. Todos os direitos reservados.
