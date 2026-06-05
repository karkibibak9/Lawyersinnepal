import { Metadata } from 'next';
import { absoluteUrl, defaultOgImage } from '@/lib/seo';

export const metadata: Metadata = {
  title: "Lawyers in Nepal | Attorneys and Legal Consultants Kathmandu",
  description: "Meet LawyerInNepal attorneys for criminal defense, corporate law, family disputes, public procurement, property, and litigation support in Kathmandu.",
  keywords: [
    "Criminal defense lawyer Kathmandu",
    "Best corporate lawyer Nepal",
    "Supreme Court advocate Kathmandu",
    "Top divorce attorney Nepal",
    "Civil litigation expert Kathmandu",
    "IP lawyer Nepal",
    "Senior advocates in Kathmandu",
    "Legal consultants Nepal"
  ],
  alternates: { canonical: absoluteUrl('/attorneys') },
  openGraph: {
    title: "Lawyers in Nepal | LawyerInNepal Attorneys",
    description: "Experienced legal advocates and consultants for individuals, families, and businesses in Nepal.",
    url: absoluteUrl('/attorneys'),
    images: [defaultOgImage],
  },
};

export default function AttorneysLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
