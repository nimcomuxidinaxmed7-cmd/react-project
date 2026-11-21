import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ShopEase
        </Link>

        <div className="flex flex-wrap items-center gap-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>

          <Link to="/cart" className="text-gray-700 hover:text-blue-600">
            Cart
          </Link>

          <Link
            to="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
