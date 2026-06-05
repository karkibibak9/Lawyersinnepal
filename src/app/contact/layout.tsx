import { Metadata } from 'next';
import { absoluteUrl, defaultOgImage } from '@/lib/seo';

export const metadata: Metadata = {
  title: "Contact Lawyer in Kathmandu | Legal Consultation Nepal",
  description: "Contact LawyerInNepal in Anamnagar, Kathmandu for divorce, criminal defense, property, corporate, FDI, and litigation legal consultation.",
  keywords: ["Contact lawyer Kathmandu", "Legal consultation Nepal", "Law firm Anamnagar", "Talk to a lawyer Nepal"],
  alternates: { canonical: absoluteUrl('/contact') },
  openGraph: {
    title: "Contact Lawyer in Kathmandu | LawyerInNepal",
    description: "Reach LawyerInNepal for confidential legal consultation in Kathmandu, Nepal.",
    url: absoluteUrl('/contact'),
    images: [defaultOgImage],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
