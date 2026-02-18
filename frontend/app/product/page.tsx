import { getProducts } from "@/lib/products";
import ProductCard from "./product-card";
import CategoryBar from "./category-bar";

export default async function ProductPage() {
  const products = await getProducts();

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Top Header */}
      <div className="sticky top-0 bg-white z-20 shadow-sm p-4">
        <h1 className="text-2xl font-bold">PSquare Store</h1>
        <input
          className="mt-3 w-full border rounded-xl px-4 py-3"
          placeholder="Search gloves..."
        />
      </div>

      {/* Categories */}
      <CategoryBar />

      {/* Products */}
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
