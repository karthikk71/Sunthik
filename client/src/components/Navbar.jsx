import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-[#131921] text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-yellow-400">
          Sunthik
        </Link>

        <div className="flex gap-6">
          <Link to="/wishlist">❤️ Wishlist</Link>
          <Link to="/cart">🛒 Cart</Link>
          <Link to="/orders">📦 Orders</Link>
          <Link to="/profile">👤 Profile</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;