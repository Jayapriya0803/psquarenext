import "./globals.css";
import Navbar from "../components/navbar";
import Providers from "./providers";
import CartDrawer from "@/components/cartDrawer";
import LoginPopup from "@/components/loginPopup";
export const metadata = {
  title: "P Square Enterprises | Cotton Knitted Gloves Manufacturer in India",
  description:
    "P Square Enterprises manufactures cotton knitted gloves and PPE safety products for industrial protection in India.",
  keywords: [
    "cotton knitted gloves",
    "industrial safety gloves",
    "PPE products",
    "gloves manufacturer India"
  ],
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
