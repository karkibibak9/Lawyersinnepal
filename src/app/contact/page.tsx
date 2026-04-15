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
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Header */}
      <section className="bg-navy-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Contact Us</h1>
          <p className="text-navy-100 max-w-2xl mx-auto text-lg leading-relaxed">
            Have a legal question? Reach out to our team. We're here to provide the expert guidance and support you need in Nepal's legal landscape.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Left: Contact Info */}
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-serif font-bold text-navy-900">Get in Touch</h2>
                <p className="text-navy-600 leading-relaxed">
                  Visit our office in Kathmandu or reach out through any of the channels below. Our team is ready to assist you with any legal inquiries.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex gap-6 group">
                  <div className="w-12 h-12 bg-navy-50 text-navy-700 flex items-center justify-center rounded-sm group-hover:bg-gold-600 group-hover:text-navy-900 transition-all shrink-0 shadow-sm border border-navy-100/50">
                    <MapPin size={24} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-navy-800 uppercase tracking-[0.1em] text-xs">Our Office</h4>
                    <p className="text-navy-600">123 Thamel Street<br />Kathmandu, 44600, Nepal</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-12 h-12 bg-navy-50 text-navy-700 flex items-center justify-center rounded-sm group-hover:bg-gold-600 group-hover:text-navy-900 transition-all shrink-0 shadow-sm border border-navy-100/50">
                    <Phone size={24} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-navy-800 uppercase tracking-[0.1em] text-xs">Phone Numbers</h4>
                    <p className="text-navy-600">+977 9815861066 (Mobile)<br />+977 1 4400000 (Office)</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-12 h-12 bg-navy-50 text-navy-700 flex items-center justify-center rounded-sm group-hover:bg-gold-600 group-hover:text-navy-900 transition-all shrink-0 shadow-sm border border-navy-100/50">
                    <Mail size={24} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-navy-800 uppercase tracking-[0.1em] text-xs">Email Addresses</h4>
                    <p className="text-navy-600">info@lawyersinnepal.com<br />contact@lawyersinnepal.com</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-12 h-12 bg-navy-50 text-navy-700 flex items-center justify-center rounded-sm group-hover:bg-gold-600 group-hover:text-navy-900 transition-all shrink-0 shadow-sm border border-navy-100/50">
                    <Clock size={24} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-navy-800 uppercase tracking-[0.1em] text-xs">Office Hours</h4>
                    <p className="text-navy-600">Mon - Fri: 09:00 - 17:00<br />Sat: Closed (Emergencies Only)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-navy-50/50 p-10 lg:p-14 border border-navy-100/50 shadow-2xl rounded-sm">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                  <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center text-navy-900 shadow-xl">
                    <Send size={32} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-navy-900">Message Sent!</h3>
                  <p className="text-navy-600">We've received your inquiry and will get back to you shortly.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-8 py-3 bg-navy-900 text-white font-bold hover:bg-navy-800 transition-all text-sm uppercase tracking-widest"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-navy-500">Full Name</label>
                      <input
                        required
                        name="name"
                        type="text"
                        className="w-full px-4 py-4 bg-white border border-navy-100 focus:border-gold-600 outline-none transition-all rounded-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-navy-500">Email Address</label>
                      <input
                        required
                        name="email"
                        type="email"
                        className="w-full px-4 py-4 bg-white border border-navy-100 focus:border-gold-600 outline-none transition-all rounded-sm"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-navy-500">Subject</label>
                    <input
                      required
                      name="subject"
                      type="text"
                      className="w-full px-4 py-4 bg-white border border-navy-100 focus:border-gold-600 outline-none transition-all rounded-sm"
                      placeholder="Legal Inquiry"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-navy-500">Your Message</label>
                    <textarea
                      required
                      name="message"
                      rows={5}
                      className="w-full px-4 py-4 bg-white border border-navy-100 focus:border-gold-600 outline-none transition-all rounded-sm resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-navy-900 text-white font-bold hover:bg-navy-800 disabled:opacity-50 transition-all rounded-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && <Send size={18} />}
                  </button>
                  {error && <p className="text-red-600 text-center text-sm font-medium">{error}</p>}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[450px] w-full border-t border-navy-100 relative grayscale hover:grayscale-0 transition-all duration-700">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14129.471671048682!2d85.304033!3d27.712166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1900139e6d3d%3A0xe54d24a91901dde!2sThamel%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-navy-900 text-white px-6 py-4 rounded-sm shadow-2xl flex items-center gap-3 pointer-events-none border border-gold-600/30">
          <MapPin size={24} className="text-gold-600" />
          <div className="text-sm font-bold tracking-tight">Lawyers In Nepal HQ, Thamel</div>
        </div>
      </section>
    </div>
  );
}
