import { store } from '../config/store'
import type { CartItem } from '../types/product'
import { formatCurrency } from '../utils/currency'

export function createWhatsAppUrl(items: CartItem[], totalInCents: number) {
  const lines = items.map((item) => `• ${item.quantity}x ${item.product.name} — ${formatCurrency(item.product.priceInCents * item.quantity)}`)
  const message = ['Olá, Mário Lanches! Quero pedir:', '', ...lines, '', `Subtotal: ${formatCurrency(totalInCents)}`, '', 'Vou confirmar os detalhes por aqui.'].join('\n')
  return `https://wa.me/${store.whatsappNumber}?text=${encodeURIComponent(message)}`
}
