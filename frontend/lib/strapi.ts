const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getHomePage() {
  const res = await fetch(
    `${STRAPI_URL}/api/home-page?populate[blocks][on][layout.hero-section][populate][image][fields][0]=url&populate[blocks][on][layout.hero-section][populate][image][fields][1]=alternativeText&populate[blocks][on][layout.hero-section][populate][link][populate]=true`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch home page");
  }

  return res.json();
}

// 👇 ADD THIS
export async function getAboutUs() {
  const res = await fetch(`${STRAPI_URL}/api/about-us?populate=*`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch About Us");
  }

  return res.json();
}
