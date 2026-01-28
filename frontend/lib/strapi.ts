const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337";

export async function getStrapiData(path: string) {
  try {
    const res = await fetch(`${STRAPI_URL}${path}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch Strapi data");
    }

    return res.json();
  } catch (error) {
    console.error("Strapi fetch error:", error);
    return null;
  }
}
