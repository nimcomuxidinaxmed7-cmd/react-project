import { useState } from 'react'
import { addProduct, updateProduct, deleteProduct } from '../api/products'

function Admin() {
  const [message, setMessage] = useState('')

  async function handleAdd() {
    try {
      await addProduct({
        title: 'Shopease New Product',
        price: 25,
        description: 'A sample product',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        category: 'electronics'
      })
      setMessage('Product added!')
    } catch {
      setMessage('Could not add product')
    }
  }

  async function handleUpdate() {
    try {
      await updateProduct(1, { title: 'Updated product', price: 30 })
      setMessage('Product updated!')
    } catch {
      setMessage('Could not update product')
    }
  }

  async function handleDelete() {
    try {
      await deleteProduct(1)
      setMessage('Product deleted!')
    } catch {
      setMessage('Could not delete product')
    }
  }

  return (
    <div className="p-8 md:p-12">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-gray-500 mt-2">Manage store products.</p>
      <div className="flex flex-wrap gap-4 mt-8">
        <button onClick={handleAdd} className="bg-blue-600 text-white p-3 rounded-lg">Add product</button>
        <button onClick={handleUpdate} className="bg-green-600 text-white p-3 rounded-lg">Update product</button>
        <button onClick={handleDelete} className="bg-red-600 text-white p-3 rounded-lg">Delete product</button>
      </div>
      <p className="mt-6">{message}</p>
    </div>
  )
}

export default Admin
