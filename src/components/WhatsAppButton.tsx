'use client';

import { MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { trackWhatsAppLead } from '@/app/actions';

export default function WhatsAppButton() {
  const pathname = usePathname();
  const phoneNumber = '+9779815861066';
  const message = encodeURIComponent('Hello! I would like to inquire about your legal services.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const handleClick = async () => {
    // Fire and forget tracking to not delay the user
    trackWhatsAppLead(pathname || 'unknown');
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} className="fill-current" />
      <span className="absolute right-full mr-4 bg-navy-950 text-white px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 whitespace-nowrap shadow-2xl border border-gold-600/30 pointer-events-none">
        Chat with a Lawyer
      </span>
    </a>
  );
}
