import "./globals.css";
import Navbar from "../components/navbar";
import Providers from "./providers";
import CartDrawer from "@/components/cartDrawer";
import LoginPopup from "@/components/loginPopup";

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
