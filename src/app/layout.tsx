import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatBot from "@/components/ChatBot";
import { defaultOgImage, legalServiceJsonLd, SITE_URL } from "@/lib/seo";
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
    default: "LawyerInNepal | Best Law Firm in Kathmandu for Legal Services",
    template: "%s | LawyerInNepal",
  },
  alternates: {
    canonical: SITE_URL,
  },
  description: "Consult a trusted law firm in Kathmandu, Nepal for divorce, criminal defense, property disputes, company registration, FDI, and Supreme Court litigation.",
  keywords: [
    "LawyerInNepal", 
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
  authors: [{ name: "LawyerInNepal" }],
  creator: "LawyerInNepal",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: SITE_URL,
    title: "LawyerInNepal | Law Firm in Kathmandu, Nepal",
    description: "Legal consultation for individuals, families, and businesses in Nepal: criminal, divorce, property, corporate, FDI, and litigation matters.",
    siteName: "LawyerInNepal",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "LawyerInNepal | Law Firm in Kathmandu, Nepal",
    description: "Book legal consultation for litigation, divorce, criminal defense, property, company registration, and FDI matters in Nepal.",
    images: [defaultOgImage],
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
            __html: JSON.stringify(legalServiceJsonLd())
          }}
        />
        <header>
          <Navbar />
        </header>
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
