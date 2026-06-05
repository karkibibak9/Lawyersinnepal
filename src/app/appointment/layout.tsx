import type { Metadata } from 'next';
import { absoluteUrl, defaultOgImage } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Book Legal Consultation in Kathmandu | LawyerInNepal',
  description:
    'Book a confidential legal consultation in Kathmandu for divorce, criminal defense, property disputes, company registration, FDI, or litigation in Nepal.',
  alternates: { canonical: absoluteUrl('/appointment') },
  openGraph: {
    title: 'Book Legal Consultation in Kathmandu | LawyerInNepal',
    description:
      'Schedule a confidential appointment with LawyerInNepal for personal, family, or business legal matters in Nepal.',
    url: absoluteUrl('/appointment'),
    images: [defaultOgImage],
  },
};

export default function AppointmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
