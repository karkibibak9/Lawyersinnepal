import Image from 'next/image';
import Link from 'next/link';
import { Scale, Shield, Briefcase, Users, ArrowRight, CheckCircle2, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden bg-navy-900">
        {/* Optimized Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80"
            alt="Lawyers In Nepal Courtroom"
            fill
            priority
            className="object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-navy-900 via-navy-900/80 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-600/10 border border-gold-600/20 text-gold-500 font-bold text-xs uppercase tracking-widest">
              <Scale size={14} /> #1 Law Firm in Kathmandu, Nepal
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-white font-bold leading-[1.1]">
              Expert <span className="text-gold-600">Lawyers</span> in Nepal.
            </h1>
            <p className="text-lg md:text-xl text-navy-100/90 leading-relaxed max-w-2xl">
              Widely recognized as the <strong>best law firm in Kathmandu</strong>, providing specialized legal representation for individuals and corporations across Nepal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/appointment"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-600 hover:bg-gold-500 text-navy-900 font-bold rounded-sm transition-all transform hover:-translate-y-1 shadow-[0_8px_30px_rgb(255,215,0,0.2)]"
              >
                Book Free Consultation <ArrowRight size={18} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white hover:bg-white/10 font-bold rounded-sm transition-all"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 hidden md:block">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-navy-900 border-b border-navy-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="text-sm font-bold text-navy-400 tracking-widest uppercase">Trusted By Over 500+ Clients Across Nepal</div>
            <div className="flex items-center gap-2 font-serif font-bold text-xl h-8 text-white">Supreme Court of Nepal</div>
            <div className="flex items-center gap-2 font-serif font-bold text-xl h-8 text-white">Nepal Bar Association</div>
            <div className="flex items-center gap-2 font-serif font-bold text-xl h-8 text-white">FIN-Global</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-navy-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-gold-600 text-sm font-bold uppercase tracking-[0.2em] mb-2">Our Areas of Practice</h2>
            <p className="text-3xl md:text-5xl font-serif font-bold text-white">Expert Solutions for Your <span className="text-gold-600">Complex</span> Legal Needs</p>
            <div className="w-20 h-1 bg-gold-600 mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Scale, title: 'Civil Law', desc: 'Property disputes, contract enforcement, and civil litigation services.' },
              { icon: Shield, title: 'Criminal Law', desc: 'Strong defense for white-collar crimes, fraud, and personal defense.' },
              { icon: Briefcase, title: 'Corporate Law', desc: 'Company registration, intellectual property, and merger advisory.' },
              { icon: Users, title: 'Family Law', desc: 'Compassionate handling of divorce, child custody, and inheritance.' },
            ].map((service, idx) => (
              <div key={idx} className="group gold-glow bg-navy-800 p-8 border border-navy-700 transition-all duration-500 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-navy-900 flex items-center justify-center text-gold-600 group-hover:bg-gold-600 group-hover:text-navy-900 transition-colors duration-500 mb-6 border border-gold-600/20">
                  <service.icon size={32} />
                </div>
                <h3 className="text-xl font-serif font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-navy-300 text-sm leading-relaxed mb-6">
                  {service.desc}
                </p>
                <Link href="/services" className="mt-auto text-gold-600 text-xs font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gold-600/5 -skew-x-12 translate-x-1/2" />
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h2 className="text-gold-600 text-sm font-bold uppercase tracking-[0.2em]">Why We Stand Apart</h2>
            <p className="text-3xl md:text-5xl font-serif font-bold leading-tight">
              A Legacy of Legal <span className="text-gold-600 italic">Excellence</span> and Integrity 
            </p>
            <div className="space-y-6">
              {[
                { title: '15+ Years Experience', text: 'Deep understanding of the High Court and Supreme Court systems in Nepal.' },
                { title: 'Personalized Strategy', text: 'Tailored legal approaches based on the unique specifics of your case.' },
                { title: 'Unwavering Ethics', text: 'Committed to the highest standards of the Nepal Bar Council.' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="shrink-0 mt-1"><CheckCircle2 className="text-gold-600" /></div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-navy-200 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/about" className="inline-block px-8 py-4 bg-white text-navy-900 font-bold hover:bg-navy-50 transition-colors">
              About Our Practice
            </Link>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-4 w-full">
            <div className="space-y-4 pt-12">
              <div className="bg-navy-800 p-8 text-center space-y-2 border-t-2 border-gold-600">
                <div className="text-4xl font-serif font-bold text-gold-600">1.2k+</div>
                <div className="text-xs uppercase tracking-widest text-navy-300">Cases Won</div>
              </div>
              <div className="bg-navy-800 p-8 text-center space-y-2 border-t-2 border-gold-600">
                <div className="text-4xl font-serif font-bold text-gold-600">98%</div>
                <div className="text-xs uppercase tracking-widest text-navy-300">Success Rate</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-navy-800 p-8 text-center space-y-2 border-t-2 border-gold-600">
                <div className="text-4xl font-serif font-bold text-gold-600">350+</div>
                <div className="text-xs uppercase tracking-widest text-navy-300">Corporate Clients</div>
              </div>
              <div className="bg-navy-800 p-8 text-center space-y-2 border-t-2 border-gold-600">
                <div className="text-4xl font-serif font-bold text-gold-600">24/7</div>
                <div className="text-xs uppercase tracking-widest text-navy-300">Emergency Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-navy-900 border-t border-navy-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-gold-600 text-sm font-bold uppercase tracking-[0.2em] mb-4">Client Testimonials</h2>
            <p className="text-3xl md:text-4xl font-serif font-bold text-white">What Our Clients Say</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Dr. Ramesh Karki', role: 'CEO, Everest Health', text: 'Their expertise in corporate registration and compliance was invaluable for our expansion. Highly professional team.' },
              { name: 'Sunita Gurung', role: 'Individual Client', text: 'Navigating a complex property dispute was stressful, but Lawyers In Nepal handled everything with absolute clarity and success.' },
              { name: 'Arjun Thapa', role: 'Business Owner', text: 'The attorneys here provided reliable legal counsel when we needed it most. They are definitely the best in Kathmandu.' },
            ].map((t, idx) => (
              <div key={idx} className="bg-navy-800 p-8 border border-navy-700 flex flex-col relative gold-glow">
                <div className="flex gap-1 text-gold-600 mb-6">
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                </div>
                <p className="text-navy-100 italic mb-8 flex-grow">"{t.text}"</p>
                <div>
                  <h4 className="font-bold text-white">{t.name}</h4>
                  <p className="text-gold-600/70 text-xs uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section for SEO */}
      <section className="py-24 bg-navy-950 border-t border-navy-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-gold-600 text-sm font-bold uppercase tracking-[0.2em] mb-4">Legal FAQ</h2>
            <p className="text-3xl md:text-4xl font-serif font-bold text-white">Common Questions About <span className="text-gold-600">Law in Nepal</span></p>
          </div>
          <div className="space-y-4">
            {[
              { 
                q: "How can I find the best divorce lawyer in Nepal?", 
                a: "Finding the best divorce lawyer in Nepal involves looking for specialists with extensive experience in family law at the Kathmandu District Court or other regional courts. Our firm offers expert counsel on child custody, alimony, and property division." 
              },
              { 
                q: "What is the process for court marriage in Nepal?", 
                a: "Court marriage in Nepal requires an application to the District Court. Our attorneys help with documentation, including citizenship details, residency proof, and witness coordination for a smooth marriage registration process in Kathmandu." 
              },
              { 
                q: "Do you handle criminal defense cases in Kathmandu?", 
                a: "Yes, we are known as leading criminal lawyers in Kathmandu. We provide strong defense representation for matters ranging from white-collar crimes to bail proceedings and supreme court appeals." 
              },
              { 
                q: "How do I register a company in Nepal as a foreigner?", 
                a: "Foreigners can register a company in Nepal through the Department of Industries. We provide comprehensive legal services for Foreign Direct Investment (FDI), company registration, and obtaining business visas." 
              },
              { 
                q: "Can you help with property dispute resolution in Nepal?", 
                a: "Property disputes are common in Nepal. Our advocates specialize in land law, partition cases, and title verification to protect your real estate interests across the country." 
              }
            ].map((faq, i) => (
              <details key={i} className="group bg-navy-900 border border-navy-800 rounded-sm overflow-hidden transition-all duration-300">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none text-white font-bold hover:bg-navy-800">
                  <span className="pr-4">{faq.q}</span>
                  <div className="w-5 h-5 relative flex-shrink-0">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-gold-600 transition-transform group-open:rotate-180" />
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-gold-600 transition-transform group-open:rotate-90" />
                  </div>
                </summary>
                <div className="px-6 pb-6 text-navy-200 leading-relaxed animate-in slide-in-from-top-2">
                  <p>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gold-600 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy-900 mb-8 max-w-4xl mx-auto">
            Ready to Get the Professional Legal Representation You Deserve?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              href="/appointment"
              className="px-10 py-5 bg-navy-900 text-white font-bold text-lg hover:bg-navy-800 transition-all rounded-sm shadow-xl"
            >
              Request a Consultation
            </Link>
            <a
              href="tel:+9779815861066"
              className="px-10 py-5 bg-white text-navy-900 font-bold text-lg hover:bg-navy-50 transition-all rounded-sm shadow-xl flex items-center justify-center gap-2"
            >
              Call Our Office
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
