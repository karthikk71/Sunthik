import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaSearch,
} from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <nav className="bg-[#131921] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-yellow-400"
        >
          Sunthik
        </Link>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-xl relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full py-2 px-4 rounded-l-lg text-black outline-none"
          />

          <button className="bg-yellow-400 px-4 rounded-r-lg text-black">
            <FaSearch />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">

          <Link
            to="/wishlist"
            className="flex items-center gap-2 hover:text-yellow-400"
          >
            <FaHeart />
            Wishlist
          </Link>

          <Link
            to="/cart"
            className="flex items-center gap-2 hover:text-yellow-400"
          >
            <FaShoppingCart />
            Cart
          </Link>

          <Link
            to="/orders"
            className="hover:text-yellow-400"
          >
            Orders
          </Link>

          {token && (
            <Link
              to="/profile"
              className="flex items-center gap-2 hover:text-yellow-400"
            >
              <FaUser />
              Profile
            </Link>
          )}

          {role === "admin" && (
            <Link
              to="/admin"
              className="hover:text-yellow-400 font-semibold"
            >
              Admin
            </Link>
          )}

          {!token ? (
            <Link
              to="/login"
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#232F3E] px-5 py-4 space-y-4">

          <div className="flex">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 p-2 rounded-l text-black"
            />
            <button className="bg-yellow-400 px-4 rounded-r text-black">
              <FaSearch />
            </button>
          </div>

          <Link to="/" onClick={() => setMenuOpen(false)} className="block">
            🏠 Home
          </Link>

          <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="block">
            ❤️ Wishlist
          </Link>

          <Link to="/cart" onClick={() => setMenuOpen(false)} className="block">
            🛒 Cart
          </Link>

          <Link to="/orders" onClick={() => setMenuOpen(false)} className="block">
            📦 Orders
          </Link>

          {token && (
            <Link to="/profile" onClick={() => setMenuOpen(false)} className="block">
              👤 Profile
            </Link>
          )}

          {role === "admin" && (
            <Link to="/admin" onClick={() => setMenuOpen(false)} className="block">
              🛠️ Admin Dashboard
            </Link>
          )}

          {!token ? (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="block">
              🔑 Login
            </Link>
          ) : (
            <button
              onClick={logout}
              className="block w-full text-left text-red-400"
            >
              🚪 Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;