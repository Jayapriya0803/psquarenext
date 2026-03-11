import { getProducts } from "@/lib/products";
import ProductCard from "./product-card";
import CategoryBar from "./category-bar";
import CartIcon from "@/components/cartIcon";
import FloatingCart from "@/components/floatingcart";

export const metadata = {
  title: "P Square Store | Industrial Safety Gloves & PPE Products",
  description:
    "Browse cotton knitted gloves and PPE safety products from P Square Enterprises. High quality industrial safety gloves available online.",
};

export default async function ProductPage() {
  const products = await getProducts();

  return (
    <main className="bg-gray-50 min-h-screen">

      {/* Header */}
      <header className="sticky top-0 bg-white z-20 shadow-sm p-4">
        
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            P Square Store
          </h1>

          <CartIcon />
        </div>

        {/* Search */}
        <form role="search" className="mt-3">
          <label htmlFor="product-search" className="sr-only">
            Search gloves
          </label>

          <input
            id="product-search"
            name="search"
            type="search"
            placeholder="Search gloves..."
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search products"
          />
        </form>
      </header>

      {/* Categories */}
      <nav aria-label="Product Categories">
        <CategoryBar />
      </nav>

      {/* Product Grid */}
      <section
        aria-label="Products"
        className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
      >
        {products?.length > 0 ? (
          products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products available
          </p>
        )}
      </section>

      {/* Floating Cart */}
      <FloatingCart />

    </main>
  );
}
