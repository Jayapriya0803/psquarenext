import Image from "next/image";
import Link from "next/link";
import { getHomePage } from "@/lib/strapi";

export default async function HomePage() {
  const response = await getHomePage();

  const hero = response?.data?.blocks?.find(
    (item: any) => item.__component === "layout.hero-section"
  );

  if (!hero) {
    return <div className="p-10">Hero not found</div>;
  }

  // ✅ STRAPI v5 IMAGE (THIS IS THE KEY)
  const imageUrl = hero.image?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${hero.image.url}`
    : null;

  return (
    <main>
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          
          {/* TEXT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">
              {hero.heading}
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              {hero.subheading}
            </p>

            {hero.link?.url && (
              <Link
                href={hero.link.url}
                target={hero.isExternal ? "_blank" : "_self"}
                className="inline-block mt-8 px-6 py-3 bg-green-600 text-white rounded-lg"
              >
                {hero.link.text}
              </Link>
            )}
          </div>

          {/* IMAGE */}
          {imageUrl && (
            <div className="relative w-full h-[380px] md:h-[480px]">
              <Image
                src={imageUrl}
                alt={hero.heading}
                fill
                className="object-contain"
                priority
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
