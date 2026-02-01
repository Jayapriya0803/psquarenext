import qs from "qs";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

if (!STRAPI_URL) {
  throw new Error("NEXT_PUBLIC_STRAPI_URL is not defined");
}

export async function fetchFromStrapi(
  path: string,
  query?: Record<string, any>
) {
  const queryString = query
    ? qs.stringify(query, { encodeValuesOnly: true })
    : "";

  const url = `${STRAPI_URL}${path}${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Strapi fetch failed:", url);
    throw new Error(`Failed to fetch ${path}`);
  }

  return res.json();
}
