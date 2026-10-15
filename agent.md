# Guia do agente — Mário Lanches

## Contexto do projeto

O **Mário Lanches** é um catálogo digital para uma lanchonete de bairro. O MVP
permite que a pessoa cliente navegue pelo cardápio, monte um pedido e abra o
WhatsApp da loja com um resumo pré-preenchido. A confirmação de disponibilidade,
valor final, pagamento e entrega é feita pela equipe da lanchonete no WhatsApp.

O projeto ainda está no planejamento. A referência técnica principal é
[`docs/arquitetura-mvp.md`](docs/arquitetura-mvp.md); consulte-a antes de tomar
decisões que afetem o escopo ou a arquitetura.

## Escopo do MVP

- Exibir categorias, produtos e disponibilidade do cardápio.
- Permitir quantidades, adicionais e observações por item.
- Calcular o resumo do pedido no navegador.
- Validar nome, modalidade e endereço quando a modalidade for entrega.
- Gerar um link `wa.me` com mensagem codificada para a pessoa cliente revisar e
  enviar.

Não implementar neste momento: backend, API, banco de dados, autenticação,
pagamento online, painel administrativo, persistência de pedidos, Cloudflare
Workers/D1 ou integração oficial com WhatsApp Business.

## Stack e organização esperadas

- React, Vite e TypeScript.
- Tailwind CSS para estilos.
- Lucide React para ícones.
- Vitest e Testing Library para testes.
- Cloudflare Pages para publicação estática.

Quando a aplicação for criada, manter a separação prevista entre `app`,
`components`, `config`, `data`, `hooks`, `pages`, `services`, `types`, `utils` e
`tests`. Não criar monorepo para este MVP.

## Regras de domínio

- Representar preços como inteiros em centavos (`priceInCents`); não usar
  `float` para valores ou totalizações.
- Produtos indisponíveis não podem ser adicionados ao carrinho.
- Um carrinho vazio não pode iniciar o checkout.
- Nome e modalidade são obrigatórios; endereço é obrigatório somente para
  entrega.
- Centralizar o número comercial e configurações públicas em um local único,
  como `src/config/store.ts`.
- Gerar o texto para o WhatsApp e aplicar `encodeURIComponent` antes de montar
  a URL `https://wa.me/<numero>?text=<mensagem>`.
- Comunicar claramente que abrir o WhatsApp não confirma o pedido.
- Não incluir segredos, tokens, credenciais ou chaves privadas no frontend.

## Qualidade e validação

- Priorizar mobile e garantir funcionamento de 320 px até desktop, sem rolagem
  horizontal.
- Manter dados demonstrativos isolados dos componentes para que possam ser
  trocados pelos dados reais posteriormente.
- Criar testes para totalização em centavos, carrinho vazio, validações do
  checkout e geração da URL/mensagem do WhatsApp.
- Executar `npm run build` e os testes antes de considerar uma alteração pronta.
- Tratar valores mostrados no frontend como estimativas: a confirmação de preço,
  disponibilidade e entrega é humana durante o MVP.

## Evolução futura

Somente depois de o MVP estar publicado e validado com pedidos reais, a evolução
planejada é `Frontend -> Cloudflare Worker (Hono) -> Cloudflare D1`. Nessa etapa,
a API deverá recalcular preços e armazenar uma cópia do nome e do preço de cada
item no momento do pedido.
