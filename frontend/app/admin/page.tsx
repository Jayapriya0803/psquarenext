"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {

  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.replace("/login");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user?.username?.toLowerCase() !== "psquare") {
      router.replace("/");
      return;
    }

    setAuthorized(true);
  }, [router]);

  if (!authorized) return null;

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <p className="text-gray-600 mb-8">
        Welcome to PSquare Admin Panel
      </p>

      {/* Admin Sections */}

      <div className="grid grid-cols-2 gap-6 max-w-xl">

        <div
          onClick={() => router.push("/admin/orders")}
          className="border rounded-lg p-5 hover:bg-gray-50 cursor-pointer"
        >
          <h2 className="font-semibold">Orders</h2>
          <p className="text-sm text-gray-500">
            Manage customer orders
          </p>
        </div>

        <div
          onClick={() => router.push("/admin/production")}
          className="border rounded-lg p-5 hover:bg-gray-50 cursor-pointer"
        >
          <h2 className="font-semibold">Production</h2>
          <p className="text-sm text-gray-500">
            Add daily production
          </p>
        </div>

        <div
          onClick={() => router.push("/admin/despatch")}
          className="border rounded-lg p-5 hover:bg-gray-50 cursor-pointer"
        >
          <h2 className="font-semibold">Despatch</h2>
          <p className="text-sm text-gray-500">
            Add daily despatch
          </p>
        </div>

        <div
          onClick={() => router.push("/admin/stock")}
          className="border rounded-lg p-5 hover:bg-gray-50 cursor-pointer"
        >
          <h2 className="font-semibold">Stock</h2>
          <p className="text-sm text-gray-500">
            View current stock
          </p>
        </div>

      </div>

    </div>
  );
}