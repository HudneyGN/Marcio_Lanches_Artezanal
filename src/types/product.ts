export type CategoryId = 'combos' | 'artesanais' | 'porcoes' | 'bebidas'

export type Product = {
  id: string
  name: string
  description: string
  priceInCents: number
  categoryId: CategoryId
  imageUrl: string
  available: boolean
  featured: boolean
}

export type CartItem = {
  product: Product
  quantity: number
}
