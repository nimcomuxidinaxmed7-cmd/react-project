import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import App from './App'
import { getProducts } from './api/products'

vi.mock('./api/products', () => ({
  getProducts: vi.fn(),
  getProduct: vi.fn()
}))

describe('App', () => {
  it('renders the home page, navigation and footer', async () => {
    getProducts.mockResolvedValue([])

    render(
      <CartProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </CartProvider>
    )

    expect(screen.getByText('ShopEase')).toBeInTheDocument()
    expect(screen.getByText('Find what you love.')).toBeInTheDocument()
    expect(screen.getByText('Shopease')).toBeInTheDocument()
    expect(await screen.findByText('Our Products')).toBeInTheDocument()
  })
})
