import { useEffect, useState } from "react";
import axios from "../api";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("/api/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlist(res.data.wishlist);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`/api/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">❤️ Your Wishlist is Empty</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">❤️ My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div key={item._id} className="border rounded-lg p-4 shadow">
            <img
              src={item.image}
              alt={item.title}
              className="h-40 w-full object-contain"
            />

            <h2 className="font-semibold mt-3">{item.title}</h2>

            <p className="text-green-600 font-bold">${item.price}</p>

            <button
              onClick={() => removeFromWishlist(item._id)}
              className="mt-3 w-full bg-red-500 text-white py-2 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;