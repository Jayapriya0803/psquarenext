import qs from "qs";

export async function getHomePage() {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  if (!STRAPI_URL) {
    console.error("❌ STRAPI URL missing");
    return null;
  }

  const query = qs.stringify(
    {
      populate: {
        blocks: {
          populate: "*", // VERY IMPORTANT
        },
      },
    },
    { encodeValuesOnly: true }
  );

  try {
    const res = await fetch(
      `${STRAPI_URL}/api/home-page?${query}`,
      {
        cache: "no-store", // 🚀 prevents random failures
      }
    );

    if (!res.ok) {
      console.error("❌ Failed to fetch homepage:", res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Fetch error:", error);
    return null;
  }
}