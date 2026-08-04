import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api";
import toast from "react-hot-toast";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/api/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load product");
    }
  };

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first");
        return;
      }

      const res = await axios.post(
        "/api/cart/add",
        {
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first");
        return;
      }

      const res = await axios.post(
        "/api/wishlist/add",
        {
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to add to wishlist"
      );
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    window.location.href = "/cart";
  };

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Product Image */}
        <div className="flex justify-center bg-gray-100 rounded-2xl p-8 shadow-md">
          <img
            src={product.image}
            alt={product.title}
            className="w-80 h-80 object-contain hover:scale-105 transition duration-300"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-4xl font-bold">{product.title}</h1>

          <p className="text-yellow-500 text-lg mt-3">
            ⭐ {product.rating?.rate} ({product.rating?.count} Reviews)
          </p>

          <h2 className="text-4xl font-bold text-green-600 mt-5">
            ${product.price}
          </h2>

          <p className="mt-3 text-green-600 font-semibold">
            ✅ In Stock
          </p>

          <p className="text-gray-600 leading-7 mt-6">
            {product.description}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-4 mt-8">
            <span className="font-semibold">Quantity:</span>

            <button
              onClick={() =>
                setQuantity(quantity > 1 ? quantity - 1 : 1)
              }
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
            >
              -
            </button>

            <span className="text-xl font-bold">{quantity}</span>

            <button
              onClick={() => setQuantity(quantity + 1)}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
            >
              +
            </button>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              🛒 Add to Cart
            </button>

            <button
              onClick={handleAddToWishlist}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              ❤️ Add to Wishlist
            </button>

            <button
              onClick={handleBuyNow}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              ⚡ Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;