"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthPopup } from "@/app/store/authPopupStore";
import { useCartStore } from "@/app/store/cartStore";

export default function LoginPopup() {
  const { show, message, close } = useAuthPopup();
  const { closeCart } = useCartStore();
  const router = useRouter();
  const pathname = usePathname();

  /* ---- redirect to login ---- */
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      close();
      closeCart(); // VERY IMPORTANT (removes invisible overlay)
      router.push("/login");
    }, 1500);

    return () => clearTimeout(timer);
  }, [show, close, closeCart, router]);

  /* ---- SAFETY: when page changes ---- */
  useEffect(() => {
    // whenever route changes, ensure popup + drawer are closed
    close();
    closeCart();
  }, [pathname, close, closeCart]);

  if (!show) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none">
      <div className="bg-red-600 text-white px-6 py-3 rounded-xl shadow-2xl">
        {message}
      </div>
    </div>
  );
}