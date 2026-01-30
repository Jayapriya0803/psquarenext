const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getHomePage() {
  const res = await fetch(
    `${STRAPI_URL}/api/home-page?populate=blocks`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    const error = await res.text();
    console.error("Strapi error:", error);
    throw new Error("Failed to fetch home page");
  }

  return res.json();
}
