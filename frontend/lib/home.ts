import { fetchFromStrapi } from "./strapi";

export async function getHomePage() {
  return fetchFromStrapi("/api/home-page", {
    populate: {
      blocks: {
        on: {
          "layout.hero-section": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              link: {
                populate: true,
              },
            },
          },
        },
      },
    },
  });
}
