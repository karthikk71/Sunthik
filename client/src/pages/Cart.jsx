import { useEffect, useState } from "react";
import axios from "../api";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(res.data.cart);
    } catch (error) {
      console.log(error);
      alert("Failed to load cart");
    }
  };

  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`/api/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCart();
    } catch (error) {
      console.log(error);
      alert("Failed to remove item");
    }
  };

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "/api/orders/place",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      fetchCart();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Order failed");
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        🛒 Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-600">
            Your cart is empty 😔
          </h2>

          <p className="mt-2 text-gray-500">
            Add some products to start shopping.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white rounded-xl shadow-md p-5"
              >
                <div className="flex flex-col sm:flex-row items-center gap-5 w-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-contain"
                  />

                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="font-semibold text-lg">
                      {item.title}
                    </h2>

                    <p className="text-green-600 font-bold mt-2">
                      ${item.price}
                    </p>

                    <p className="text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item._id)}
                  className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl font-bold">
              Total: ${total.toFixed(2)}
            </h2>

            <button
              onClick={placeOrder}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;