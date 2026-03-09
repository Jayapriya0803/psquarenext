import "./globals.css";
import Navbar from "../components/navbar";
import Providers from "./providers";
import CartDrawer from "@/components/cartDrawer";
import LoginPopup from "@/components/loginPopup";
export const metadata = {
  title: "Cotton Knitted Gloves Manufacturer & PPE Products Supplier | P Square Enterprises India",
  description:
    "P Square Enterprises is a leading manufacturer of cotton knitted gloves and supplier of PPE safety products in India.",
  keywords: [
    "cotton knitted gloves manufacturer",
    "industrial safety gloves supplier",
    "PPE safety products manufacturer India",
    "cotton gloves manufacturer",
    "work safety gloves India"
  ],

  openGraph: {
    title: "P Square Enterprises",
    description:
      "Cotton knitted gloves manufacturer and PPE safety products supplier in India.",
    url: "https://www.psquareenterprises.co.in",
    siteName: "P Square Enterprises",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "P Square Enterprises Industrial Safety Gloves",
      },
    ],
    type: "website",
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
         <Navbar />
           {children}
          <CartDrawer />
           <LoginPopup />
          </Providers>
      </body>
    </html>
  );
}
