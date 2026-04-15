import { Scale, Shield, Briefcase, Users, FileText, Landmark, Gavel, Heart } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Legal Services in Nepal | Best Divorce & Criminal Lawyers Kathmandu",
  description: "Specialized legal services in Kathmandu, Nepal. Top-rated lawyers for Divorce, Criminal Defense, Corporate Registration, and Civil Litigation.",
  keywords: ["Divorce lawyer in Nepal", "Criminal lawyer in Nepal", "Court marriage Kathmandu", "Company registration Nepal"],
};

const services = [
  {
    id: 'civil',
    icon: Scale,
    title: 'Civil Law',
    description: 'Expert representation in civil disputes, property law, and contract negotiations.',
    details: [
      'Property & Land Disputes',
      'Contract Drafting & Enforcement',
      'Tort Claims & Compensation',
      'Debt Recovery',
    ]
  },
  {
    id: 'criminal',
    icon: Shield,
    title: 'Criminal Law',
    description: 'Robust defense strategies for criminal charges, bail proceedings, and appeals.',
    details: [
      'White Collar Crimes',
      'Cyber Crimes',
      'Fraud & Embezzlement Defense',
      'Criminal Appeals',
    ]
  },
  {
    id: 'corporate',
    icon: Briefcase,
    title: 'Corporate & Business Law',
    description: 'Comprehensive legal support for businesses, from startup registration to complex mergers.',
    details: [
      'Company Registration & Licensing',
      'Foreign Direct Investment (FDI)',
      'Intellectual Property Rights',
      'Labor & Employment Law',
    ]
  },
  {
    id: 'family',
    icon: Users,
    title: 'Family Law',
    description: 'Empathetic guidance through sensitive family matters and domestic relations.',
    details: [
      'Divorce & Separation',
      'Child Custody & Support',
      'Property Partition',
      'Adoption & Guardianship',
    ]
  },
  {
    id: 'banking',
    icon: Landmark,
    title: 'Banking & Finance',
    description: 'Specialized legal services for financial institutions and monetary disputes.',
    details: [
      'Loan Documentation',
      'Banking Compliance',
      'Cheque Bounce Cases',
      'Project Financing',
    ]
  },
  {
    id: 'litigation',
    icon: Gavel,
    title: 'Litigation & ADR',
    description: 'Professional representation in all courts of Nepal and alternative dispute resolution.',
    details: [
      'Supreme Court Litigation',
      'High Court Appeals',
      'Arbitration & Mediation',
      'Tribunal Representation',
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="bg-navy-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Our Legal Services</h1>
          <p className="text-navy-100 max-w-2xl mx-auto text-lg leading-relaxed">
            We provide comprehensive legal solutions tailored to the unique needs of our clients in Nepal. Our team brings excellence and integrity to every case.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-navy-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {services.map((service) => (
              <div key={service.id} id={service.id} className="bg-navy-800 border border-navy-700 p-10 gold-glow transition-all group scroll-mt-24 shadow-2xl">
                <div className="w-14 h-14 bg-navy-900 text-gold-600 flex items-center justify-center rounded-sm mb-8 group-hover:bg-gold-600 group-hover:text-navy-900 transition-colors border border-gold-600/20">
                  <service.icon size={28} />
                </div>
                <h2 className="text-2xl font-serif font-bold mb-4 text-white">{service.title}</h2>
                <p className="text-navy-300 mb-8 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-navy-100">
                      <div className="w-1.5 h-1.5 bg-gold-600 rounded-full shadow-[0_0_8px_rgba(255,215,0,0.6)]" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-navy-950 border-t border-navy-800">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-serif font-bold mb-6 text-white uppercase tracking-wider">Can't find what you're looking for?</h2>
          <p className="text-navy-200 mb-10 leading-relaxed">
            Our expertise extends beyond the listed services. Contact us today to discuss your specific legal requirements with our expert attorneys in <span className="text-gold-600 font-bold underline decoration-gold-600/30">Kathmandu</span>.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-gold-600 text-navy-900 font-bold hover:bg-gold-500 transition-all rounded-sm shadow-[0_10px_30px_rgba(255,215,0,0.15)]"
          >
            Inquire Now
          </Link>
        </div>
      </section>
    </div>
  );
}
