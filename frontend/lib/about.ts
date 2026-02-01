import { fetchFromStrapi } from "./strapi";

export async function getAboutUs() {
  return fetchFromStrapi("/api/about-us", {
    populate: "*",
  });
}
