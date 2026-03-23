import qs from "qs";

export async function getAboutUs() {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  if (!STRAPI_URL) {
    console.error("❌ STRAPI URL missing");
    return null;
  }

  const query = qs.stringify(
    {
      populate: {
        factory: true, // image
        service: true, // repeatable component
        point: true,   // repeatable component
      },
    },
    { encodeValuesOnly: true }
  );

  try {
    const res = await fetch(
      `${STRAPI_URL}/api/about-us?${query}`,
      {
        cache: "no-store", // 🚀 prevents random empty data
      }
    );

    if (!res.ok) {
      console.error("❌ About API failed:", res.status);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("❌ About fetch error:", err);
    return null;
  }
}