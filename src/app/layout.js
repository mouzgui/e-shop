import "./globals.css"; // Assuming you have Tailwind set up here
import { Providers } from "./providers";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "ModernShop | Redefine Your Lifestyle",
  description:
    "Curated selection of premium goods blending aesthetics with functionality.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans antialiased transition-colors duration-300">
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
