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
      <span className="absolute right-full mr-3 bg-white text-navy-900 px-3 py-1.5 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-navy-100">
        Chat with a Lawyer
      </span>
    </a>
  );
}
