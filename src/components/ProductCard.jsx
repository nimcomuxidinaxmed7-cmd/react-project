import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 flex flex-col">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain mb-4"
        />

        <h2 className="font-semibold text-gray-800 line-clamp-2 min-h-12">
          {product.title}
        </h2>
      </Link>

      <p className="text-blue-600 font-bold mt-2 mb-4">
        ${Number(product.price)}
      </p>

      <Link
        to={`/product/${product.id}`}
        className="text-blue-600 hover:underline mb-4"
      >
        View Details
      </Link>

      <button
        onClick={() => addToCart(product)}
        className="mt-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
