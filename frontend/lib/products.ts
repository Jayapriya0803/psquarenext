const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL!;

export async function getProducts() {
  try {
    const res = await fetch(`${STRAPI}/api/products?populate=*`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const json = await res.json();

    // Strapi returns: { data: [...] }
    return json.data;
  } catch (error) {
    console.error("PRODUCT FETCH ERROR:", error);
    return [];
  }
}
