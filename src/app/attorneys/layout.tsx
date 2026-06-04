import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Top Attorneys in Nepal | Expert Legal Advocates Kathmandu",
  description: "Meet our award-winning lawyer in Nepal. Specializing in Supreme Court litigation, high-stakes criminal defense, divorce law, and cross-border corporate disputes in Kathmandu.",
  keywords: [
    "Criminal defense lawyer Kathmandu",
    "Best corporate lawyer Nepal",
    "Supreme Court advocate Kathmandu",
    "Top divorce attorney Nepal",
    "Civil litigation expert Kathmandu",
    "IP lawyer Nepal",
    "Senior advocates in Kathmandu",
    "Legal consultants Nepal"
  ]
};

export default function AttorneysLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
