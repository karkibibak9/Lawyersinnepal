import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Best Lawyers in Kathmandu | Lawyers In Nepal HQ",
  description: "Get in touch with our expert legal team in Anamnagar, Kathmandu. Consultation for Divorce, Criminal Defense, and Corporate Law issues in Nepal.",
  keywords: ["Contact lawyer Kathmandu", "Legal consultation Nepal", "Law firm Anamnagar", "Talk to a lawyer Nepal"],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
