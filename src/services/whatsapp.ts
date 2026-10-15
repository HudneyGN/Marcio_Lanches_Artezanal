import { store } from '../config/store'
import type { CartItem } from '../types/product'
import { formatCurrency } from '../utils/currency'

type WhatsAppOrderDetails = {
  customerName: string
  fulfillment: 'entrega' | 'retirada'
  address?: string
  subtotalInCents: number
  deliveryFeeInCents: number
}

export function createWhatsAppUrl(items: CartItem[], order: WhatsAppOrderDetails) {
  const lines = items.map((item) => `• ${item.quantity}x ${item.product.name} — ${formatCurrency(item.product.priceInCents * item.quantity)}`)
  const deliveryLines = order.fulfillment === 'entrega'
    ? [`Taxa de entrega estimada: ${formatCurrency(order.deliveryFeeInCents)}`, `Endereço: ${order.address}`]
    : []
  const total = order.subtotalInCents + order.deliveryFeeInCents
  const message = [
    `Olá, ${store.name}! Quero pedir:`,
    '',
    `Cliente: ${order.customerName}`,
    `Modalidade: ${order.fulfillment === 'entrega' ? 'Entrega' : 'Retirada'}`,
    '',
    ...lines,
    '',
    `Subtotal: ${formatCurrency(order.subtotalInCents)}`,
    ...deliveryLines,
    `Total estimado: ${formatCurrency(total)}`,
    '',
    'Vou confirmar os detalhes por aqui.',
  ].join('\n')
  return `https://wa.me/${store.whatsappNumber}?text=${encodeURIComponent(message)}`
}
