import Image from "next/image";
import { getAboutUs } from "@/lib/about";

export default async function AboutPage() {
  const response = await getAboutUs();
  const about = response?.data;

  if (!about) {
    return <div className="p-10">About Us not found</div>;
  }

  const imageUrl = about.factory?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${about.factory.url}`
    : null;

  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            {about.aboutheading}
          </h1>

          <p className="mt-6 text-lg text-gray-700 max-w-3xl">
            {about.aboutdescription}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* IMAGE */}
        {imageUrl && (
          <div className="relative w-full h-[420px] rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={about.companyname || "Factory image"}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        {/* DETAILS */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            {about.companyname}
          </h2>

          {/* EXPERIENCE */}
          {about.yearsofexperience && (
            <p className="mt-4 text-gray-700">
              <strong>{about.yearsofexperience}+ years</strong> of experience in
              manufacturing and supplying industrial safety products.
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
                  <li key={index}>{item.title || item.point}</li>
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
              <strong>Location:</strong> {about.location}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
