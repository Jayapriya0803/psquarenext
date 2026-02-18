"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProductCard({ product }: any) {
  const [qty, setQty] = useState(0);

  /* ---------------- IMAGE FIX ----------------
     Strapi Cloud returns:
     product.image.data.attributes.url
  --------------------------------------------- */

  const image =
    product?.image?.data?.attributes?.url
      ? process.env.NEXT_PUBLIC_STRAPI_URL +
        product.image.data.attributes.url
      : "/placeholder.png";

  /* -------- Convert Strapi RichText to text -------- */

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

  /* -------- Load cart quantity -------- */

  useEffect(() => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existing = cart.find((item: any) => item.id === product.id);
      if (existing) setQty(existing.qty);
    } catch {
      setQty(0);
    }
  }, [product.id]);

  /* -------- Update Cart -------- */

  function updateCart(newQty: number) {
    let cart = [];

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

  /* ---------------- UI ---------------- */

  return (
    <div className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition relative">

      {/* IMAGE (STRAPI CLOUD SAFE) */}
      <Image
        src={image}
        alt={product.title}
        width={300}
        height={300}
        unoptimized
        className="rounded-lg object-cover w-full h-32"
      />

      {/* TITLE */}
      <h3 className="mt-2 text-sm font-semibold line-clamp-2">
        {product.title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
        {getDescription(product.description)}
      </p>

      {/* UNIT */}
      <p className="text-xs text-gray-500">
        {product.unit || "1 pair"}
      </p>

      {/* PRICE + BUTTON */}
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
