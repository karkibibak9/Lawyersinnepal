import Link from 'next/link';
import { Scale, Mail, Phone, MapPin, Globe, Share2, ShieldQuestion } from 'lucide-react';

const footerLinks = [
  {
    title: 'Services',
    links: [
      { name: 'Civil Law', href: '/services#civil' },
      { name: 'Criminal Law', href: '/services#criminal' },
      { name: 'Corporate Law', href: '/services#corporate' },
      { name: 'Family Law', href: '/services#family' },
    ],
  },
  {
    title: 'Firm',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Attorneys', href: '/attorneys' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Legal Disclaimer', href: '/disclaimer' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white pt-16 pb-8 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <Scale className="w-8 h-8 text-gold-600" />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight leading-none">
                  LAWYERS IN <span className="text-gold-600">NEPAL</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60">
                  Justice. Expertise. Trust.
                </span>
              </div>
            </Link>
            <p className="text-navy-100 text-sm leading-relaxed max-w-sm">
              Providing premier legal services with a focus on integrity, excellence, and client success across Nepal's diverse legal landscape.
            </p>
            <div className="flex gap-4">
              <button aria-label="Our Global Services" className="p-2 bg-navy-800 hover:bg-gold-600 hover:text-navy-900 transition-all rounded-sm cursor-pointer">
                <Globe size={18} />
              </button>
              <button aria-label="Share our firm" className="p-2 bg-navy-800 hover:bg-gold-600 hover:text-navy-900 transition-all rounded-sm cursor-pointer">
                <Share2 size={18} />
              </button>
              <button aria-label="Legal FAQ" className="p-2 bg-navy-800 hover:bg-gold-600 hover:text-navy-900 transition-all rounded-sm cursor-pointer">
                <ShieldQuestion size={18} />
              </button>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-gold-600 font-bold uppercase tracking-wider text-xs mb-6 font-sans">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-navy-100 hover:text-gold-500 text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div>
            <h4 className="text-gold-600 font-bold uppercase tracking-wider text-xs mb-6 font-sans">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <span className="text-navy-100 text-sm leading-tight">
                  Purbi Gate, Anamnagar-29<br />
                  Kathmandu 44600, Nepal
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold-600 shrink-0" />
                <span className="text-navy-100 text-sm font-medium">+977 9815861066</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold-600 shrink-0" />
                <span className="text-navy-100 text-sm">lawyersinnepal.com.np@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-navy-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-navy-300 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} Lawyers In Nepal. All rights reserved. 
            <span className="mx-2">|</span> 
            Registered with Nepal Bar Council.
          </p>
          <p className="text-navy-400 text-[10px] text-center md:text-right uppercase tracking-[0.1em]">
            Developed with excellence by <a href="https://www.linkedin.com/in/nischalkarki09/" target="_blank" rel="noopener noreferrer" className="text-gold-600 hover:text-gold-400 font-bold transition-colors">Nischal Karki</a> for the legal community in Nepal.
          </p>
        </div>
      </div>
      
      {/* Schema.org JSON-LD for LocalBusiness/LegalService */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LegalService",
            "name": "Lawyers In Nepal",
            "description": "Expert legal services in Nepal specializing in Civil, Criminal, Corporate, and Family law.",
            "url": "https://lawyersinnepal.com",
            "logo": "https://lawyersinnepal.com/logo.png",
            "telephone": "+977 9815861066",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Purbi Gate, Anamnagar-29",
              "addressLocality": "Kathmandu",
              "postalCode": "44600",
              "addressCountry": "NP"
            },
            "openingHours": "Mo-Fr 09:00-17:00",
            "priceRange": "$$$",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Legal Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Criminal Defense Litigation",
                    "description": "Expert representation in criminal cases across Kathmandu."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Corporate Law & Company Registration",
                    "description": "Providing legal support for business setup and foreign investment in Nepal."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Family Law & Divorce Proceedings",
                    "description": "Compassionate legal guidance for family disputes and marriage registration."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Supreme Court Advocacy",
                    "description": "Professional litigation services in the Supreme Court of Nepal."
                  }
                }
              ]
            }
          })
        }}
      />
    </footer>
  );
}
