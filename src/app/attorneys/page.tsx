import { Mail, Phone, Globe, CheckCircle, GraduationCap, Award, Shield, Scale } from 'lucide-react';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Top Attorneys in Nepal | Expert Legal Advocates Kathmandu",
  description: "Meet our award-winning lawyers in Nepal. Specializing in Supreme Court litigation, family disputes, and criminal defense in Kathmandu.",
};

const attorneys = [
  {
    name: 'Advocate Krishna Prasad Sharma',
    role: 'Senior Managing Partner',
    specialty: 'Corporate & Supreme Court Litigation',
    bio: 'With over 25 years of experience in the Supreme Court of Nepal, Adv. Sharma is one of the leading legal minds in corporate law and Constitutional matters.',
    education: 'LL.M. from University of London, B.L. from Tribhuvan University',
    email: 'krishna@lawyersinnepal.com',
    phone: '+977 9815861066',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=500'
  },
  {
    name: 'Advocate Sita Devi Gurung',
    role: 'Senior Associate Attorney',
    specialty: 'Family & Civil Law specialist',
    bio: 'Adv. Sita specializes in domestic relations and property disputes, providing compassionate yet firm legal representation for over 15 years.',
    education: 'LL.B. from Tribhuvan University, Specialized Family Law Training (Delhi)',
    email: 'sita@lawyersinnepal.com',
    phone: '+977 9815861066',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=500'
  },
  {
    name: 'Advocate Rajesh Thapa',
    role: 'Associate Attorney',
    specialty: 'Criminal Defense & Intellectual Property',
    bio: 'A dynamic litigator known for meticulous research and strong courtroom presence in high-stakes criminal defense and IP infringement cases.',
    education: 'LL.B. from Kathmandu School of Law',
    email: 'rajesh@lawyersinnepal.com',
    phone: '+977 9815861066',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=500'
  }
];

export default function AttorneysPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="bg-navy-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Our Attorneys</h1>
          <p className="text-navy-100 max-w-2xl mx-auto text-lg leading-relaxed">
            Meet the dedicated legal professionals committed to protecting your interests and delivering excellence in legal advocacy across Nepal.
          </p>
        </div>
      </section>

      {/* Attorney Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {attorneys.map((lawyer, idx) => (
              <div key={idx} className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center lg:items-start`}>
                <div className="w-full lg:w-1/3 aspect-[4/5] relative bg-navy-50 rounded-sm overflow-hidden shadow-2xl">
                  <Image
                    src={lawyer.image}
                    alt={`${lawyer.name} - ${lawyer.role} at Lawyers In Nepal`}
                    width={400}
                    height={500}
                    priority={idx === 0}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 border-8 border-gold-600/10 pointer-events-none" />
                </div>
                
                <div className="flex-1 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-900">{lawyer.name}</h2>
                    <p className="text-gold-700 font-bold uppercase tracking-widest text-sm">{lawyer.role}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 px-3 py-1 bg-navy-50 text-navy-700 rounded-sm w-fit text-xs font-bold uppercase tracking-wider">
                    <CheckCircle size={14} className="text-gold-600" /> Specialist: {lawyer.specialty}
                  </div>
                  
                  <p className="text-navy-700 text-lg leading-relaxed italic">
                    "{lawyer.bio}"
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-navy-900">
                        <GraduationCap size={20} className="text-gold-600" />
                        <span className="font-bold">Education & Credentials</span>
                      </div>
                      <p className="text-navy-500 text-sm leading-relaxed pl-8">
                        {lawyer.education}
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-navy-900">
                        <Mail size={20} className="text-gold-600" />
                        <span className="font-bold">Contact Details</span>
                      </div>
                      <div className="pl-8 space-y-2 text-sm text-navy-500">
                        <p className="flex items-center gap-2"><Mail size={14} /> {lawyer.email}</p>
                        <p className="flex items-center gap-2"><Phone size={14} /> {lawyer.phone}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 flex gap-4 border-t border-navy-100">
                    <button className="px-6 py-3 bg-navy-900 text-white font-bold hover:bg-navy-800 transition-all text-sm uppercase tracking-widest">
                      Book Consultation
                    </button>
                    <button className="p-3 border border-navy-200 text-navy-900 hover:bg-navy-50 transition-all">
                      <Globe size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Badges */}
      <section className="py-20 bg-navy-900 text-white text-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-12 md:gap-24">
            <div className="space-y-2">
              <Award className="w-10 h-10 text-gold-600 mx-auto" />
              <div className="text-2xl font-serif font-bold">100% Client Focus</div>
            </div>
            <div className="space-y-2">
              <Shield size={40} className="text-gold-600 mx-auto" />
              <div className="text-2xl font-serif font-bold">Absolute Privacy</div>
            </div>
            <div className="space-y-2">
              <Scale size={40} className="text-gold-600 mx-auto" />
              <div className="text-2xl font-serif font-bold">Fair Litigation</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
