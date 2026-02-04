import Link from "next/link";
import { getFooter } from "@/lib/footer";

export default async function Footer() {
  const response = await getFooter();
  const footer = response?.data;

  if (!footer) return null;

  const googleReview = footer.googlereviewurl?.[0];
  const googleMap = footer.googlemap?.[0];

  return (
    <footer className="bg-[#0B3C6F] text-white">
      {/* TOP */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">
        {/* COMPANY */}
        <div>
          <h3 className="text-2xl font-bold">
            {footer.companyname}
          </h3>

          <p className="mt-4 text-blue-100 text-sm leading-relaxed">
            {footer.companydescription}
          </p>
        </div>

        {/* ADDRESS */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Location</h4>

          <p className="text-blue-100 text-sm leading-relaxed">
            📍 {footer.location}
          </p>

          {googleMap && (
            <a
              href={googleMap.url}
              target={googleMap.isExternal ? "_blank" : "_blank"}
              className="inline-block mt-3 text-yellow-300 text-sm hover:underline"
            >
              {googleMap.text} →
            </a>
          )}
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>

          <ul className="space-y-2 text-blue-100 text-sm">
            <li>📞 {footer.phone}</li>
            <li>✉️ {footer.email}</li>
            <li>
              🌐{" "}
              <a
                href={`https://${footer.website}`}
                target="_blank"
                className="hover:underline"
              >
                {footer.website}
              </a>
            </li>
          </ul>
        </div>

        {/* REVIEWS */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Reviews</h4>

          {googleReview && (
            <a
              href={googleReview.url}
              target={googleReview.isExternal ? "_blank" : "_self"}
              className="inline-flex items-center gap-2 text-yellow-300 hover:underline"
            >
              ⭐ {googleReview.text}
            </a>
          )}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-blue-100">
          © {new Date().getFullYear()} {footer.companyname}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
