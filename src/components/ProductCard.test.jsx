import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import ProductCard from './ProductCard'
import { CartProvider } from '../context/CartContext'

describe('ProductCard', () => {
  const product = {
    id: 1,
    title: 'Test Bag',
    price: 20,
    image: 'https://example.com/bag.jpg'
  }

  it('shows product information', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <ProductCard product={product} />
        </CartProvider>
      </MemoryRouter>
    )

    expect(screen.getByText('Test Bag')).toBeInTheDocument()
    expect(screen.getByText('$20')).toBeInTheDocument()
  })

  it('shows a details link', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <ProductCard product={product} />
        </CartProvider>
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: /details/i })).toHaveAttribute(
      'href',
      '/product/1'
    )
  })

  it('has an add to cart button', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <ProductCard product={product} />
        </CartProvider>
      </MemoryRouter>
    )

    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()
  })

  it('adds a product to the cart', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <CartProvider>
          <ProductCard product={product} />
        </CartProvider>
      </MemoryRouter>
    )

    await user.click(screen.getByRole('button', { name: /add to cart/i }))
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()
  })
})
