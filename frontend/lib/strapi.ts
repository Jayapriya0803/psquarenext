const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function getStrapiData(path: string) {
  try {
    const response = await fetch(`${STRAPI_URL}${path}`, {
      cache: "no-store", // important for dynamic Strapi content
    });

    if (!response.ok) {
      throw new Error(`Strapi fetch failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Strapi Error:", error);
    return null;
  }
}
