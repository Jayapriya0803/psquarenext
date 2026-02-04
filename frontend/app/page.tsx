import Image from "next/image";
import { getHomePage } from "@/lib/home";
import { getStrapiMediaUrl } from "@/lib/getStrapiMediaUrl";
import GoogleReviews from "@/components/googlereview";
import Footer from "@/components/footer"; 

export default async function HomePage() {
  const response = await getHomePage();

  const hero = response?.data?.blocks?.find(
    (item: any) => item.__component === "layout.hero-section"
  );

  if (!hero) {
    return <div className="p-10">Hero not found</div>;
  }

  const imagePath =
    hero.image?.url ||
    hero.image?.data?.attributes?.url;

  const imageUrl = getStrapiMediaUrl(imagePath);

  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
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

        {/* BLUE GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E5AA7]/80 via-[#1E78C8]/70 to-[#0B3C6F]/80" />

        {/* SOFT INDUSTRIAL PATTERN */}
        <div className="absolute inset-0 opacity-15 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:32px_32px]" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-12 items-center text-white">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {hero.heading}
            </h1>

            <p className="mt-6 text-lg text-blue-100">
              {hero.subheading}
            </p>
          </div>
        </div>
      </section>

      {/* GOOGLE REVIEWS */}
      <section>
        <GoogleReviews />
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
