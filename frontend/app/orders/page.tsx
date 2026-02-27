"use client";

import { useEffect, useState } from "react";

interface OrderItem {
  name: string;
  description: string;
  qty: number;
  price: number;
}

interface Order {
  id: number;
  orderStatus?: string;
  total?: number;
  createdAt?: string;
  items?: OrderItem[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Convert UTC → IST
  const formatDateTime = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // ⭐ CANCEL ORDER (now uses order id only)
  const cancelOrder = async (order: Order) => {
    const confirmCancel = confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    try {
      const res = await fetch("/api/cancel-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId: order.id }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Your order cancelled");

        // update only selected order
        setOrders((prev) =>
          prev.map((o) =>
            o.id === order.id ? { ...o, orderStatus: "cancelled" } : o
          )
        );
      } else {
        alert(data.message || "Cancel failed");
      }
    } catch {
      alert("Server not responding");
    }
  };

  // Load Orders
  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await fetch("/api/my-order", { cache: "no-store" });
        const data = await res.json();

        setOrders(
          (data || []).map((o: any) => ({
            id: o.id,
            orderStatus: o.orderStatus,
            total: o.total,
            createdAt: o.createdAt,
            items: o.items || [],
          }))
        );
      } catch {
        console.log("Failed to load orders");
      }
      setLoading(false);
    }

    loadOrders();
  }, []);

  if (loading)
    return <p className="p-10 text-center">Loading your orders...</p>;

  if (!orders.length)
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold">No orders yet</h2>
        <p className="text-gray-500 mt-2">
          Start shopping to see your orders here.
        </p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-xl p-5 shadow-sm bg-white"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-semibold text-lg">
                  Order #{order.id}
                </p>

                <p className="text-sm text-gray-500">
                  Status: {order.orderStatus}
                </p>

                <p className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded mt-1 inline-block">
                  Placed: {formatDateTime(order.createdAt)}
                </p>
              </div>

              <div className="text-right">
                <div className="font-bold text-green-700 text-lg">
                  ₹{order.total ?? 0}
                </div>

                {(order.orderStatus || "").toLowerCase() === "pending" && (
                  <button
                    onClick={() => cancelOrder(order)}
                    className="mt-2 bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>

            <table className="w-full text-sm border mt-3">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border text-left">Product</th>
                  <th className="p-2 border text-left">Description</th>
                  <th className="p-2 border">Qty</th>
                  <th className="p-2 border">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items?.map((item, i) => (
                  <tr key={`${order.id}-${i}`}>
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{item.description}</td>
                    <td className="border p-2 text-center">{item.qty}</td>
                    <td className="border p-2 text-center">₹{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}