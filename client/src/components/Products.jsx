import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const res = await axios.post(
        "/api/cart/add",
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

      alert(res.data.message);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to add to cart");
    }
  };

  const handleAddToWishlist = async (product) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
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

      alert(res.data.message);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to add to wishlist");
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Products
      </h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded-lg flex-1"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-3 rounded-lg"
        >
          <option value="all">All Categories</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelry</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <h2 className="text-center text-xl font-semibold text-gray-500">
          No products found.
        </h2>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow-md p-4 hover:shadow-xl transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-48 w-full object-contain"
              />

              <h2 className="mt-4 font-semibold line-clamp-2">
                {product.title}
              </h2>

              <p className="text-green-600 text-xl font-bold mt-2">
                ${product.price}
              </p>

              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
              >
                🛒 Add to Cart
              </button>

              <button
                onClick={() => handleAddToWishlist(product)}
                className="mt-2 w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded"
              >
                ❤️ Add to Wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;