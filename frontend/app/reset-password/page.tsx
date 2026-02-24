"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function ResetPasswordPage() {
const params = useSearchParams();
const router = useRouter();

const code = params.get("code");

const [password, setPassword] = useState("");
const [confirm, setConfirm] = useState("");
const [message, setMessage] = useState("");
const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState(false);

async function handleSubmit(e: React.FormEvent) {
e.preventDefault();

if (!code) {
  setMessage("Invalid reset link");
  return;
}

if (password.length < 6) {
  setMessage("Password must be at least 6 characters");
  return;
}

if (password !== confirm) {
  setMessage("Passwords do not match");
  return;
}

setLoading(true);
setMessage("");

try {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/reset-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        password,
        passwordConfirmation: confirm,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    setMessage(data?.error?.message || "Reset failed or link expired");
    setLoading(false);
    return;
  }

  setSuccess(true);
  setMessage("Password reset successful! Redirecting to login...");

  setTimeout(() => {
    router.push("/login");
  }, 2500);

} catch (err) {
  setMessage("Server error. Please try again.");
}

setLoading(false);

}

return ( <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4">

  <div className="w-full max-w-md bg-white/90 border border-gray-200 rounded-2xl shadow-xl p-8 space-y-6">

    <div className="text-center space-y-1">
      <h1 className="text-2xl font-bold text-gray-800">
        Reset Password
      </h1>
      <p className="text-gray-500 text-sm">
        Enter your new password
      </p>
    </div>

    {success ? (
      <div className="bg-green-100 text-green-700 text-sm p-3 rounded-lg text-center">
        {message}
      </div>
    ) : (
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {message && (
          <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg text-center">
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    )}

    <p className="text-center text-sm text-gray-600">
      Back to{" "}
      <Link href="/login" className="text-indigo-600 font-medium hover:underline">
        Login
      </Link>
    </p>

  </div>
</div>

);
}
