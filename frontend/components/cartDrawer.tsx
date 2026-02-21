"use client";

import { useCartStore } from "@/app/store/cartStore";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    increase,
    decrease,
    removeItem,
    clearCart,
  } = useCartStore();

  // ----- BILLING -----
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const gst = subtotal * 0.05; // 5% GST
  const grandTotal = subtotal + gst;

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
    <div
     onClick={closeCart}
        className="fixed inset-0 bg-black/40 z-40"
        aria-hidden="true"
    />

      {/* RIGHT SIDE DRAWER */}
      <div className="fixed top-0 right-0 h-full w-[90%] sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col cart-slide">

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={closeCart} className="text-2xl font-semibold">✕</button>
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              Your cart is empty 🛒
            </p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 items-center border-b py-3">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h3 className="text-sm font-semibold">{item.name}</h3>
                  <p className="text-green-700 font-bold">₹{item.price}</p>

                  {/* Qty controls */}
                  <div className="flex items-center border w-fit mt-2 rounded-lg overflow-hidden">
                    <button onClick={() => decrease(item.id)} className="px-3 py-1">−</button>
                    <span className="px-3">{item.qty}</span>
                    <button onClick={() => increase(item.id)} className="px-3 py-1">+</button>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* BILL SUMMARY */}
        {items.length > 0 && (
          <div className="border-t p-4 bg-white space-y-2">

            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>GST (5%)</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
              <span>Grand Total</span>
              <span className="text-green-700">₹{grandTotal.toFixed(2)}</span>
            </div>

            <button className="mt-3 w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700">
              Checkout
            </button>

            <button
              onClick={clearCart}
              className="mt-2 w-full border py-2 rounded-xl hover:bg-gray-50"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}