"use client";

import { useEffect, useState } from "react";

interface Item {
  name: string;
  description: string;
  qty: number;
  price: number;
}

interface Order {
  id: number;
  orderStatus: string;
  total: number;
  createdAt: string;
  items: Item[];
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function loadOrders() {
      const res = await fetch("/api/admin-orders");
      const data = await res.json();

      const ordersArray = Array.isArray(data) ? data : data.data || [];
      setOrders(ordersArray);
    }

    loadOrders();
  }, []);

  return (
    <div className="p-4 sm:p-6">

      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        All Orders
      </h1>

      {/* ✅ MOBILE VIEW (Cards) */}
      <div className="space-y-4 sm:hidden">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-xl p-4 shadow-sm bg-white"
          >
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Order #{order.id}</span>
              <span className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="text-sm text-gray-600 mb-2">
              {order.items?.map((item, i) => (
                <div key={i}>
                  {item.name} ({item.qty})
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <span className="font-bold">₹{order.total}</span>
              <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                {order.orderStatus}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ DESKTOP VIEW (Table) */}
      <div className="hidden sm:block overflow-x-auto">

        <table className="w-full border text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Products</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>

                <td className="border p-2">{order.id}</td>

                <td className="border p-2">
                  {order.items?.map((item, i) => (
                    <div key={i}>
                      {item.name} - {item.description} (Qty {item.qty})
                    </div>
                  ))}
                </td>

                <td className="border p-2">₹{order.total}</td>

                <td className="border p-2">{order.orderStatus}</td>

                <td className="border p-2">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}