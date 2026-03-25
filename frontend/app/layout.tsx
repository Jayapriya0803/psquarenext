import "./globals.css";
import Navbar from "../components/navbar";
import Providers from "./providers";
import CartDrawer from "@/components/cartDrawer";
import LoginPopup from "@/components/loginPopup";
import Script from "next/script"; // ✅ ADD THIS

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
  <Script
    src="https://www.googletagmanager.com/gtag/js?id=G-05HZM5X492"
    strategy="afterInteractive"
  />
  <Script id="google-analytics" strategy="afterInteractive">
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-05HZM5X492');
    `}
  </Script>
</head>
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