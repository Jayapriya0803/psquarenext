"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/* ---------- Image URL Fix (works for local + cloud) ---------- */
function getImageUrl(product: any) {
  const url = product?.image?.url;

  if (!url) return "/placeholder.png";

  // If Strapi Cloud already gives full URL
  if (url.startsWith("http")) return url;

  // Local Strapi
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

/* ---------- Convert Strapi RichText → Plain Text ---------- */
function getDescription(desc: any) {
  if (!desc) return "";

  try {
    return desc
      .map((block: any) =>
        block.children.map((child: any) => child.text).join("")
      )
      .join(" ");
  } catch {
    return "";
  }
}

export default function ProductCard({ product }: any) {
  const [qty, setQty] = useState(0);

  const image = getImageUrl(product);

  /* ---------- Load cart quantity ---------- */
  useEffect(() => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existing = cart.find((item: any) => item.id === product.id);
      if (existing) setQty(existing.qty);
    } catch {
      setQty(0);
    }
  }, [product.id]);

  /* ---------- Update cart ---------- */
  function updateCart(newQty: number) {
    let cart: any[] = [];

    try {
      cart = JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      cart = [];
    }

    const existingIndex = cart.findIndex((item: any) => item.id === product.id);

    if (newQty === 0) {
      if (existingIndex !== -1) cart.splice(existingIndex, 1);
    } else {
      const itemData = {
        id: product.id,
        name: product.title,
        description: getDescription(product.description),
        price: product.price,
        image,
        qty: newQty,
      };

      if (existingIndex !== -1) {
        cart[existingIndex] = itemData;
      } else {
        cart.push(itemData);
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setQty(newQty);
  }

  function add() {
    updateCart(qty + 1);
  }

  function remove() {
    if (qty > 0) updateCart(qty - 1);
  }

  /* ---------- UI ---------- */
  return (
    <div className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition relative">

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
        {getDescription(product.description)}
      </p>

      <p className="text-xs text-gray-500">
        {product.unit || "1 pair"}
      </p>

      <div className="flex items-center justify-between mt-2">
        <p className="font-bold text-green-700">₹{product.price}</p>

        {qty === 0 ? (
          <button
            onClick={add}
            className="border border-green-600 text-green-700 px-4 py-1 rounded-lg text-sm font-semibold hover:bg-green-50"
          >
            ADD
          </button>
        ) : (
          <div className="flex items-center border border-green-600 rounded-lg overflow-hidden">
            <button
              onClick={remove}
              className="px-3 py-1 text-green-700 hover:bg-green-50"
            >
              −
            </button>

            <span className="px-3 font-semibold">{qty}</span>

            <button
              onClick={add}
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
