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

      // fix for map error
      const ordersArray = Array.isArray(data) ? data : data.data || [];

      setOrders(ordersArray);
    }

    loadOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>

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
  );
}