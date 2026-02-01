import Image from "next/image";
import { getHomePage } from "@/lib/home";

export default async function HomePage() {
  const response = await getHomePage();

  const hero = response?.data?.blocks?.find(
    (item: any) => item.__component === "layout.hero-section"
  );

  if (!hero) {
    return <div className="p-10">Hero not found</div>;
  }

  /**
   * ✅ Supports BOTH Strapi v5 image shapes:
   * - hero.image.url
   * - hero.image.data.attributes.url
   */
  const imagePath =
    hero.image?.url ||
    hero.image?.data?.attributes?.url;

  const imageUrl = imagePath
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${imagePath}`
    : undefined;

  return (
    <main>
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        
        {/* BACKGROUND IMAGE */}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={
              hero.image?.alternativeText ||
              hero.image?.data?.attributes?.alternativeText ||
              hero.heading
            }
            fill
            className="object-cover"
            priority
            unoptimized
          />
        )}

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/40" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center text-white">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">
              {hero.heading}
            </h1>

            <p className="mt-6 text-lg text-gray-200">
              {hero.subheading}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
