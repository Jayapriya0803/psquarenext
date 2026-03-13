import qs from "qs";

export async function fetchFromStrapi(
  path: string,
  query?: Record<string, any>
) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  if (!STRAPI_URL) {
    console.error("NEXT_PUBLIC_STRAPI_URL missing");
    return null;
  }

  const queryString = query
    ? qs.stringify(query, { encodeValuesOnly: true })
    : "";

  const url = `${STRAPI_URL}${path}${queryString ? `?${queryString}` : ""}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Strapi fetch failed:", res.status, url);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Strapi connection error:", error);
    return null;
  }
}