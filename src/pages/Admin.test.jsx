import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Admin from './Admin'
import { addProduct, updateProduct, deleteProduct } from '../api/products'

vi.mock('../api/products', () => ({
  addProduct: vi.fn(),
  updateProduct: vi.fn(),
  deleteProduct: vi.fn()
}))

describe('Admin page', () => {
  beforeEach(() => vi.clearAllMocks())

  it('shows the admin dashboard and buttons', () => {
    render(<Admin />)

    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Add product')).toBeInTheDocument()
    expect(screen.getByText('Update product')).toBeInTheDocument()
    expect(screen.getByText('Delete product')).toBeInTheDocument()
  })

  it('adds a product', async () => {
    addProduct.mockResolvedValue({})
    const user = userEvent.setup()
    render(<Admin />)

    await user.click(screen.getByText('Add product'))

    expect(await screen.findByText('Product added!')).toBeInTheDocument()
    expect(addProduct).toHaveBeenCalled()
  })

  it('shows an error when adding fails', async () => {
    addProduct.mockRejectedValue(new Error('Failed'))
    const user = userEvent.setup()
    render(<Admin />)

    await user.click(screen.getByText('Add product'))

    expect(await screen.findByText('Could not add product'))
      .toBeInTheDocument()
  })

  it('updates a product', async () => {
    updateProduct.mockResolvedValue({})
    const user = userEvent.setup()
    render(<Admin />)

    await user.click(screen.getByText('Update product'))

    expect(await screen.findByText('Product updated!')).toBeInTheDocument()
    expect(updateProduct).toHaveBeenCalledWith(
      1,
      { title: 'Updated product', price: 30 }
    )
  })

  it('shows an error when updating fails', async () => {
    updateProduct.mockRejectedValue(new Error('Failed'))
    const user = userEvent.setup()
    render(<Admin />)

    await user.click(screen.getByText('Update product'))

    expect(await screen.findByText('Could not update product'))
      .toBeInTheDocument()
  })

  it('deletes a product', async () => {
    deleteProduct.mockResolvedValue({})
    const user = userEvent.setup()
    render(<Admin />)

    await user.click(screen.getByText('Delete product'))

    expect(await screen.findByText('Product deleted!')).toBeInTheDocument()
    expect(deleteProduct).toHaveBeenCalledWith(1)
  })

  it('shows an error when deleting fails', async () => {
    deleteProduct.mockRejectedValue(new Error('Failed'))
    const user = userEvent.setup()
    render(<Admin />)

    await user.click(screen.getByText('Delete product'))

    expect(await screen.findByText('Could not delete product'))
      .toBeInTheDocument()
  })
})
