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
    default: "Lawyers In Nepal | Best Law Firm in Kathmandu | Top Rated Attorneys",
    template: "%s | Lawyers In Nepal",
  },
  description: "Premier law firm in Kathmandu, Nepal. Expert legal services for Divorce, Criminal Defense, Property Disputes, and Corporate Registration. Trusted by 500+ clients.",
  keywords: [
    "Lawyers in Nepal", 
    "Best law firm in Kathmandu", 
    "Divorce lawyer in Nepal", 
    "Criminal lawyer in Nepal", 
    "Legal services Kathmandu", 
    "Top rated attorneys Nepal",
    "Marriage registration Nepal",
    "Company registration Kathmandu",
    "Property dispute lawyer Nepal"
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
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-navy-900 overflow-x-hidden">
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
