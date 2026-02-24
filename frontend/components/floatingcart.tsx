"use client";

import { useEffect } from "react";
import { useCartStore } from "@/app/store/cartStore";
import { ShoppingCart } from "lucide-react";

export default function FloatingCart() {
const { items, openCart, loadCart } = useCartStore();

// load cart from localStorage on site load
useEffect(() => {
  loadCart();
}, [loadCart]);

const totalQty = items.reduce((sum, i) => sum + i.qty, 0);

return ( <button
   onClick={openCart}
   className="fixed bottom-6 right-6 z-[9999] bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-2xl w-16 h-16 flex items-center justify-center transition active:scale-95"
 > <ShoppingCart size={28} />

  {/* Badge */}
  {totalQty > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
      {totalQty}
    </span>
  )}
</button>

);
}
