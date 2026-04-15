'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Scale, Globe } from 'lucide-react';
import { submitContactMessage } from '@/app/actions';

export default function ContactPage() {
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
      message: formData.get('message'),
      subject: formData.get('subject'), // Note: subject isn't in my action yet, but I'll add it to message or update action
    };

    try {
      const result = await submitContactMessage(data);
      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || 'Failed to send message.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-navy-900">
      {/* Header */}
      <section className="bg-navy-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Contact Us</h1>
          <p className="text-navy-100 max-w-2xl mx-auto text-lg leading-relaxed opacity-90">
            Have a legal question? Reach out to our team. We're here to provide the expert guidance and support you need in Nepal's legal landscape.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-navy-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Left: Contact Info */}
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-serif font-bold text-white uppercase tracking-tight">Get in Touch</h2>
                <p className="text-navy-200 leading-relaxed opacity-80 font-serif italic text-lg">
                  Visit our office in Kathmandu or reach out through any of the channels below. Our team is ready to assist you with any legal inquiries.
                </p>
              </div>

              <div className="space-y-8">
                {[
                  { icon: MapPin, title: 'Our Office', text: 'Lawyers In Nepal HQ, Thamel\nKathmandu, 44600, Nepal' },
                  { icon: Phone, title: 'Phone Numbers', text: '+977 9815861066 (Mobile)\n+977 1 4400000 (Office)' },
                  { icon: Mail, title: 'Email Addresses', text: 'info@lawyersinnepal.com\ncontact@lawyersinnepal.com' },
                  { icon: Clock, title: 'Office Hours', text: 'Mon - Fri: 09:00 - 17:00\nSat: Closed (Emergencies Only)' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-12 h-12 bg-navy-800 text-gold-600 flex items-center justify-center rounded-sm group-hover:bg-gold-600 group-hover:text-navy-900 transition-all shrink-0 shadow-lg border border-navy-700">
                      <item.icon size={24} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-gold-500 uppercase tracking-[0.2em] text-[10px]">{item.title}</h4>
                      <p className="text-navy-100 whitespace-pre-line leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-navy-800 p-10 lg:p-14 border border-navy-700 shadow-[0_30px_60px_rgba(0,0,0,0.5)] rounded-sm relative gold-glow">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                  <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center text-navy-900 shadow-[0_0_25px_rgba(255,215,0,0.3)]">
                    <Send size={32} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white">Message Sent!</h3>
                  <p className="text-navy-200">We've received your inquiry and will get back to you shortly.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-8 py-3 bg-gold-600 text-navy-900 font-bold hover:bg-gold-500 transition-all text-sm uppercase tracking-widest"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500">Full Name</label>
                      <input
                        required
                        name="name"
                        type="text"
                        className="w-full px-4 py-4 bg-navy-950 border border-navy-700 focus:border-gold-600 outline-none transition-all rounded-sm text-white placeholder:text-navy-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500">Email Address</label>
                      <input
                        required
                        name="email"
                        type="email"
                        className="w-full px-4 py-4 bg-navy-950 border border-navy-700 focus:border-gold-600 outline-none transition-all rounded-sm text-white placeholder:text-navy-500"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500">Subject</label>
                    <input
                      required
                      name="subject"
                      type="text"
                      className="w-full px-4 py-4 bg-navy-950 border border-navy-700 focus:border-gold-600 outline-none transition-all rounded-sm text-white placeholder:text-navy-500"
                      placeholder="Legal Inquiry"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500">Your Message</label>
                    <textarea
                      required
                      name="message"
                      rows={5}
                      className="w-full px-4 py-4 bg-navy-950 border border-navy-700 focus:border-gold-600 outline-none transition-all rounded-sm resize-none text-white placeholder:text-navy-500"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-gold-600 text-navy-900 font-bold hover:bg-gold-500 disabled:opacity-50 transition-all rounded-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && <Send size={18} />}
                  </button>
                  {error && <p className="text-red-500 text-center text-sm font-medium animate-pulse">{error}</p>}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[450px] w-full border-t border-navy-800 relative grayscale invert-[0.9] opacity-80 hover:grayscale-0 hover:invert-0 transition-all duration-1000">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14129.471671048682!2d85.304033!3d27.712166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1900139e6d3d%3A0xe54d24a91901dde!2sThamel%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-navy-950 text-white px-8 py-5 rounded-sm shadow-2xl flex items-center gap-3 pointer-events-none border border-gold-600/30 font-bold group">
          <MapPin size={24} className="text-gold-600" />
          <div className="text-sm tracking-[0.1em] uppercase">Lawyers In Nepal HQ, Thamel</div>
        </div>
      </section>
    </div>
  );
}
