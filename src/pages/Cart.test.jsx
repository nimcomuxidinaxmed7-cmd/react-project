import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import Cart from './Cart'

const savedItems = [
  {
    id: 1,
    title: 'Test Bag',
    price: 20,
    image: 'bag.jpg',
    quantity: 2
  }
]

function renderCart() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <Cart />
      </CartProvider>
    </MemoryRouter>
  )
}

describe('Cart page', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows an empty cart message', () => {
    renderCart()
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument()
  })

  it('shows saved cart products and total', () => {
    localStorage.setItem('shopease-cart', JSON.stringify(savedItems))
    renderCart()

    expect(screen.getByText('Test Bag')).toBeInTheDocument()
    expect(screen.getByText('Total: $40.00')).toBeInTheDocument()
  })

  it('increases product quantity', async () => {
    localStorage.setItem('shopease-cart', JSON.stringify(savedItems))
    const user = userEvent.setup()
    renderCart()

    await user.click(screen.getByText('+'))

    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('Total: $60.00')).toBeInTheDocument()
  })

  it('decreases product quantity', async () => {
    localStorage.setItem('shopease-cart', JSON.stringify(savedItems))
    const user = userEvent.setup()
    renderCart()

    await user.click(screen.getByText('-'))

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('Total: $20.00')).toBeInTheDocument()
  })

  it('removes a product from the cart', async () => {
    localStorage.setItem('shopease-cart', JSON.stringify(savedItems))
    const user = userEvent.setup()
    renderCart()

    await user.click(screen.getByText('Remove'))

    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument()
  })
})
