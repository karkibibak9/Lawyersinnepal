import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Scale, CheckCircle2, Shield, Award, Users, ChevronRight, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Our Practice | Best Lawyers in Nepal | Law Firm Kathmandu',
  description: 'Learn about Lawyers in Nepal, the top-rated law firm in Kathmandu. With 15+ years of experience, we provide expert legal services with unwavering ethics.',
  keywords: ['Lawyers in Nepal', 'Best Law Firm in Kathmandu', 'Advocate in Nepal', 'Nepal Bar Council', 'Supreme Court Lawyers Nepal', 'Legal Services Nepal'],
  alternates: {
    canonical: 'https://lawyersinnepal.com/about',
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-navy-900 text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80"
            alt="Supreme Court of Nepal Law Background"
            fill
            priority
            className="object-cover opacity-10"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/90 to-navy-900 z-0" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-gold-600/10 border border-gold-600/20 text-gold-500 font-bold text-xs uppercase tracking-widest animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Scale size={14} /> Recommended Law Firm in Nepal
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-white leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
            About Our <span className="text-gold-600">Practice</span>
          </h1>
          <p className="text-xl md:text-2xl text-navy-200 max-w-3xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            A Legacy of Legal Excellence and Integrity in Nepal.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-navy-900 border-t border-navy-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-gold-600 text-sm font-bold uppercase tracking-[0.2em] mb-2">Why Choose Us</h2>
            <p className="text-3xl md:text-5xl font-serif font-bold text-white">The Pillars of Our Success</p>
            <div className="w-20 h-1 bg-gold-600 mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-navy-800/50 border border-navy-700 p-10 group hover:border-gold-600/50 transition-all duration-500 gold-glow rounded-sm">
              <div className="w-16 h-16 rounded-full bg-navy-900 border border-gold-600/20 flex items-center justify-center text-gold-600 mb-8 group-hover:bg-gold-600 group-hover:text-navy-900 transition-colors duration-500">
                <Award size={32} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">15+ Years Experience</h3>
              <p className="text-navy-200 leading-relaxed">
                Deep understanding of the High Court and Supreme Court systems in Nepal. Our veteran attorneys bring decades of collective courtroom victory to your defense.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-navy-800/50 border border-navy-700 p-10 group hover:border-gold-600/50 transition-all duration-500 gold-glow rounded-sm">
              <div className="w-16 h-16 rounded-full bg-navy-900 border border-gold-600/20 flex items-center justify-center text-gold-600 mb-8 group-hover:bg-gold-600 group-hover:text-navy-900 transition-colors duration-500">
                <Users size={32} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Personalized Strategy</h3>
              <p className="text-navy-200 leading-relaxed">
                Tailored legal approaches based on the unique specifics of your case. We don't believe in one-size-fits-all; every client receives bespoke legal counsel.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-navy-800/50 border border-navy-700 p-10 group hover:border-gold-600/50 transition-all duration-500 gold-glow rounded-sm">
              <div className="w-16 h-16 rounded-full bg-navy-900 border border-gold-600/20 flex items-center justify-center text-gold-600 mb-8 group-hover:bg-gold-600 group-hover:text-navy-900 transition-colors duration-500">
                <Shield size={32} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Unwavering Ethics</h3>
              <p className="text-navy-200 leading-relaxed">
                Strictly committed to the highest standards of the Nepal Bar Council. Transparency, honesty, and integrity define our relationship with every client.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section - SEO Rich Content */}
      <section className="py-24 bg-navy-950 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gold-600/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
        
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-6 z-10">
            <h2 className="text-gold-600 text-sm font-bold uppercase tracking-[0.2em]">Our Firm's History</h2>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
              Establishing Justice in <span className="text-gold-600">Kathmandu</span>
            </h3>
            <div className="space-y-4 text-navy-200 leading-relaxed text-lg pt-4">
              <p>
                Founded on the principles of truth, diligence, and unparalleled legal acumen, <strong>Lawyers in Nepal</strong> has grown from a humble practice to one of the most formidable law firms in Kathmandu. We have consistently ranked among the best attorneys in Nepal due to our uncompromising dedication to our clients.
              </p>
              <p>
                Whether navigating complex corporate mergers, defending individual rights in criminal proceedings, or settling sensitive family disputes, our legal team possesses the deep functional expertise needed to secure favorable outcomes at local districts and the Supreme Court of Nepal alike.
              </p>
            </div>
            
            <div className="pt-8">
              <ul className="space-y-4">
                {[
                  'Recognized by independent legal directories.',
                  'Comprehensive case evaluations with honest feedback.',
                  'Robust local network across judicial institutions in Nepal.'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="text-gold-600 shrink-0" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex-1 w-full relative z-10 pt-10 lg:pt-0">
             <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl border-4 border-navy-800">
               <Image
                 src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80"
                 alt="Legal team discussing a case in Kathmandu Nepal"
                 fill
                 className="object-cover"
               />
               <div className="absolute inset-0 bg-gold-600/10 mix-blend-multiply" />
             </div>
             
             {/* Floating Badge */}
             <div className="absolute -bottom-10 -left-6 md:-left-12 bg-navy-800 p-6 md:p-8 border-l-4 border-gold-600 shadow-2xl rounded-sm">
               <div className="flex items-center gap-4">
                 <div className="text-4xl md:text-5xl font-serif font-bold text-gold-600">Top</div>
                 <div>
                   <div className="text-white font-bold tracking-widest uppercase text-sm">Rated Firm</div>
                   <div className="text-navy-300 text-xs mt-1">In Nepal Legal Industry</div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-navy-900 border-t border-navy-800 text-center">
         <div className="container mx-auto px-4 max-w-4xl space-y-8">
            <BookOpen className="w-16 h-16 text-gold-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
              Secure Your Future with Nepal's Leading Advocates
            </h2>
            <p className="text-xl text-navy-200">
              Don't leave your legal matters to chance. Partner with the experts who understand the nuances of the Nepali legal system.
            </p>
            <div className="pt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/appointment"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-600 hover:bg-gold-500 text-navy-900 font-bold rounded-sm transition-all shadow-[0_8px_30px_rgb(255,215,0,0.2)] text-lg uppercase tracking-wider"
              >
                Schedule Consultation <ChevronRight size={20} />
              </Link>
              <Link 
                href="/attorneys"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white/20 text-white hover:bg-white/5 font-bold rounded-sm transition-all text-lg uppercase tracking-wider"
              >
                Meet Our Attorneys
              </Link>
            </div>
         </div>
      </section>

      {/* Schema.org for About Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "mainEntity": {
              "@type": "LegalService",
              "name": "Lawyers In Nepal",
              "description": "A Legacy of Legal Excellence and Integrity. 15+ Years Experience. Personalized Strategy. Unwavering Ethics.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kathmandu",
                "postalCode": "44600",
                "addressCountry": "NP"
              }
            }
          })
        }}
      />
    </div>
  );
}
