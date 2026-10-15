import { describe, expect, it } from 'vitest'
import { createWhatsAppUrl } from './whatsapp'
import type { CartItem, Product } from '../types/product'

const product: Product = {
  id: 'marcio',
  name: 'Márcio da casa',
  description: '',
  priceInCents: 3290,
  categoryId: 'artesanais',
  imageUrl: '',
  available: true,
  featured: true,
}

describe('createWhatsAppUrl', () => {
  it('usa o número comercial centralizado e codifica a mensagem', () => {
    const items: CartItem[] = [{ product, quantity: 2 }]
    const url = createWhatsAppUrl(items, {
      customerName: 'Ana',
      fulfillment: 'entrega',
      address: 'Rua das Flores, 10',
      subtotalInCents: 6580,
      deliveryFeeInCents: 285,
    })

    expect(url).toMatch(/^https:\/\/wa\.me\/5515991016731\?text=/)
    expect(decodeURIComponent(url.split('text=')[1])).toContain('2x Márcio da casa')
    expect(decodeURIComponent(url.split('text=')[1])).toContain('Subtotal: R$ 65,80')
    expect(decodeURIComponent(url.split('text=')[1])).toContain('Taxa de entrega estimada: R$ 2,85')
    expect(decodeURIComponent(url.split('text=')[1])).toContain('Endereço: Rua das Flores, 10')
  })
})
