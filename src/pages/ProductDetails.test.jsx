import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import ProductDetails from './ProductDetails'
import { getProduct } from '../api/products'

vi.mock('../api/products', () => ({
  getProduct: vi.fn()
}))

const product = {
  id: 1,
  title: 'Test Watch',
  price: 40,
  description: 'A simple watch',
  image: 'watch.jpg'
}

function renderDetails() {
  return render(
    <CartProvider>
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>
    </CartProvider>
  )
}

describe('ProductDetails', () => {
  beforeEach(() => vi.clearAllMocks())

  it('shows a loading message', () => {
    getProduct.mockReturnValue(new Promise(() => {}))
    renderDetails()

    expect(screen.getByText('Loading product...')).toBeInTheDocument()
  })

  it('shows product information', async () => {
    getProduct.mockResolvedValue(product)
    renderDetails()

    expect(await screen.findByText('Test Watch')).toBeInTheDocument()
    expect(screen.getByText('A simple watch')).toBeInTheDocument()
  })

  it('shows an error when the product cannot load', async () => {
    getProduct.mockRejectedValue(new Error('Not found'))
    renderDetails()

    expect(await screen.findByText(
      'Product could not be found'
    )).toBeInTheDocument()
  })

  it('adds the displayed product to the cart', async () => {
    getProduct.mockResolvedValue(product)
    const user = userEvent.setup()
    renderDetails()

    await screen.findByText('Test Watch')
    await user.click(screen.getByText('Add to cart'))

    expect(localStorage.getItem('shopease-cart')).toContain('Test Watch')
  })
})
