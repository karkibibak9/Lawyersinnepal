import Link from 'next/link';
import Image from 'next/image';
import { Scale, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-navy-900 px-4 relative overflow-hidden">
      {/* Subtle background scales for law feel */}
      <Scale className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] text-navy-800/20 pointer-events-none" />
      
      <div className="z-10 text-center max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        
        <div className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-gold-600 shadow-[0_0_40px_rgba(202,138,4,0.3)]">
          <Image
            // Using a popular Saul Goodman 3D / Meme reference image online
            src="https://i.kym-cdn.com/entries/icons/original/000/039/496/saul.jpg"
            alt="Did you know you have rights?"
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-gold-600 drop-shadow-md">
            404
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-widest">
            Objection! Page Not Found
          </h2>
        </div>

        <div className="bg-navy-800/80 p-6 md:p-8 rounded-sm border-l-4 border-gold-600 text-left shadow-xl inline-block max-w-xl mx-auto backdrop-blur-sm">
          <p className="text-navy-100 text-lg md:text-xl font-serif italic mb-4">
            "Did you know that you have rights? The Constitution says you do. And so do I. But unfortunately, the Constitution doesn't grant you the right to view a page that doesn't exist."
          </p>
          <p className="text-gold-500 font-bold uppercase tracking-widest text-sm text-right">
            - Your Legal Counsel
          </p>
        </div>

        <div className="pt-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gold-600 hover:bg-gold-500 text-navy-900 font-bold rounded-sm transition-all transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(202,138,4,0.3)] uppercase tracking-wider"
          >
            <ArrowLeft size={20} />
            Return to Homepage
          </Link>
        </div>

      </div>
    </div>
  );
}
