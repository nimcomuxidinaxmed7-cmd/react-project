import { describe, it, expect, vi, afterEach } from 'vitest'
import {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct
} from './products'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('Product API', () => {
  it('gets all products', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, title: 'Bag' }]
    }))

    const data = await getProducts()
    expect(data).toHaveLength(1)
    expect(data[0].title).toBe('Bag')
  })

  it('gets one product', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1, title: 'Bag' })
    }))

    const data = await getProduct(1)
    expect(data.title).toBe('Bag')
  })

  it('adds a product using POST', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1, title: 'Bag' })
    }))

    const data = await addProduct({ title: 'Bag' })
    expect(data.title).toBe('Bag')
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ method: 'POST' })
    )
  })

  it('updates a product using PUT', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1, title: 'New Bag' })
    }))

    const data = await updateProduct(1, { title: 'New Bag' })
    expect(data.title).toBe('New Bag')
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/1'),
      expect.objectContaining({ method: 'PUT' })
    )
  })

  it('deletes a product using DELETE', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1 })
    }))

    const data = await deleteProduct(1)
    expect(data.id).toBe(1)
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/1'),
      expect.objectContaining({ method: 'DELETE' })
    )
  })

  it('handles failed product requests', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))

    await expect(getProducts()).rejects.toThrow('Could not load products')
    await expect(getProduct(1)).rejects.toThrow('Product not found')
    await expect(addProduct({})).rejects.toThrow('Could not add product')
    await expect(updateProduct(1, {})).rejects.toThrow('Could not update product')
    await expect(deleteProduct(1)).rejects.toThrow('Could not delete product')
  })
})
