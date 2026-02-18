import qs from "qs";

const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL!;

export async function getProducts() {
  try {
    // Proper populate query for Strapi v5 media
    const query = qs.stringify(
      {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
        },
      },
      { encodeValuesOnly: true }
    );

    const res = await fetch(`${STRAPI}/api/products?${query}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const json = await res.json();

    return json.data || [];
  } catch (error) {
    console.error("PRODUCT FETCH ERROR:", error);
    return [];
  }
}
