export function getStrapiMediaUrl(url?: string) {
  if (!url) return undefined;

  // Strapi Cloud already returns full URLs
  if (url.startsWith("http")) {
    return url;
  }

  // Local Strapi (relative URLs)
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}
