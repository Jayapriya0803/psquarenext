import "./globals.css";
import Navbar from "../components/navbar";
import Providers from "./providers";
import CartDrawer from "@/components/cartDrawer";
import LoginPopup from "@/components/loginPopup";
  export const metadata = {
  title: "Cotton Knitted Gloves Manufacturer & PPE Products Supplier | P Square Enterprises India",
  description:
    "P Square Enterprises is a leading manufacturer of cotton knitted gloves and supplier of PPE safety products in India for industrial protection and workplace safety.",
  keywords: [
    "cotton knitted gloves manufacturer",
    "industrial safety gloves supplier",
    "PPE safety products manufacturer India",
    "cotton gloves manufacturer",
    "work safety gloves India"
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
