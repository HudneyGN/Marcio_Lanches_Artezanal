import type { CategoryId, Product } from '../types/product'

export const categories: Array<{ id: CategoryId; name: string }> = [
  { id: 'combos', name: 'Combos' },
  { id: 'artesanais', name: 'Artesanais' },
  { id: 'porcoes', name: 'Porções' },
  { id: 'bebidas', name: 'Bebidas' },
]

export const products: Product[] = [
  { id: 'marcio', name: 'Márcio da casa', description: 'Pão brioche, burger 160g, queijo, bacon e maionese da casa.', priceInCents: 3290, categoryId: 'artesanais', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=720&q=82', available: true, featured: true },
  { id: 'classico', name: 'Clássico prensado', description: 'Carne, queijo, presunto, tomate e alface no pão tostado.', priceInCents: 2290, categoryId: 'artesanais', imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=720&q=82', available: true, featured: false },
  { id: 'combo-marcio', name: 'Combo Márcio', description: 'Márcio da casa, fritas crocantes e refrigerante em lata.', priceInCents: 4190, categoryId: 'combos', imageUrl: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=720&q=82', available: true, featured: true },
  { id: 'combo-classico', name: 'Combo clássico', description: 'Clássico prensado, fritas e refrigerante em lata.', priceInCents: 3190, categoryId: 'combos', imageUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=720&q=82', available: true, featured: false },
  { id: 'fritas', name: 'Fritas da banca', description: 'Batatas sequinhas, sal da casa e porção para dividir.', priceInCents: 1590, categoryId: 'porcoes', imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=720&q=82', available: true, featured: false },
  { id: 'onion', name: 'Anéis de cebola', description: 'Empanados e crocantes, acompanham molho especial.', priceInCents: 1790, categoryId: 'porcoes', imageUrl: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=720&q=82', available: false, featured: false },
  { id: 'cola', name: 'Refrigerante lata', description: 'Coca-Cola, Guaraná ou Fanta. Escolha no WhatsApp.', priceInCents: 650, categoryId: 'bebidas', imageUrl: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=720&q=82', available: true, featured: false },
  { id: 'suco', name: 'Suco natural', description: 'Laranja, limão ou maracujá, preparado na hora.', priceInCents: 890, categoryId: 'bebidas', imageUrl: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=720&q=82', available: true, featured: false },
]
