import Image from "next/image";
import { getAboutUs } from "@/lib/about";
import { getStrapiMediaUrl } from "@/lib/getStrapiMediaUrl";
import Footer from "@/components/footer";

export const metadata = {
  title: "About Us | P Square Enterprises",
  description:
    "P Square Enterprises is a trusted manufacturer and supplier of cotton knitted gloves and industrial safety PPE products in India.",
};

export default async function AboutPage() {
  const response = await getAboutUs();
  const about = response?.data;

  if (!about) {
    return (
      <main className="p-10 text-center">
        <p>About Us not found</p>
      </main>
    );
  }

  const imagePath =
    about.factory?.url ||
    about.factory?.data?.attributes?.url ||
    about.factory?.data?.url;

  const imageUrl = getStrapiMediaUrl(imagePath);

  const altText =
    about.factory?.alternativeText ||
    about.factory?.data?.attributes?.alternativeText ||
    about.companyname ||
    "Factory image";

  return (
    <main className="bg-slate-50">

      {/* HERO */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E5AA7] to-[#1E78C8]" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] bg-[size:24px_24px]" />

        <div className="relative max-w-7xl mx-auto px-6 py-28 text-white">
          <h1 className="text-4xl md:text-5xl font-bold">
            {about.aboutheading}
          </h1>

          {about.aboutdescription && (
            <p className="mt-6 text-lg text-blue-100 max-w-3xl">
              {about.aboutdescription}
            </p>
          )}
        </div>
      </header>

      {/* COMPANY CONTENT */}
      <section
        className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-14 items-center"
        aria-labelledby="company-info"
      >

        {/* IMAGE */}
        {imageUrl && (
          <div className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={imageUrl}
              alt={altText}
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* DETAILS */}
        <article className="bg-white rounded-2xl shadow-lg p-8">
          <h2
            id="company-info"
            className="text-2xl font-semibold text-gray-900"
          >
            {about.companyname}
          </h2>

          {about.yearsofexperience && (
            <p className="mt-4 text-gray-700">
              <strong className="text-blue-700">
                {about.yearsofexperience}+ years
              </strong>{" "}
              of experience in manufacturing and supplying industrial safety
              products.
            </p>
          )}

          {/* SERVICES */}
          {Array.isArray(about.service) && about.service.length > 0 && (
            <>
              <h3 className="mt-8 text-xl font-semibold text-gray-900">
                What We Do
              </h3>

              <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700">
                {about.service.map((item: any, index: number) => (
                  <li key={index}>
                    {item.title || item.point}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* WHY CHOOSE US */}
          {Array.isArray(about.point) && about.point.length > 0 && (
            <>
              <h3 className="mt-8 text-xl font-semibold text-gray-900">
                Why Choose Us
              </h3>

              <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700">
                {about.point.map((item: any, index: number) => (
                  <li key={index}>{item.point}</li>
                ))}
              </ul>
            </>
          )}

          {/* LOCATION */}
          {about.location && (
            <p className="mt-8 text-gray-700">
              <strong className="text-gray-900">
                Location:
              </strong>{" "}
              {about.location}
            </p>
          )}
        </article>

      </section>

      {/* DIVIDER */}
      <div
        className="h-24 bg-gradient-to-b from-slate-50 to-[#0B3C6F]"
        aria-hidden="true"
      />

      {/* FOOTER */}
      <Footer />

    </main>
  );
}