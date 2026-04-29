import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { attorneys } from '@/lib/attorneys';
import { 
  Mail, Phone, MapPin, GraduationCap, Award, 
  Shield, Scale, ChevronRight, CheckCircle2, 
  Clock, BookOpen, Briefcase
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return attorneys.map((attorney) => ({
    slug: attorney.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const attorney = attorneys.find(a => a.slug === slug);
  if (!attorney) return { title: 'Attorney Not Found' };

  return {
    title: `${attorney.name} | ${attorney.role} | Lawyers In Nepal`,
    description: attorney.bio,
    keywords: [attorney.name, attorney.specialty, 'Lawyer in Nepal', 'Advocate Kathmandu'],
  };
}

export default async function AttorneyProfilePage({ params }: Props) {
  const { slug } = await params;
  const attorney = attorneys.find(a => a.slug === slug);

  if (!attorney) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full bg-navy-900 text-white min-h-screen">
      {/* Hero / Header Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-navy-800">
        <div className="absolute inset-0 z-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/90 to-navy-900 z-0" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/3 max-w-sm aspect-[4/5] relative rounded-sm overflow-hidden shadow-2xl border-2 border-gold-600/20 gold-glow">
              <Image
                src={attorney.image}
                alt={attorney.name}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            
            <div className="flex-1 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-600/10 border border-gold-600/20 text-gold-500 font-bold text-xs uppercase tracking-widest">
                <Shield size={14} /> Certified Legal Professional
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white">
                {attorney.name}
              </h1>
              <p className="text-xl md:text-2xl text-gold-600 font-serif italic">
                {attorney.role}
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
                <div className="flex items-center gap-2 text-navy-200">
                  <Briefcase size={18} className="text-gold-600" />
                  <span>{attorney.specialty}</span>
                </div>
                <div className="flex items-center gap-2 text-navy-200">
                  <MapPin size={18} className="text-gold-600" />
                  <span>Kathmandu, Nepal</span>
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/appointment" className="px-8 py-4 bg-gold-600 text-navy-900 font-bold hover:bg-gold-500 transition-all rounded-sm uppercase tracking-widest text-sm shadow-xl">
                  Schedule Consultation
                </Link>
                <a href={`mailto:${attorney.email}`} className="px-8 py-4 bg-transparent border border-white/20 text-white hover:bg-white/5 transition-all rounded-sm uppercase tracking-widest text-sm">
                  Send Message
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24 bg-navy-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Left Column: Biography & Details */}
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-serif font-bold text-white border-b border-gold-600/30 pb-4">Professional Biography</h2>
                <div className="prose prose-invert prose-gold max-w-none">
                  {attorney.longDescription ? (
                    <div className="text-navy-100 text-lg leading-relaxed whitespace-pre-line">
                      {attorney.longDescription}
                    </div>
                  ) : (
                    <p className="text-navy-100 text-lg leading-relaxed italic">
                      "{attorney.bio}"
                    </p>
                  )}
                </div>
              </div>

              {attorney.services && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-wider">Legal Services & Focus Areas</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {attorney.services.map((service, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-navy-900/50 border border-navy-800 rounded-sm">
                        <CheckCircle2 size={18} className="text-gold-600" />
                        <span className="text-navy-100">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {attorney.expertise && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-wider">Legal Expertise</h2>
                  <div className="flex flex-wrap gap-3">
                    {attorney.expertise.map((exp, i) => (
                      <span key={i} className="px-4 py-2 bg-gold-600/5 border border-gold-600/20 text-gold-500 rounded-sm text-sm font-medium">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Contact & Stats */}
            <div className="space-y-8">
              <div className="bg-navy-900 p-8 border border-navy-800 rounded-sm shadow-xl sticky top-32">
                <h3 className="text-xl font-serif font-bold text-white mb-6 border-b border-gold-600/20 pb-4">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="text-gold-600 shrink-0 mt-1" size={20} />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-navy-400">Direct Email</p>
                      <a href={`mailto:${attorney.email}`} className="text-navy-100 hover:text-gold-600 transition-colors">{attorney.email}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="text-gold-600 shrink-0 mt-1" size={20} />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-navy-400">Direct Phone</p>
                      <a href={`tel:${attorney.phone.replace(/\s+/g, '')}`} className="text-navy-100 hover:text-gold-600 transition-colors">{attorney.phone}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <GraduationCap className="text-gold-600 shrink-0 mt-1" size={20} />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-navy-400">Academic Background</p>
                      <p className="text-navy-100">{attorney.education}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 p-6 bg-gold-600/5 border border-gold-600/20 rounded-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="text-gold-600" size={20} />
                    <span className="font-bold text-sm uppercase tracking-widest">Office Hours</span>
                  </div>
                  <p className="text-navy-300 text-sm">Mon - Fri: 10:00 AM - 5:00 PM</p>
                  <p className="text-navy-300 text-sm">Sat - Sun: By Appointment</p>
                </div>

                <Link href="/appointment" className="mt-8 w-full flex items-center justify-center gap-2 py-4 bg-navy-800 text-gold-600 font-bold hover:bg-gold-600 hover:text-navy-900 transition-all rounded-sm uppercase tracking-widest text-xs border border-gold-600/30">
                  Book A Meeting <ChevronRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-navy-900 border-t border-navy-800">
        <div className="container mx-auto px-4 text-center space-y-8">
          <Scale className="w-16 h-16 text-gold-600 mx-auto opacity-50" />
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white max-w-4xl mx-auto leading-tight">
            Commitment to Justice, Excellence in <span className="text-gold-600">Legal Advocacy</span>
          </h2>
          <p className="text-xl text-navy-200 max-w-2xl mx-auto">
            Our firm stands on the pillars of ethics, transparency, and superior legal acumen across all judicial systems in Nepal.
          </p>
          <div className="flex justify-center gap-6 pt-4">
            <Link href="/attorneys" className="text-gold-600 hover:text-gold-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2 group">
              View All Attorneys <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-10 bg-navy-950 border-t border-navy-900">
        <div className="container mx-auto px-4">
          <p className="text-navy-500 text-[10px] uppercase tracking-widest text-center max-w-4xl mx-auto leading-loose">
            Disclaimer: The content provided on this page is for general informational purposes only and does not constitute legal advice, solicitation, or advertising. 
            Accessing this information does not establish an attorney-client relationship. Always consult with a qualified legal professional for your specific case.
          </p>
        </div>
      </section>
    </div>
  );
}
