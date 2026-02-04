export async function getFooter() {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/footer?populate[googlereviewurl]=*&populate[googlemap]=*`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  // 🔍 Helpful debugging
  if (!res.ok) {
    const text = await res.text();
    console.error("Footer fetch failed:", res.status, text);
    return null; // ⬅️ IMPORTANT: don't throw
  }

  return res.json();
}
