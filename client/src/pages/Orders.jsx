import { useEffect, useState } from "react";
import axios from "../api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <h2>No orders found.</h2>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-5 mb-6 shadow"
          >
            <h2 className="font-bold text-lg">
              Order ID: {order._id}
            </h2>

            <p className="mt-2">
              Status: <b>{order.status}</b>
            </p>

            <p>
              Total: <b>${order.totalAmount}</b>
            </p>

            <div className="mt-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 border-b py-3"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain"
                  />

                  <div>
                    <p>{item.title}</p>
                    <p>${item.price}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;