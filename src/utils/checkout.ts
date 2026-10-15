export type Fulfillment = 'entrega' | 'retirada'

export type CheckoutDetails = {
  customerName: string
  fulfillment: Fulfillment | ''
  address: string
  distanceInKm: string
}

export type CheckoutErrors = Partial<Record<keyof CheckoutDetails, string>>

export function validateCheckout(details: CheckoutDetails): CheckoutErrors {
  const errors: CheckoutErrors = {}

  if (!details.customerName.trim()) errors.customerName = 'Informe seu nome.'
  if (!details.fulfillment) errors.fulfillment = 'Escolha entrega ou retirada.'

  if (details.fulfillment === 'entrega') {
    if (!details.address.trim()) errors.address = 'Informe o endereço de entrega.'
    const distance = Number(details.distanceInKm.replace(',', '.'))
    if (!details.distanceInKm.trim() || !Number.isFinite(distance) || distance <= 0) {
      errors.distanceInKm = 'Informe a distância estimada em quilômetros.'
    }
  }

  return errors
}

export function deliveryFeeInCents(distanceInKm: string, feePerKmInCents: number): number {
  const distance = Number(distanceInKm.replace(',', '.'))
  return Number.isFinite(distance) && distance > 0 ? Math.round(distance * feePerKmInCents) : 0
}
