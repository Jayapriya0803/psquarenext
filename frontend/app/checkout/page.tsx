"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  /* ================= LOAD LOGGED-IN USER ================= */
  useEffect(() => {
    async function loadUser() {
      try {
        // now read user through our server (cookie auth)
        const res = await fetch("/api/me", { cache: "no-store" });

        if (!res.ok) return;

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.log("User load failed");
      }
    }

    loadUser();
  }, []);

  /* ================= CALCULATE TOTAL ================= */
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const gst = subtotal * 0.05;
  const grandTotal = subtotal + gst;

  /* ================= CONFIRM ORDER ================= */
  const confirmOrder = async () => {
    if (!items.length) {
      setMsg("Cart is empty");
      return;
    }

    if (loading) return; // 🔴 prevents double order click

    setLoading(true);
    setMsg("");

    try {
      const orderItems = items.map((i) => ({
        productId: i.id,
        name: i.name,
        description: i.description,
        price: i.price,
        qty: i.qty,
        unit: i.unit,
      }));

      // ⭐ CALL OUR NEXT SERVER ROUTE (NOT STRAPI DIRECTLY)
      const res = await fetch("/api/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: orderItems,
          total: grandTotal,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        clearCart();
        router.push("/order-success");
      } else {
        setMsg(data.message || "Order failed. Try again.");
        setLoading(false);
      }
    } catch (err) {
      setMsg("Server error. Please try again.");
      setLoading(false);
    }
  };

  if (!user) return <p className="p-6">Loading customer details...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">

      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-6">Proforma Invoice Preview</h1>

      {/* CUSTOMER DETAILS */}
      <div className="border rounded-lg p-4 mb-6 bg-gray-50">
        <h2 className="font-semibold mb-2">Bill To</h2>

        <p className="font-semibold">
          {user.firstName} {user.lastName}
        </p>

        <p>{user.addressline}</p>
        <p>{user.city}, {user.state}</p>
        <p>{user.country}</p>

        <p className="mt-2">Mobile: {user.mobile}</p>

        {user.gst && <p>GSTIN: {user.gst}</p>}
      </div>

      {/* ITEMS TABLE */}
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Product</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.description}</td>
              <td className="border p-2">
                {item.qty} {item.unit}
              </td>
              <td className="border p-2">₹{item.price}</td>
              <td className="border p-2">₹{(item.price * item.qty).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TOTALS */}
      <div className="mt-6 text-right space-y-1">
        <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
        <p>GST (5%): ₹{gst.toFixed(2)}</p>
        <p className="font-bold text-lg">Grand Total: ₹{grandTotal.toFixed(2)}</p>
      </div>

      {msg && <p className="text-red-500 mt-4">{msg}</p>}

      {/* CONFIRM BUTTON */}
      <button
        type="button"
        onClick={confirmOrder}
        disabled={loading}
        className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Placing Order..." : "Confirm Order"}
      </button>
    </div>
  );
}