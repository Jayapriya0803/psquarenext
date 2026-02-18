import qs from "qs";

export async function fetchFromStrapi(
  path: string,
  query?: Record<string, any>
) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  if (!STRAPI_URL) {
    console.error("❌ NEXT_PUBLIC_STRAPI_URL missing in .env");
    return null; // DO NOT throw error in Next.js server components
  }

  const queryString = query
    ? qs.stringify(query, { encodeValuesOnly: true })
    : "";

  const url = `${STRAPI_URL}${path}${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    console.error("Strapi fetch failed:", url);
    return null; // important
  }

  return res.json();
}
