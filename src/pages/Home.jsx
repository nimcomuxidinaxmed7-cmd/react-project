import { useEffect, useState } from 'react'
import { getProducts } from '../api/products'
import ProductCard from '../components/ProductCard'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data))
      .catch(() => setError('Could not load products. Please try again.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <section
        className="min-h-[360px] flex items-center px-8 md:px-20 bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(90deg, rgba(0,0,0,.65), rgba(0,0,0,.1)), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600')"
        }}
      >
        <div className="text-white max-w-lg">
          <p className="uppercase tracking-widest text-sm">Welcome to Shopease</p>
          <h1 className="text-4xl md:text-6xl font-bold mt-3">
            Find what you love.
          </h1>
          <p className="mt-4">Discover products made for your everyday life.</p>
          <a href="#products" className="inline-block bg-blue-600 px-6 py-3 mt-6 rounded-lg">
            Shop now
          </a>
        </div>
      </section>

      <section id="products" className="px-6 md:px-12 py-12">
        <h2 className="text-3xl font-bold">Our Products</h2>
        <p className="text-gray-500 mt-2 mb-8">Explore our latest collection.</p>

        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
