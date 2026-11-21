import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CartProvider, useCart } from './CartContext'

function CartTest() {
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart()

  return (
    <div>
      <p data-testid="cart">{JSON.stringify(cartItems)}</p>

      <button onClick={() => addToCart({ id: 1, title: 'Test Bag', price: 20 })}>
        Add product
      </button>

      <button onClick={() => addToCart({ id: 1, title: 'Test Bag', price: 20 })}>
        Add same product
      </button>

      <button onClick={() => removeFromCart(1)}>Remove product</button>

      <button onClick={() => updateQuantity(1, 5)}>Update quantity</button>

      <button onClick={() => updateQuantity(1, 0)}>Invalid quantity</button>
    </div>
  )
}

function renderCart() {
  return render(
    <CartProvider>
      <CartTest />
    </CartProvider>
  )
}

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('starts with an empty cart', () => {
    renderCart()
    expect(screen.getByTestId('cart').textContent).toBe('[]')
  })

  it('adds a product to the cart', async () => {
    const user = userEvent.setup()
    renderCart()

    await user.click(screen.getByText('Add product'))

    expect(screen.getByTestId('cart').textContent).toContain('"quantity":1')
  })

  it('increases quantity when adding the same product', async () => {
    const user = userEvent.setup()
    renderCart()

    await user.click(screen.getByText('Add product'))
    await user.click(screen.getByText('Add same product'))

    expect(screen.getByTestId('cart').textContent).toContain('"quantity":2')
  })

  it('removes a product from the cart', async () => {
    const user = userEvent.setup()
    renderCart()

    await user.click(screen.getByText('Add product'))
    await user.click(screen.getByText('Remove product'))

    expect(screen.getByTestId('cart').textContent).toBe('[]')
  })

  it('updates product quantity', async () => {
    const user = userEvent.setup()
    renderCart()

    await user.click(screen.getByText('Add product'))
    await user.click(screen.getByText('Update quantity'))

    expect(screen.getByTestId('cart').textContent).toContain('"quantity":5')
  })

  it('does not accept a quantity below one', async () => {
    const user = userEvent.setup()
    renderCart()

    await user.click(screen.getByText('Add product'))
    await user.click(screen.getByText('Invalid quantity'))

    expect(screen.getByTestId('cart').textContent).toContain('"quantity":1')
  })

  it('saves cart items in localStorage', async () => {
    const user = userEvent.setup()
    renderCart()

    await user.click(screen.getByText('Add product'))

    const savedCart = JSON.parse(localStorage.getItem('shopease-cart'))
    expect(savedCart[0].title).toBe('Test Bag')
  })

  it('loads saved cart items from localStorage', () => {
    localStorage.setItem('shopease-cart', JSON.stringify([
      { id: 2, title: 'Saved Bag', price: 30, quantity: 2 }
    ]))

    renderCart()

    expect(screen.getByTestId('cart').textContent).toContain('Saved Bag')
  })

  it('handles invalid saved cart data', () => {
    localStorage.setItem('shopease-cart', 'invalid JSON')

    renderCart()

    expect(screen.getByTestId('cart').textContent).toBe('[]')
  })
})
