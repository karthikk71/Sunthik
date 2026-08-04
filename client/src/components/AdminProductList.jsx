import { useEffect, useState } from "react";
import axios from "../api";
import toast from "react-hot-toast";

function AdminProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load products");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await axios.delete(`/api/products/${id}`);
      toast.success("Product Deleted");
      fetchProducts();
    } catch (error) {
      console.log(error);
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-5">All Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 w-full object-contain"
            />

            <h3 className="font-bold mt-3 line-clamp-2">
              {product.title}
            </h3>

            <p className="text-green-600 font-bold mt-2">
              ${product.price}
            </p>

            <p className="text-gray-500 text-sm">
              Stock: {product.stock}
            </p>

            <button
              onClick={() => handleDelete(product._id)}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProductList;