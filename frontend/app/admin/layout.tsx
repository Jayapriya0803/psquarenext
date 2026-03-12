"use client";

import Link from "next/link";

export default function AdminLayout({ children }: any) {
  return (
    <div className="flex min-h-screen">

      <aside className="w-64 bg-black text-white p-6 space-y-6">
        <h2 className="text-xl font-bold">PSquare Admin</h2>

        <nav className="flex flex-col space-y-3">
          <Link href="/admin">Dashboard</Link>
            <Link href="/admin/production">Production Entry</Link>
              <Link href="/admin/despatch">Despatch Entry</Link>
              <Link href="/admin/stock">Stock status</Link>
          <Link href="/admin/orders">Orders</Link>
          <Link href="/admin/contact">Contact Messages</Link>
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-gray-50">
        {children}
      </main>

    </div>
  );
}