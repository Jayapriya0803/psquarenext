"use client";

import { useCartStore } from "@/app/store/cartStore";

export default function CartIcon() {
  const { items, openCart } = useCartStore();

  const total = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div
      onClick={openCart}
      className="relative cursor-pointer select-none"
    >
      <div className="text-3xl">🛒</div>

      {total > 0 && (
        <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
          {total}
        </span>
      )}
    </div>
  );
}