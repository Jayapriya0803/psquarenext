import "./globals.css";
import Navbar from "../components/navbar";
import Providers from "./providers";
import CartDrawer from "@/components/cartDrawer";
import LoginPopup from "@/components/loginPopup";

export const metadata = {
  metadataBase: new URL("https://www.psquareenterprises.co.in"),

  title:
    "Cotton Knitted Gloves Manufacturer & PPE Products Supplier | P Square Enterprises India",

  description:
    "P Square Enterprises is a leading manufacturer of cotton knitted gloves and supplier of PPE safety products in India. High-quality industrial safety gloves for factories and workplaces.",

  keywords: [
    "cotton knitted gloves manufacturer",
    "industrial safety gloves supplier",
    "PPE safety products manufacturer India",
    "cotton gloves manufacturer India",
    "work safety gloves India",
    "industrial hand gloves supplier",
  ],

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    title: "P Square Enterprises | Cotton Knitted Gloves Manufacturer",
    description:
      "Leading manufacturer of cotton knitted gloves and PPE safety products in India.",
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
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "P Square Enterprises",
    description:
      "Cotton knitted gloves manufacturer and PPE safety products supplier in India.",
    images: ["/og-image.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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