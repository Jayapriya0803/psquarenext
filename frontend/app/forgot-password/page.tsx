"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [loading, setLoading] = useState(false);
const [sent, setSent] = useState(false);

async function handleSubmit(e: React.FormEvent) {
e.preventDefault();

if (!email) return;

setLoading(true);
setMessage("");

try {
  const res = await fetch("/api/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    setMessage(data.message || "Unable to send reset email");
    setLoading(false);
    return;
  }

  setSent(true);
  setMessage("Password reset link has been sent to your email.");

} catch (err) {
  setMessage("Server not responding. Try again.");
}

setLoading(false);

}

return ( <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4">

  <div className="w-full max-w-md bg-white/90 border border-gray-200 rounded-2xl shadow-xl p-8 space-y-6">

    {/* Header */}
    <div className="text-center space-y-1">
      <h1 className="text-2xl font-bold text-gray-800">
        Forgot Password
      </h1>
      <p className="text-gray-500 text-sm">
        Enter your registered email address
      </p>
    </div>

    {/* Success */}
    {sent ? (
      <div className="text-center space-y-4">
        <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm">
          {message}
        </div>

        <Link
          href="/login"
          className="inline-block mt-2 text-indigo-600 font-medium hover:underline"
        >
          Back to Login
        </Link>
      </div>
    ) : (
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Email Input */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Email Address
          </label>

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your account email"
            className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Error */}
        {message && (
          <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg text-center">
            {message}
          </div>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

      </form>
    )}

    {/* Back */}
    <p className="text-center text-sm text-gray-600">
      Remember your password?{" "}
      <Link href="/login" className="text-indigo-600 font-medium hover:underline">
        Login
      </Link>
    </p>

  </div>
</div>

);
}
