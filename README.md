# Mário Lanches

Catálogo digital para uma lanchonete de bairro. A primeira versão permite que o cliente navegue pelo cardápio, monte o pedido e envie o resumo para o WhatsApp da loja.

O frontend inicial do MVP está implementado com React, Vite, TypeScript e Tailwind CSS. As decisões de produto e arquitetura estão em [docs/arquitetura-mvp.md](docs/arquitetura-mvp.md).

## Como executar

```bash
npm install
npm run dev
```

Use `npm run build` para validar o build de produção.

## Objetivo do MVP

- Exibir cardápio, categorias e produtos disponíveis.
- Permitir selecionar quantidades, adicionais e observações.
- Calcular o resumo do pedido no navegador.
- Abrir o WhatsApp com uma mensagem pré-preenchida para o cliente confirmar o envio.

Não fazem parte desta fase: pagamentos online, login, painel administrativo, integração com a API oficial do WhatsApp ou persistência de pedidos.
