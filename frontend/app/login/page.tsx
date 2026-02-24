"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "../store/cartStore";
import { useAuthPopup } from "../store/authPopupStore";

export default function LoginPage() {
  const router = useRouter();

  const { closeCart } = useCartStore();
  const { close } = useAuthPopup();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (loading) return; // prevent double click
    setError("");
    setLoading(true);

    // normalize identifier
    const cleanIdentifier = identifier.trim().toLowerCase();

    if (!cleanIdentifier || !password) {
      setError("Please enter username/email and password");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: cleanIdentifier,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Better error mapping from Strapi
        if (data?.message?.toLowerCase().includes("identifier")) {
          setError("User not found");
        } else if (data?.message?.toLowerCase().includes("password")) {
          setError("Incorrect password");
        } else {
          setError(data.message || "Login failed");
        }
        setLoading(false);
        return;
      }

      /* ===== SAVE SESSION ===== */
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("loginTime", Date.now().toString());

      // notify navbar
      window.dispatchEvent(new Event("userLoggedIn"));

      closeCart();
      close();

      router.replace("/product");

    } catch (err) {
      setError("Unable to connect to server");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4">

      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-xl p-8 space-y-6">

        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back 👋
          </h1>
          <p className="text-gray-500 text-sm">
            Sign in using your username or email
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Username or Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Username or Email
            </label>
            <input
              type="text"
              required
              autoComplete="username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Enter username or email"
              className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition pr-12"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 text-sm font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* 🔥 REAL FORGOT PASSWORD LINK */}
          <div className="text-right text-sm">
            <Link
              href="/forgot-password"
              className="text-indigo-600 hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Register */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/register" className="text-indigo-600 font-medium hover:underline">
            Register here
          </Link>
        </p>

      </div>
    </div>
  );
}