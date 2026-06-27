"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaTimes, FaBars } from "react-icons/fa";
import Image from "next/image";
import { useCartStore } from "@/app/store/cartStore";

const SESSION_EXPIRY = 5 * 60 * 1000; // 5 minutes

const Navbar = () => {
const [menuOpen, setMenuOpen] = useState(false);
const [user, setUser] = useState<any>(null);

const router = useRouter();
const pathname = usePathname();
const clearCart = useCartStore((state) => state.clearCart);

/* ---------- read user safely ---------- */
const getStoredUser = () => {
try {
const savedUser = localStorage.getItem("user");
return savedUser ? JSON.parse(savedUser) : null;
} catch (err) {
console.error("Error parsing stored user:", err);
return null;
}
};

/* ---------------- LOGOUT ---------------- */
const handleLogout = () => {
localStorage.removeItem("token");
localStorage.removeItem("user");
localStorage.removeItem("loginTime");

clearCart();
setUser(null);

window.dispatchEvent(new Event("userLoggedOut"));

router.replace("/login");

};

/* ---------------- SESSION CHECK ---------------- */
const checkSession = () => {
const token = localStorage.getItem("token");
const loginTime = localStorage.getItem("loginTime");

if (!token || !loginTime) {
  clearCart();
  setUser(null);
  return;
}

if (Date.now() - Number(loginTime) > SESSION_EXPIRY) {
  handleLogout();
  return;
}

const storedUser = getStoredUser();
if (storedUser) {
  setUser(storedUser);
}
};

/* ---- FIRST LOAD ---- */
useEffect(() => {
checkSession();
}, []);

/* ---- PAGE CHANGE ---- */
useEffect(() => {
checkSession();
}, [pathname]);

/* ---- GLOBAL EVENTS ---- */
useEffect(() => {
window.addEventListener("userLoggedIn", checkSession);
window.addEventListener("userLoggedOut", checkSession);
window.addEventListener("focus", checkSession);

return () => {
  window.removeEventListener("userLoggedIn", checkSession);
  window.removeEventListener("userLoggedOut", checkSession);
  window.removeEventListener("focus", checkSession);
};

}, []);

/* ---------------- ACTIVE LINK STYLE ---------------- */
const linkClass = (path: string) =>
pathname === path
? "text-green-600 font-semibold"
: "text-gray-700 hover:text-green-600 transition";

return (
  <header className="sticky top-0 z-50 shadow-sm">

    {/* INVESTOR MARQUEE BANNER */}
<div className="bg-[#0B3C6F] text-white py-2 overflow-hidden w-full">
  <div
    className="flex whitespace-nowrap"
    style={{ animation: "marquee 8s linear infinite" }}
  >
    {[...Array(5)].map((_, i) => (
      <span key={i} className="inline-flex items-center gap-2 px-4 flex-shrink-0">
        {/* Short text on mobile, full text on desktop */}
        <span className="text-xs md:hidden">
          💼 Invest in P Square —&nbsp;
          <Link href="/invest" className="text-yellow-300 font-semibold underline">
            Click Here →
          </Link>
        </span>
        <span className="text-sm hidden md:inline-flex items-center gap-2">
          💼 Welcome Investors! Those who want to invest in P Square Enterprises —&nbsp;
          <Link href="/invest" className="text-yellow-300 font-semibold underline underline-offset-2 hover:text-yellow-400 transition">
            Click Here to Make a Payment →
          </Link>
        </span>
        <span className="mx-4 text-white/30">★</span>
      </span>
    ))}
  </div>
</div>

    <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between bg-white/90 backdrop-blur">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <Image src="/logo.png" alt="P Square" width={55} height={55} />
        <span className="text-xl font-bold text-gray-900">
          P Square Enterprises.
        </span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 text-sm">
        <Link href="/" className={linkClass("/")}>Home</Link>
        <Link href="/about" className={linkClass("/about")}>About</Link>
        <Link href="/product" className={linkClass("/product")}>Products</Link>
        <Link href="/contactus" className={linkClass("/contactus")}>Contact</Link>

        {user ? (
          <div className="flex items-center gap-4">
            <Link
              href="/orders"
              className="text-gray-700 hover:text-green-600 transition font-medium"
            >
              My Orders
            </Link>
            <span className="text-green-600 font-medium">
              Welcome, {user.username}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-2xl text-gray-700"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </nav>

    {/* Mobile Menu */}
    {menuOpen && (
      <div className="md:hidden bg-white shadow-lg rounded-b-xl px-6 py-6 space-y-4 text-center">
        {[
          ["/", "Home"],
          ["/about", "About"],
          ["/product", "Products"],
          ["/contactus", "Contact"],
        ].map(([path, label]) => (
          <Link
            key={path}
            href={path}
            className={`block text-lg ${linkClass(path)}`}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}

        <div className="pt-4 border-t">
          {user ? (
            <>
              <p className="text-green-600 font-semibold mb-2">
                Welcome, {user.username}
              </p>
              <Link
                href="/orders"
                onClick={() => setMenuOpen(false)}
                className="block w-full py-2 rounded-lg bg-gray-100 text-gray-800 mb-2"
              >
                My Orders
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="block w-full py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    )}
  </header>
);
};

export default Navbar;