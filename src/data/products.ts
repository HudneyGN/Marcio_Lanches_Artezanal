import type { CategoryId, Product } from '../types/product'

export const categories: Array<{ id: CategoryId; name: string }> = [
  { id: 'combos', name: 'Combos' },
  { id: 'artesanais', name: 'Artesanais' },
  { id: 'porcoes', name: 'Porções' },
  { id: 'bebidas', name: 'Bebidas' },
]

export const products: Product[] = [
  { id: 'mario', name: 'Mário da casa', description: 'Pão brioche, burger 160g, queijo, bacon e maionese da casa.', priceInCents: 3290, categoryId: 'artesanais', imageUrl: '🍔', available: true, featured: true },
  { id: 'classico', name: 'Clássico prensado', description: 'Carne, queijo, presunto, tomate e alface no pão tostado.', priceInCents: 2290, categoryId: 'artesanais', imageUrl: '🥪', available: true, featured: false },
  { id: 'combo-mario', name: 'Combo Mário', description: 'Mário da casa, fritas crocantes e refrigerante em lata.', priceInCents: 4190, categoryId: 'combos', imageUrl: '🍟', available: true, featured: true },
  { id: 'combo-classico', name: 'Combo clássico', description: 'Clássico prensado, fritas e refrigerante em lata.', priceInCents: 3190, categoryId: 'combos', imageUrl: '🥤', available: true, featured: false },
  { id: 'fritas', name: 'Fritas da banca', description: 'Batatas sequinhas, sal da casa e porção para dividir.', priceInCents: 1590, categoryId: 'porcoes', imageUrl: '🍟', available: true, featured: false },
  { id: 'onion', name: 'Anéis de cebola', description: 'Empanados e crocantes, acompanham molho especial.', priceInCents: 1790, categoryId: 'porcoes', imageUrl: '🧅', available: false, featured: false },
  { id: 'cola', name: 'Refrigerante lata', description: 'Coca-Cola, Guaraná ou Fanta. Escolha no WhatsApp.', priceInCents: 650, categoryId: 'bebidas', imageUrl: '🥤', available: true, featured: false },
  { id: 'suco', name: 'Suco natural', description: 'Laranja, limão ou maracujá, preparado na hora.', priceInCents: 890, categoryId: 'bebidas', imageUrl: '🍊', available: true, featured: false },
]
