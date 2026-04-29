import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatBot from "@/components/ChatBot";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lawyers In Nepal | Best Law Firm in Kathmandu | Expert Legal Advocacy",
    template: "%s | Lawyers In Nepal",
  },
  alternates: {
    canonical: "https://lawyersinnepal.com",
  },
  description: "Top-rated law firm in Kathmandu, Nepal. Our expert attorneys specialize in Divorce, Criminal Defense, Supreme Court Litigation, Property Disputes, and FDI/Corporate Registration. Over 25 years of experience in the Nepalese legal system.",
  keywords: [
    "Lawyers in Nepal", 
    "Best law firm in Kathmandu", 
    "Divorce lawyer in Nepal", 
    "Criminal defense lawyer Kathmandu", 
    "Corporate lawyer in Nepal",
    "Supreme Court advocate Nepal",
    "Property dispute lawyer Kathmandu",
    "Legal services Nepal",
    "Marriage registration Nepal",
    "Company registration Kathmandu",
    "Foreign Direct Investment lawyer Nepal",
    "Intellectual property lawyer Kathmandu",
    "Cybercrime lawyer Nepal",
    "Child custody lawyer Kathmandu",
    "Labor law consultant Nepal",
    "Top rated attorneys in Nepal",
    "Legal drafting services Kathmandu",
    "Notary public services Nepal",
    "Constitutional law expert Nepal",
    "Commercial litigation Kathmandu"
  ],
  authors: [{ name: "Lawyers In Nepal" }],
  creator: "Lawyers In Nepal",
  metadataBase: new URL("https://lawyersinnepal.com"),
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://lawyersinnepal.com",
    title: "Lawyers In Nepal | Premier Legal Services in Kathmandu",
    description: "Expert legal representation in Nepal. Specializing in Civil, Criminal, and Family Law with a focus on justice and integrity.",
    siteName: "Lawyers In Nepal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lawyers In Nepal | Best Law Firm in Kathmandu",
    description: "Leading legal experts in Nepal. We handle Divorce, Criminal Defense, and Corporate law with precision.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-navy-900 overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LegalService",
              "name": "Lawyers In Nepal",
              "image": "https://lawyersinnepal.com/Gaurabdai.webp",
              "@id": "https://lawyersinnepal.com",
              "url": "https://lawyersinnepal.com",
              "telephone": "+9779815861066",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Purbi Gate, Anamnagar-29",
                "addressLocality": "Kathmandu",
                "postalCode": "44600",
                "addressCountry": "NP"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 27.6983928,
                "longitude": 85.3286204
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "10:00",
                "closes": "17:00"
              },
              "sameAs": [
                "https://www.facebook.com/lawyersinnepal",
                "https://www.linkedin.com/company/lawyersinnepal"
              ],
              "priceRange": "$$"
            })
          }}
        />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <ChatBot />
      </body>
    </html>
  );
}
