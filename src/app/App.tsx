import { useMemo, useState } from 'react'
import { ArrowRight, Check, Clock3, MapPin, Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { store } from '../config/store'
import { categories, products } from '../data/products'
import { createWhatsAppUrl } from '../services/whatsapp'
import type { CartItem, CategoryId, Product } from '../types/product'
import { formatCurrency } from '../utils/currency'
import { calculateCartTotal } from '../utils/cart'
import { deliveryFeeInCents, validateCheckout, type CheckoutDetails, type CheckoutErrors } from '../utils/checkout'

type Filter = 'todos' | CategoryId

export function App() {
  const [filter, setFilter] = useState<Filter>('todos')
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [checkout, setCheckout] = useState<CheckoutDetails>({ customerName: '', fulfillment: '', address: '', distanceInKm: '' })
  const [checkoutErrors, setCheckoutErrors] = useState<CheckoutErrors>({})
  const visibleProducts = filter === 'todos' ? products : products.filter((product) => product.categoryId === filter)
  const total = useMemo(() => calculateCartTotal(cart), [cart])
  const deliveryFee = checkout.fulfillment === 'entrega'
    ? deliveryFeeInCents(checkout.distanceInKm, store.deliveryFeePerKmInCents)
    : 0
  const orderTotal = total + deliveryFee
  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0)

  function updateCart(product: Product, change: number) {
    setCart((items) => {
      const current = items.find((item) => item.product.id === product.id)
      if (!current && change > 0) return [...items, { product, quantity: 1 }]
      if (!current) return items
      const nextQuantity = current.quantity + change
      return nextQuantity === 0
        ? items.filter((item) => item.product.id !== product.id)
        : items.map((item) => item.product.id === product.id ? { ...item, quantity: nextQuantity } : item)
    })
  }

  function updateCheckout(field: keyof CheckoutDetails, value: string) {
    setCheckout((details) => ({ ...details, [field]: value }))
    setCheckoutErrors((errors) => ({ ...errors, [field]: undefined }))
  }

  function openWhatsApp() {
    const errors = validateCheckout(checkout)
    setCheckoutErrors(errors)
    if (cart.length === 0 || Object.keys(errors).length > 0 || !checkout.fulfillment) return

    window.open(createWhatsAppUrl(cart, {
      customerName: checkout.customerName.trim(),
      fulfillment: checkout.fulfillment,
      address: checkout.address.trim(),
      subtotalInCents: total,
      deliveryFeeInCents: deliveryFee,
    }), '_blank', 'noopener,noreferrer')
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Márcio Lanches Artesanais, início"><span>M</span>árcio<br />Lanches Artesanais</a>
        <div className="header-status"><span></span>{store.status}</div>
        <button className="cart-trigger" type="button" onClick={() => setIsCartOpen(true)} aria-label={`Abrir pedido, ${quantity} itens`}>
          <ShoppingBag size={19} /> <span>Seu pedido</span><b>{quantity}</b>
        </button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="pretitle"><MapPin size={15} /> Lanches feitos no bairro</p>
          <h1>Tem sabor de<br /><em>ponto de encontro.</em></h1>
          <p className="hero-text">Seu lanche favorito, feito na hora e enviado para o WhatsApp em poucos toques.</p>
          <a className="button primary" href="#cardapio">Ver cardápio <ArrowRight size={18} /></a>
          <div className="hero-info"><Clock3 size={18} /><div><strong>Hoje, até as 23h</strong><span>Retirada e entrega na região</span></div></div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="burst">FEITO<br />NA HORA</div>
          <img className="hero-photo" src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=88" alt="" />
          <p>Desde 2012<br /><b>no seu bairro</b></p>
        </div>
      </section>

      <section className="menu-section" id="cardapio">
        <div className="section-heading"><div><p className="pretitle">Escolha seu favorito</p><h2>Cardápio de hoje</h2></div><p>Adicione ao pedido e confirme tudo no WhatsApp.</p></div>
        <nav className="filters" aria-label="Categorias do cardápio">
          <button className={filter === 'todos' ? 'active' : ''} onClick={() => setFilter('todos')}>Tudo</button>
          {categories.map((category) => <button key={category.id} className={filter === category.id ? 'active' : ''} onClick={() => setFilter(category.id)}>{category.name}</button>)}
        </nav>
        <div className="product-grid">
          {visibleProducts.map((product) => {
            const cartItem = cart.find((item) => item.product.id === product.id)
            return <article className={`product-card ${!product.available ? 'unavailable' : ''}`} key={product.id}>
              <div className="product-image"><img src={product.imageUrl} alt={product.name} />{product.featured && <small>favorito da casa</small>}</div>
              <div className="product-body"><div><h3>{product.name}</h3><p>{product.description}</p></div><div className="product-bottom"><strong>{formatCurrency(product.priceInCents)}</strong>{product.available ? cartItem ? <div className="stepper"><button aria-label={`Remover ${product.name}`} onClick={() => updateCart(product, -1)}><Minus size={16} /></button><span>{cartItem.quantity}</span><button aria-label={`Adicionar ${product.name}`} onClick={() => updateCart(product, 1)}><Plus size={16} /></button></div> : <button className="add-button" onClick={() => updateCart(product, 1)}>Adicionar <Plus size={16} /></button> : <span className="sold-out">Indisponível</span>}</div></div>
            </article>
          })}
        </div>
      </section>

      <section className="promise"><span>✦</span><p>Pedido simples, sem cadastro e sem surpresa.</p><div><Check size={17} /> Você revisa antes de enviar <Check size={17} /> A loja confirma os detalhes</div></section>

      <aside className={`cart-panel ${isCartOpen ? 'open' : ''}`} aria-label="Seu pedido">
        <div className="cart-head"><div><p className="pretitle">Seu pedido</p><h2>Tá quase lá.</h2></div><button onClick={() => setIsCartOpen(false)} aria-label="Fechar pedido"><X size={22} /></button></div>
        {cart.length === 0 ? <div className="empty-cart"><ShoppingBag size={28} /><p>Seu pedido está vazio.</p><button onClick={() => { setIsCartOpen(false); document.getElementById('cardapio')?.scrollIntoView({ behavior: 'smooth' }) }}>Escolher um lanche</button></div> : <form onSubmit={(event) => { event.preventDefault(); openWhatsApp() }}><div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.product.id}><div><strong>{item.product.name}</strong><span>{formatCurrency(item.product.priceInCents)}</span></div><div className="stepper"><button aria-label={`Diminuir ${item.product.name}`} onClick={() => updateCart(item.product, -1)}><Minus size={15} /></button><span>{item.quantity}</span><button aria-label={`Aumentar ${item.product.name}`} onClick={() => updateCart(item.product, 1)}><Plus size={15} /></button></div></div>)}</div><div className="cart-total"><span>Subtotal</span><strong>{formatCurrency(total)}</strong></div><fieldset className="checkout-fields"><legend>Como você prefere receber?</legend><label>Seu nome<input value={checkout.customerName} onChange={(event) => updateCheckout('customerName', event.target.value)} aria-invalid={Boolean(checkoutErrors.customerName)} /></label>{checkoutErrors.customerName && <small className="field-error">{checkoutErrors.customerName}</small>}<div className="fulfillment-options"><label><input type="radio" name="fulfillment" checked={checkout.fulfillment === 'retirada'} onChange={() => updateCheckout('fulfillment', 'retirada')} /> Retirada</label><label><input type="radio" name="fulfillment" checked={checkout.fulfillment === 'entrega'} onChange={() => updateCheckout('fulfillment', 'entrega')} /> Entrega</label></div>{checkoutErrors.fulfillment && <small className="field-error">{checkoutErrors.fulfillment}</small>}{checkout.fulfillment === 'entrega' && <div className="delivery-fields"><label>Endereço de entrega<input value={checkout.address} onChange={(event) => updateCheckout('address', event.target.value)} aria-invalid={Boolean(checkoutErrors.address)} /></label>{checkoutErrors.address && <small className="field-error">{checkoutErrors.address}</small>}<label>Distância estimada (km)<input inputMode="decimal" placeholder="Ex.: 3,5" value={checkout.distanceInKm} onChange={(event) => updateCheckout('distanceInKm', event.target.value)} aria-invalid={Boolean(checkoutErrors.distanceInKm)} /></label>{checkoutErrors.distanceInKm && <small className="field-error">{checkoutErrors.distanceInKm}</small>}</div>}</fieldset>{checkout.fulfillment === 'entrega' && <div className="delivery-fee"><span>Entrega estimada</span><strong>{formatCurrency(deliveryFee)}</strong></div>}<div className="cart-total grand-total"><span>Total estimado</span><strong>{formatCurrency(orderTotal)}</strong></div><p className="delivery-note">{store.deliveryNote}</p><button className="button whatsapp" type="submit">Continuar no WhatsApp <ArrowRight size={18} /></button></form>}
      </aside>
      {isCartOpen && <button className="scrim" aria-label="Fechar pedido" onClick={() => setIsCartOpen(false)} />}
      {quantity > 0 && <button className="mobile-order" onClick={() => setIsCartOpen(true)}><ShoppingBag size={18} /> Ver pedido <b>{formatCurrency(total)}</b></button>}
    </main>
  )
}
