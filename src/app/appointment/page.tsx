'use client';

import { useState } from 'react';
import { Scale, Calendar, Clock, MessageSquare, User, Mail, Phone, ChevronRight } from 'lucide-react';
import { submitAppointment } from '@/app/actions';

export default function AppointmentPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      service: formData.get('service'),
      date: formData.get('date'),
      message: formData.get('message'),
    };

    try {
      const result = await submitAppointment(data);
      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || 'Failed to submit appointment. Please check your connection.');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      if (err instanceof TypeError && err.message === 'fetch failed') {
        setError('Connection to security server failed. Please ensure environment variables are configured correctly.');
      } else {
        setError('Something went wrong. Please try again or call us directly.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-navy-50 py-24 px-4">
        <div className="max-w-md w-full bg-white p-12 text-center border-t-8 border-gold-600 shadow-2xl space-y-6">
          <div className="w-20 h-20 bg-gold-600 text-navy-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <Scale size={40} />
          </div>
          <h1 className="text-3xl font-serif font-bold text-navy-900">Request Received</h1>
          <p className="text-navy-600 leading-relaxed">
            Thank you for reaching out. One of our senior associates will contact you within 24 hours to confirm your appointment.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="w-full py-4 bg-navy-900 text-white font-bold hover:bg-navy-800 transition-all rounded-sm uppercase tracking-widest text-sm"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fcfcfc]">
      {/* Header */}
      <section className="bg-navy-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Book a Consultation</h1>
          <p className="text-navy-100 max-w-2xl mx-auto text-lg leading-relaxed">
            Take the first step towards resolving your legal matters. Schedule a confidential meeting with our expert team in Kathmandu.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-navy-900 z-0" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row shadow-2xl rounded-sm overflow-hidden bg-white border border-navy-100">
            {/* Info Panel */}
            <div className="lg:w-1/3 bg-gold-600 p-12 text-navy-900 space-y-10">
              <div className="space-y-4">
                <h2 className="text-3xl font-serif font-bold">Why Consult Us?</h2>
                <div className="w-12 h-1 bg-navy-900/20" />
              </div>
              
              <ul className="space-y-6">
                {[
                  { icon: Clock, title: '24h Response', text: 'We prioritize your case from the moment you reach out.' },
                  { icon: Scale, title: 'Confidentiality', text: 'All details shared are protected by attorney-client privilege.' },
                  { icon: MessageSquare, title: 'Expert Guidance', text: 'Initial scoping of your legal situation by seniors.' },
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="shrink-0 pt-1"><item.icon size={24} /></div>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-navy-900/70 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="pt-10 border-t border-navy-900/10 space-y-4 text-sm">
                <p className="font-bold">Need Immediate Help?</p>
                <p className="flex items-center gap-2"><Phone size={16} /> +977 9815861066</p>
                <p className="flex items-center gap-2 font-bold"><ChevronRight size={16} /> Lawyers In Nepal HQ, Thamel</p>
              </div>
            </div>

            {/* Form */}
            <div className="flex-1 p-12 bg-white">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-navy-500">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-4 text-navy-300" size={18} />
                      <input
                        required
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        className="w-full pl-12 pr-4 py-4 bg-navy-50/50 border border-navy-100 focus:border-gold-600 focus:ring-1 focus:ring-gold-600 outline-none transition-all rounded-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-navy-500">Contact Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-4 text-navy-300" size={18} />
                      <input
                        required
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        className="w-full pl-12 pr-4 py-4 bg-navy-50/50 border border-navy-100 focus:border-gold-600 focus:ring-1 focus:ring-gold-600 outline-none transition-all rounded-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-navy-500">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-4 text-navy-300" size={18} />
                      <input
                        required
                        name="phone"
                        type="tel"
                        placeholder="+977-98XXXXXXXX"
                        className="w-full pl-12 pr-4 py-4 bg-navy-50/50 border border-navy-100 focus:border-gold-600 focus:ring-1 focus:ring-gold-600 outline-none transition-all rounded-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-navy-500">Preferred Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-4 text-navy-300" size={18} />
                      <input
                        required
                        name="date"
                        type="date"
                        className="w-full pl-12 pr-4 py-4 bg-navy-50/50 border border-navy-100 focus:border-gold-600 focus:ring-1 focus:ring-gold-600 outline-none transition-all rounded-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-navy-500">Legal Service Category</label>
                  <select
                    name="service"
                    className="w-full px-4 py-4 bg-navy-50/50 border border-navy-100 focus:border-gold-600 focus:ring-1 focus:ring-gold-600 outline-none transition-all rounded-sm appearance-none"
                  >
                    <option value="civil">Civil Law / Property</option>
                    <option value="criminal">Criminal Defense</option>
                    <option value="corporate">Corporate / FDI</option>
                    <option value="family">Family Law / Divorce</option>
                    <option value="other">Other Legal Support</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-navy-500">Message / Case Overview</label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    placeholder="Briefly describe your legal situation..."
                    className="w-full px-4 py-4 bg-navy-50/50 border border-navy-100 focus:border-gold-600 focus:ring-1 focus:ring-gold-600 outline-none transition-all rounded-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-navy-900 text-white font-bold hover:bg-navy-800 disabled:opacity-50 transition-all rounded-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl"
                >
                  {isSubmitting ? 'Processing...' : 'Confirm Appointment Request'}
                  {!isSubmitting && <ArrowRight size={18} />}
                </button>
                
                {error && <p className="text-red-600 text-center text-sm font-medium">{error}</p>}
                
                <p className="text-navy-400 text-[10px] text-center uppercase tracking-widest leading-loose">
                  By submitting this form, you acknowledge that this does not constitute an attorney-client relationship until a formal agreement is signed.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ArrowRight({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
