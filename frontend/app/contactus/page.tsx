import { cookies } from "next/headers";

export default async function ProductPage() {
  // Next 16 requires await
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-lg w-full space-y-4">

        <h1 className="text-3xl font-bold text-gray-800">
          🚧 Coming Soon
        </h1>

        <p className="text-gray-600 text-lg">
          Our products page is under construction.
        </p>

        <p className="text-gray-500">
          We are preparing something special for you.
          Please check back shortly!
        </p>

        <div className="mt-6 p-4 rounded-lg bg-green-100 text-green-700">
          {token
            ? "You are successfully logged in ✅"
            : "You are not logged in ❌"}
        </div>

        <a
          href="/"
          className="inline-block mt-4 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
}
