import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../api/products'
import { useCart } from '../context/CartContext'

function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    getProduct(id)
      .then(data => {
        if (active) setProduct(data)
      })
      .catch(() => {
        if (active) setError('Product could not be found')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [id])

  if (loading) return <p className="p-10">Loading product...</p>
  if (error) return <p className="p-10 text-red-500">{error}</p>

  return (
    <div className="p-8 md:p-16 flex flex-col md:flex-row gap-10 bg-white">
      <img
        src={product.image}
        alt={product.title}
        className="w-full md:w-1/2 h-80 object-contain"
      />

      <div>
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-blue-600 text-2xl mt-4">${product.price}</p>
        <p className="mt-6 text-gray-600">{product.description}</p>

        <button
          onClick={() => addToCart(product)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-6"
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default ProductDetails
