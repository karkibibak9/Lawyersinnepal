'use client';

import { useState } from 'react';
import { Mail, Phone, Globe, CheckCircle, GraduationCap, Award, Shield, Scale, MapPin, Search, Filter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const attorneys = [
  {
    name: 'Advocate Krishna Prasad Sharma',
    role: 'Senior Managing Partner',
    specialty: 'Corporate & Supreme Court Litigation',
    bio: 'With over 25 years of experience in the Supreme Court of Nepal, Adv. Sharma is one of the leading legal minds in corporate law and Constitutional matters.',
    education: 'LL.M. from University of London, B.L. from Tribhuvan University',
    email: 'lawyersinnepal.com.np@gmail.com',
    phone: '+977 9815861066',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=500'
  },
  {
    name: 'Advocate Sita Devi Gurung',
    role: 'Senior Associate Attorney',
    specialty: 'Family & Civil Law specialist',
    bio: 'Adv. Sita specializes in domestic relations and property disputes, providing compassionate yet firm legal representation for over 15 years.',
    education: 'LL.B. from Tribhuvan University, Specialized Family Law Training (Delhi)',
    email: 'lawyersinnepal.com.np@gmail.com',
    phone: '+977 9815861066',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=500'
  },
  {
    name: 'Advocate Rajesh Thapa',
    role: 'Associate Attorney',
    specialty: 'Criminal Defense & Intellectual Property',
    bio: 'A dynamic litigator known for meticulous research and strong courtroom presence in high-stakes criminal defense and IP infringement cases.',
    education: 'LL.B. from Kathmandu School of Law',
    email: 'lawyersinnepal.com.np@gmail.com',
    phone: '+977 9815861066',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=500'
  },
  {
    name: 'Advocate Gaurab Dangi',
    role: 'Criminal Defence Lawyer',
    specialty: 'Criminal Defence, Cybercrime & Domestic Violence',
    bio: 'A dedicated defence lawyer in Nepal known for providing strategic legal representation across Kathmandu. With 7 years of experience, he offers reliable legal services for individuals facing investigation, arrest, or trial.',
    education: 'Expertise in Nepalese Criminal Law, Muluki Criminal Code 2017 & Evidence Act',
    email: 'lawyersinnepal.com.np@gmail.com',
    phone: '+977 9864423830',
    location: 'Purbi Gate, Anamnagar-29, Kathmandu 44600, Nepal',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=400&h=500'
  }
];

const specialties = Array.from(new Set(attorneys.map(a => a.specialty)));

export default function AttorneysPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const filteredAttorneys = attorneys.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === '' || lawyer.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="flex flex-col w-full min-h-screen bg-navy-900">
      {/* Header */}
      <section className="bg-navy-900 py-20 border-b border-navy-800/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Our Attorneys</h1>
          <p className="text-navy-100 max-w-2xl mx-auto text-lg leading-relaxed opacity-90">
            Meet the dedicated legal professionals committed to protecting your interests across Nepal.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-navy-950/50 sticky top-0 z-30 backdrop-blur-md border-b border-navy-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400" size={20} />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-navy-800 border border-navy-700 focus:border-gold-600 focus:ring-1 focus:ring-gold-600 outline-none transition-all rounded-sm text-white placeholder:text-navy-500"
              />
            </div>
            <div className="w-full md:w-72 relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400" size={20} />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-navy-800 border border-navy-700 focus:border-gold-600 focus:ring-1 focus:ring-gold-600 outline-none transition-all rounded-sm text-white cursor-pointer appearance-none"
              >
                <option value="">All Specialties</option>
                {specialties.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Attorney Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          {filteredAttorneys.length > 0 ? (
            <div className="space-y-32">
              {filteredAttorneys.map((lawyer, idx) => (
                <div 
                  key={lawyer.name} 
                  className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center lg:items-start p-8 rounded-sm bg-navy-800/40 border border-navy-700 gold-glow shadow-2xl transition-all duration-700 animate-in fade-in slide-in-from-bottom-8`}
                >
                  <div className="w-full lg:w-1/3 aspect-[4/5] relative bg-navy-900 rounded-sm overflow-hidden shadow-2xl border border-gold-600/10">
                    <Image
                      src={lawyer.image}
                      alt={`${lawyer.name} - ${lawyer.role} at Lawyers In Nepal`}
                      width={400}
                      height={500}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent pointer-events-none" />
                  </div>
                  
                  <div className="flex-1 space-y-6 pt-4">
                    <div className="space-y-2">
                      <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">{lawyer.name}</h2>
                      <p className="text-gold-600 font-bold uppercase tracking-[0.2em] text-sm">{lawyer.role}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-navy-900 text-gold-500 rounded-sm w-fit text-xs font-bold uppercase tracking-widest border border-gold-600/10">
                      <Shield size={14} className="text-gold-600" /> Specialist: {lawyer.specialty}
                    </div>
                    
                    <p className="text-navy-100 text-lg md:text-xl leading-relaxed italic font-serif opacity-90">
                      "{lawyer.bio}"
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-navy-700">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-white">
                          <GraduationCap size={20} className="text-gold-600" />
                          <span className="font-bold uppercase tracking-widest text-xs">Education & Credentials</span>
                        </div>
                        <p className="text-navy-300 text-sm leading-relaxed pl-8">
                          {lawyer.education}
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-white">
                          <Mail size={20} className="text-gold-600" />
                          <span className="font-bold uppercase tracking-widest text-xs">Direct Contact</span>
                        </div>
                        <div className="pl-8 space-y-2 text-sm text-navy-200">
                          <p className="flex items-center gap-2 hover:text-gold-600 transition-colors cursor-pointer"><Mail size={14} /> {lawyer.email}</p>
                          <p className="flex items-center gap-2 hover:text-gold-600 transition-colors cursor-pointer"><Phone size={14} /> {lawyer.phone}</p>
                          {lawyer.location && <p className="flex items-center gap-2 hover:text-gold-600 transition-colors cursor-pointer"><MapPin size={14} className="shrink-0" /> {lawyer.location}</p>}
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-8 flex gap-4">
                      <Link href="/appointment" className="px-8 py-4 bg-gold-600 text-navy-900 font-bold hover:bg-gold-500 transition-all text-sm uppercase tracking-widest shadow-lg">
                        Book Consultation
                      </Link>
                      <button className="px-4 py-4 border border-navy-700 text-white hover:border-gold-600 transition-all group">
                        <Globe size={20} className="group-hover:rotate-12 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4">
              <Scale size={48} className="mx-auto text-navy-700" />
              <h3 className="text-2xl font-serif text-white">No attorneys found matching your criteria.</h3>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedSpecialty(''); }}
                className="text-gold-600 hover:text-gold-400 font-bold uppercase tracking-widest text-sm underline underline-offset-4"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Stats / Badges */}
      <section className="py-20 bg-navy-950 text-white text-center border-t border-navy-800">
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
