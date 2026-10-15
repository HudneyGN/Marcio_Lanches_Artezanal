import { describe, expect, it } from 'vitest'
import { calculateCartTotal } from './cart'
import type { CartItem, Product } from '../types/product'

const product: Product = {
  id: 'teste',
  name: 'Lanche de teste',
  description: 'Produto usado somente nos testes.',
  priceInCents: 3290,
  categoryId: 'artesanais',
  imageUrl: '',
  available: true,
  featured: false,
}

describe('calculateCartTotal', () => {
  it('retorna zero para carrinho vazio', () => {
    expect(calculateCartTotal([])).toBe(0)
  })

  it('soma itens e quantidades usando centavos', () => {
    const items: CartItem[] = [{ product, quantity: 2 }, { product: { ...product, id: 'bebida', priceInCents: 650 }, quantity: 1 }]

    expect(calculateCartTotal(items)).toBe(7230)
  })
})
