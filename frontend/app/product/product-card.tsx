"use client";

import Image from "next/image";
import { useCartStore } from "../store/cartStore";
import { useAuthPopup } from "../store/authPopupStore";

/* ---------- Image URL ---------- */
function getImageUrl(product: any) {
  const url = product?.image?.url;
  if (!url) return "/placeholder.png";
  if (url.startsWith("http")) return url;
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

export default function ProductCard({ product }: any) {
  const image = getImageUrl(product);

  const { items, addItem, increase, decrease } = useCartStore();
  const popup = useAuthPopup();

  const cartItem = items.find((i) => i.id === product.id);
  const qty = cartItem?.qty || 0;

  const itemData = {
    id: product.id,
    name: product.title,
    description: product.description,
    price: product.price,
    image,
    unit: product.unit,
    qty: 1,
  };

  /* ---------- LOGIN CHECK ---------- */
  function requireLogin() {
    const token = localStorage.getItem("token");

    // NOT LOGGED IN
    if (!token) {
      popup.open("Please login to continue shopping");
      return false;
    }

    return true;
  }

  /* ---------- ACTIONS ---------- */
  function handleAdd() {
    if (!requireLogin()) return;
    addItem(itemData);
  }

  function handleIncrease() {
    if (!requireLogin()) return;
    increase(product.id);
  }

  function handleDecrease() {
    if (!requireLogin()) return;
    decrease(product.id);
  }

  return (
    <div className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition">

      <Image
        src={image}
        alt={product.title}
        width={300}
        height={300}
        unoptimized
        className="rounded-lg object-cover w-full h-32"
      />

      <h3 className="mt-2 text-sm font-semibold line-clamp-2">
        {product.title}
      </h3>

      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
        {product.description}
      </p>

      <div className="flex items-center justify-between mt-2">
        <p className="font-bold text-green-700">₹{product.price}</p>
        <p className="font-bold text-green-700">price per {product.unit}</p>
        {qty === 0 ? (
          <button
            onClick={handleAdd}
            className="border border-green-600 text-green-700 px-4 py-1 rounded-lg text-sm font-semibold hover:bg-green-50"
          >
            ADD
          </button>
        ) : (
          <div className="flex items-center border border-green-600 rounded-lg overflow-hidden">
            <button
              onClick={handleDecrease}
              className="px-3 py-1 text-green-700 hover:bg-green-50"
            >
              −
            </button>

            <span className="px-3 font-semibold">{qty}</span>

            <button
              onClick={handleIncrease}
              className="px-3 py-1 text-green-700 hover:bg-green-50"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}