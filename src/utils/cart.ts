import type { CartItem } from '../types/product'

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.priceInCents * item.quantity, 0)
}
