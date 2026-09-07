import type { Metadata, Viewport } from "next";
import { Header, Footer } from "@/components/shell";
import { SavedProvider } from "@/components/saved-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MyCarPerson — Find your person in the car business",
    template: "%s | MyCarPerson",
  },
  description:
    "Meet the people behind the keys. Explore automotive professional profiles, experience, specialties, and customer reviews. MyCarPerson product preview.",
  robots: { index: false, follow: false },
};
export const viewport: Viewport = { themeColor: "#111e31" };
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SavedProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </SavedProvider>
      </body>
    </html>
  );
}
