import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col h-full">
      
      <Link to={`/product/${product.id}`} className="flex flex-col flex-1">
        <div className="flex justify-center items-center h-48">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-40 object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>

        <h2 className="mt-4 text-sm md:text-base font-semibold text-gray-800 line-clamp-2 min-h-[48px]">
          {product.title}
        </h2>

        <p className="text-green-600 font-bold text-xl mt-3">
          ${product.price}
        </p>

        <p className="text-yellow-500 text-sm mt-1">
          ⭐ {product.rating?.rate} ({product.rating?.count} Reviews)
        </p>
      </Link>

      <div className="mt-4 space-y-2">
        <button
          onClick={() => addToWishlist(product)}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-medium transition"
        >
          ❤️ Add to Wishlist
        </button>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded-lg font-semibold transition"
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;