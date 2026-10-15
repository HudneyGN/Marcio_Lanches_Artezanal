import { describe, expect, it } from 'vitest'
import { deliveryFeeInCents, validateCheckout } from './checkout'

describe('checkout', () => {
  it('exige endereço e quilometragem somente para entrega', () => {
    expect(validateCheckout({ customerName: 'Ana', fulfillment: 'entrega', address: '', distanceInKm: '' })).toMatchObject({ address: expect.any(String), distanceInKm: expect.any(String) })
    expect(validateCheckout({ customerName: 'Ana', fulfillment: 'retirada', address: '', distanceInKm: '' })).toEqual({})
  })

  it('calcula a taxa de R$ 0,95 por quilômetro em centavos', () => {
    expect(deliveryFeeInCents('3,5', 95)).toBe(333)
  })
})
