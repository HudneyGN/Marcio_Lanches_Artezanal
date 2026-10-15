# Arquitetura do MVP — Márcio Lanches Artesanais

## 1. Visão do produto

O Márcio Lanches Artesanais é um catálogo online para atendimento de clientes do bairro. A primeira versão deve reduzir a fricção do pedido: o cliente escolhe produtos no site, confere o resumo e abre o WhatsApp da lanchonete com a mensagem preenchida. A confirmação de disponibilidade, valor final, pagamento e entrega continua humana, feita pela equipe da loja.

**Estado do projeto:** o frontend inicial está implementado com React, Vite e TypeScript. O catálogo, o carrinho local e a abertura do WhatsApp funcionam com dados demonstrativos; antes da publicação, o cardápio e as informações comerciais devem ser revisados pela loja.

## 2. Decisões tomadas

| Área | Decisão para o MVP | Motivo |
| --- | --- | --- |
| Frontend | React + Vite + TypeScript | Interface rápida, tipada e simples de publicar como site estático. |
| Estilos | Tailwind CSS | Velocidade de implementação e responsividade consistente. |
| Ícones | Lucide React | Biblioteca leve e coerente visualmente. |
| Hospedagem | Cloudflare Pages | Publicação estática gratuita, HTTPS e integração com GitHub. |
| Pedido | Link `wa.me` com texto codificado | Sem token, webhook, custo ou backend próprio. |
| Dados no MVP | Arquivos TypeScript versionados | Cardápio pequeno e atualização controlada no código. |
| Testes | Vitest + Testing Library | Cobertura do carrinho, totais e geração da mensagem. |

### Fora do escopo agora

- API própria, Workers, Hono e banco D1;
- autenticação de clientes;
- pagamento online;
- painel administrativo;
- integração oficial com WhatsApp Business;
- histórico ou persistência de pedidos.

Essas limitações são intencionais. Elas permitem validar o catálogo e o fluxo de atendimento antes de manter infraestrutura adicional.

## 3. Arquitetura

```text
Cliente (celular, tablet ou desktop)
        |
        v
Cloudflare Pages
React + Vite + TypeScript
catálogo + carrinho + checkout local
        |
        v
wa.me com resumo do pedido
        |
        v
WhatsApp da lanchonete
confirmação humana de preço, disponibilidade e entrega
```

Quando existir necessidade comprovada de controlar produtos, disponibilidade ou pedidos, a evolução proposta é:

```text
Frontend -> Cloudflare Worker (Hono) -> Cloudflare D1
```

Essa evolução não deve ser iniciada antes de o MVP estar publicado e validado com pedidos reais.

## 4. Fluxo do pedido

1. O cliente abre o catálogo e filtra categorias.
2. Adiciona produtos, quantidades, adicionais e observações ao carrinho.
3. Revisa itens e subtotal.
4. Informa nome e modalidade (entrega ou retirada); endereço é obrigatório apenas para entrega.
5. O site valida os dados, monta o texto e abre `https://wa.me/<numero>?text=<mensagem-encodada>`.
6. O cliente revisa e envia a mensagem no WhatsApp.
7. A lanchonete confirma disponibilidade, taxa de entrega, valor final e pagamento.

O clique no site não equivale a pedido confirmado. A interface deve comunicar isso de forma clara antes de abrir o WhatsApp.

## 5. Dados e regras de domínio

### Produto

```ts
type Product = {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
  categoryId: string;
  imageUrl: string;
  available: boolean;
  featured: boolean;
};
```

### Categoria

```ts
type Category = {
  id: string;
  name: string;
  sortOrder: number;
  active: boolean;
};
```

### Item do carrinho

```ts
type CartItem = {
  productId: string;
  quantity: number;
  selectedAddons: Array<{ id: string; name: string; priceInCents: number }>;
  notes: string;
  unitPriceInCents: number;
};
```

### Regras obrigatórias

- Todos os valores monetários são inteiros em centavos; nunca usar `float` para totalização.
- O carrinho não pode ser finalizado vazio.
- Produto indisponível não pode ser adicionado.
- Nome e modalidade são obrigatórios; endereço é obrigatório somente para entrega.
- Número comercial e outras configurações públicas ficam centralizados, por exemplo em `src/config/store.ts`.
- A mensagem deve ser codificada com `encodeURIComponent` antes de compor a URL do WhatsApp.
- No futuro, preços recebidos do navegador serão apenas informativos: a API deve recalcular e registrar a cópia do preço e do nome de cada item no momento do pedido.

## 6. Estrutura planejada

```text
fastfood/
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   └── routes.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── ProductCard.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── CartDrawer.tsx
│   │   └── WhatsAppButton.tsx
│   ├── config/
│   │   └── store.ts
│   ├── data/
│   │   └── products.ts
│   ├── hooks/
│   │   └── useCart.ts
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── CatalogPage.tsx
│   │   └── CheckoutPage.tsx
│   ├── services/
│   │   └── whatsapp.ts
│   ├── types/
│   │   ├── product.ts
│   │   └── order.ts
│   └── utils/
│       └── currency.ts
├── tests/
├── docs/
│   └── arquitetura-mvp.md
├── .env.example
├── README.md
├── package.json
├── tsconfig.json
└── vite.config.ts
```

Não criar monorepo nesta fase. A separação entre componentes, dados, regras do carrinho e integração de WhatsApp é suficiente para manter a evolução organizada.

## 7. Critérios de aceite do MVP

- O catálogo funciona de 320 px até desktop, sem rolagem horizontal.
- Categorias e produtos indisponíveis respeitam os dados do cardápio.
- Carrinho atualiza quantidade, adicionais, subtotal e total corretamente.
- O resumo no WhatsApp contém itens, adicionais, observações, subtotal, modalidade e endereço quando aplicável.
- Campos obrigatórios apresentam erro compreensível antes do redirecionamento.
- O número do WhatsApp não é duplicado em componentes.
- Testes cobrem totalização em centavos, carrinho vazio, validações e geração da URL.
- `npm run build` conclui sem erro antes do deploy.

## 8. Riscos e mitigação

| Risco | Mitigação no MVP |
| --- | --- |
| Preço desatualizado | Cardápio em um único local e revisão antes da divulgação. |
| Pedido não confirmado | Aviso explícito e confirmação manual pelo WhatsApp. |
| Mensagem longa demais | Limite de observações/itens e teste de URLs reais. |
| Fotos pesadas | Imagens comprimidas e dimensionadas para celular. |
| Dados pessoais desnecessários | Solicitar apenas nome, modalidade e endereço para entrega; não persistir dados no MVP. |
| Alteração do frontend pelo cliente | Tratar valores como estimativa; validar no backend quando existir API. |
| Segredos no navegador | Não adicionar tokens, credenciais ou chaves privadas ao frontend. |

## 9. Publicação planejada

1. Revisar os dados demonstrativos do cardápio, disponibilidade, horários e entrega com a loja.
2. Configurar e executar os testes de regras de pedido e mensagem do WhatsApp.
3. Publicar o repositório no GitHub.
4. Criar o projeto no Cloudflare Pages, usando `npm run build`, `dist` e a branch `main`.
5. Validar a URL `pages.dev` em celular e desktop antes de divulgar.

Domínio próprio não é necessário para o lançamento. Caso seja adotado depois, deve ser configurado no Cloudflare sem alterar a arquitetura do frontend.

## 10. Informações necessárias antes da implementação visual

As decisões técnicas estão fechadas, mas os seguintes dados devem ser fornecidos ou usados como provisórios claramente identificados:

- número comercial do WhatsApp com país e DDD;
- categorias, produtos, descrições, preços e adicionais iniciais;
- bairros atendidos, taxa e regras de entrega/retirada;
- horários de funcionamento e mensagem para loja fechada;
- identidade visual: logo provisório, paleta e estilo de fotos.

## 11. Próximo passo prático

Revisar os dados demonstrativos com a loja e concluir os testes do fluxo de pedido. O número comercial configurado para a abertura do WhatsApp é centralizado em `src/config/store.ts`; não deve ser repetido nos componentes. Depois da validação visual e do fluxo de WhatsApp, publicar no Cloudflare Pages.
