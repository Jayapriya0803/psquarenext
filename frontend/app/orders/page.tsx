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

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const cancelOrder = async (order: Order) => {
    if (!confirm("Cancel this order?")) return;

    try {
      const res = await fetch("/api/cancel-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id }),
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) =>
            o.id === order.id ? { ...o, orderStatus: "cancelled" } : o
          )
        );
      }
    } catch {
      alert("Server error");
    }
  };

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
      <div className="text-center p-10">
        <h2 className="text-xl font-semibold">No orders yet</h2>
        <p className="text-gray-500 mt-2">
          Start shopping to see your orders here.
        </p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      <div className="space-y-6">

        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg shadow-sm bg-white"
          >

            {/* Order Header */}
            <div className="bg-gray-50 p-4 flex flex-wrap justify-between text-sm border-b">

              <div>
                <p className="text-gray-500">ORDER PLACED</p>
                <p>{formatDateTime(order.createdAt)}</p>
              </div>

              <div>
                <p className="text-gray-500">TOTAL</p>
                <p className="font-semibold">₹{order.total ?? 0}</p>
              </div>

              <div>
                <p className="text-gray-500">ORDER ID</p>
                <p>#{order.id}</p>
              </div>

              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    order.orderStatus === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.orderStatus === "cancelled"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>
            </div>

            {/* Products */}
            <div className="p-4 space-y-4">

              {order.items?.map((item, i) => (
                <div
                  key={`${order.id}-${i}`}
                  className="flex justify-between items-center border-b pb-3"
                >

                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500 text-sm">
                      {item.description}
                    </p>
                  </div>

                  <div className="text-sm text-gray-600">
                    Qty: {item.qty}
                  </div>

                  <div className="font-semibold">
                    ₹{item.price}
                  </div>
                </div>
              ))}

              {/* Cancel button */}
              {(order.orderStatus || "").toLowerCase() === "pending" && (
                <div className="text-right pt-2">
                  <button
                    onClick={() => cancelOrder(order)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded"
                  >
                    Cancel Order
                  </button>
                </div>
              )}

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}