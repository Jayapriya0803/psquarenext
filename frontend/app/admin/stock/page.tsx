"use client";

import { useEffect, useState } from "react";

export default function StockPage() {

  const [stock, setStock] = useState<any[]>([]);

  useEffect(() => {

    async function loadStock() {

      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

      const prodRes = await fetch(`${STRAPI_URL}/api/productions`);
      const prodData = await prodRes.json();

      const desRes = await fetch(`${STRAPI_URL}/api/despatches`);
      const desData = await desRes.json();

      let result: any = {};

      // Production
      (prodData.data || []).forEach((p: any) => {
        const item = p.attributes || p;
        const key = `${item.gsm}-${item.color}-${item.unit}`;

        if (!result[key]) {
          result[key] = {
            gsm: item.gsm,
            color: item.color,
            unit: item.unit,
            production: 0,
            despatch: 0
          };
        }

        result[key].production += Number(item.quantity) || 0;
      });

      // Despatch
      (desData.data || []).forEach((d: any) => {
        const item = d.attributes || d;
        const key = `${item.gsm}-${item.color}-${item.unit}`;

        if (!result[key]) {
          result[key] = {
            gsm: item.gsm,
            color: item.color,
            unit: item.unit,
            production: 0,
            despatch: 0
          };
        }

        result[key].despatch += Number(item.quantity) || 0;
      });

      const finalStock = Object.values(result).map((i: any) => ({
        ...i,
        balance: i.production - i.despatch
      }));

      setStock(finalStock);
    }

    loadStock();

  }, []);

  return (

    <div className="p-4 sm:p-8">

      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        Stock Details
      </h1>

      {/* ✅ MOBILE VIEW (Cards) */}
      <div className="space-y-4 sm:hidden">

        {stock.length === 0 ? (
          <div className="text-center p-4 border rounded">
            No stock data
          </div>
        ) : (
          stock.map((s: any, i) => (
            <div
              key={i}
              className="border rounded-xl p-4 shadow-sm bg-white"
            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold">{s.gsm}</span>
                <span className="text-sm text-gray-500">{s.color}</span>
              </div>

              <div className="text-sm mb-2">
                Unit: {s.unit}
              </div>

              <div className="flex justify-between text-sm mb-1">
                <span>Production</span>
                <span>{s.production}</span>
              </div>

              <div className="flex justify-between text-sm mb-1">
                <span>Despatch</span>
                <span>{s.despatch}</span>
              </div>

              <div className="flex justify-between font-bold mt-2">
                <span>Balance</span>
                <span className={s.balance < 0 ? "text-red-600" : "text-green-600"}>
                  {s.balance}
                </span>
              </div>
            </div>
          ))
        )}

      </div>

      {/* ✅ DESKTOP VIEW (Table) */}
      <div className="hidden sm:block overflow-x-auto">

        <table className="border w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">GSM</th>
              <th className="p-2">Color</th>
              <th className="p-2">Unit</th>
              <th className="p-2">Production</th>
              <th className="p-2">Despatch</th>
              <th className="p-2">Balance</th>
            </tr>
          </thead>

          <tbody>

            {stock.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  No stock data
                </td>
              </tr>
            ) : (
              stock.map((s: any, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{s.gsm}</td>
                  <td className="p-2">{s.color}</td>
                  <td className="p-2">{s.unit}</td>
                  <td className="p-2">{s.production}</td>
                  <td className="p-2">{s.despatch}</td>
                  <td className={`p-2 font-semibold ${s.balance < 0 ? "text-red-600" : "text-green-600"}`}>
                    {s.balance}
                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}