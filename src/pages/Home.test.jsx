import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import Home from './Home'
import { getProducts } from '../api/products'

vi.mock('../api/products', () => ({
  getProducts: vi.fn()
}))

const products = [
  {
    id: 1,
    title: 'Test Shoes',
    price: 25,
    image: 'shoes.jpg'
  }
]

function renderHome() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <Home />
      </CartProvider>
    </MemoryRouter>
  )
}

describe('Home page', () => {
  beforeEach(() => vi.clearAllMocks())

  it('shows the welcome section', async () => {
    getProducts.mockResolvedValue(products)
    renderHome()

    expect(screen.getByText('Find what you love.')).toBeInTheDocument()
    expect(screen.getByText('Our Products')).toBeInTheDocument()
  })

  it('shows a loading message while products load', () => {
    getProducts.mockReturnValue(new Promise(() => {}))
    renderHome()

    expect(screen.getByText('Loading products...')).toBeInTheDocument()
  })

  it('displays products after loading', async () => {
    getProducts.mockResolvedValue(products)
    renderHome()

    expect(await screen.findByText('Test Shoes')).toBeInTheDocument()
  })

  it('shows an error when products cannot load', async () => {
    getProducts.mockRejectedValue(new Error('Network error'))
    renderHome()

    expect(await screen.findByText(
      'Could not load products. Please try again.'
    )).toBeInTheDocument()
  })
})
