import { Scale, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | Legal Services Agreement Nepal | Lawyers In Nepal',
  description: 'Terms and conditions for hiring the best lawyers in Kathmandu. Understand our legal service agreements for litigations and consultations in Nepal.',
  keywords: ["legal service agreement Nepal", "hiring a lawyer Kathmandu", "litigation terms Nepal", "law firm contract Kathmandu"]
};

export default function TermsOfService() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-navy-900">
      {/* Header */}
      <section className="bg-navy-900 py-20 border-b border-navy-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Terms of Service</h1>
          <p className="text-navy-100 max-w-2xl mx-auto text-lg leading-relaxed">
            Governing the professional <span className="text-gold-600">legal services agreement in Nepal</span> between our firm and our valued clients.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-navy-800 p-8 md:p-12 shadow-2xl border border-navy-700 space-y-12 rounded-sm">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gold-600">
                <Scale size={24} />
                <h2 className="text-2xl font-serif font-bold text-white">1. Provision of Legal Services in Kathmandu</h2>
              </div>
              <p className="text-navy-100 leading-relaxed">
                <span className="text-gold-600 font-bold">Lawyers In Nepal</span> provides expert legal representation and consultation within the jurisdiction of the Federal Democratic Republic of Nepal. By using our website or booking a <span className="font-bold underline">consultation with a lawyer in Kathmandu</span>, you agree to these terms.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gold-600">
                <CheckCircle size={24} />
                <h2 className="text-2xl font-serif font-bold text-white">2. No Attorney-Client Relationship</h2>
              </div>
              <p className="text-navy-100 leading-relaxed">
                Viewing this website or submitting an appointment request does <span className="font-bold italic text-gold-500">not</span> constitute an attorney-client relationship. A formal relationship is only established after a signed <span className="text-gold-600">vakalatnama</span> or professional engagement letter has been executed in our <span className="italic">Kathmandu law office</span>.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gold-600">
                <FileText size={24} />
                <h2 className="text-2xl font-serif font-bold text-white">3. Professional Fees and Billing</h2>
              </div>
              <p className="text-navy-100 leading-relaxed">
                Our fees for <span className="italic text-gold-600 font-bold">Supreme Court litigation</span>, <span className="italic">civil property disputes</span>, and <span className="italic">corporate registrations</span> are based on the complexity of the case. Detailed fee structures for <span className="underline">top-rated attorneys in Nepal</span> will be provided during the initial consultation.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gold-600">
                <AlertTriangle size={24} />
                <h2 className="text-2xl font-serif font-bold text-white">4. Limitation of Liability</h2>
              </div>
              <p className="text-navy-100 leading-relaxed">
                While we strive for excellence in <span className="text-gold-600">legal advocacy in Nepal</span>, legal outcomes are subject to the court's discretion. <span className="font-bold">Lawyers In Nepal</span> is not liable for indirect or consequential damages arising from the use of information on this professional legal portal.
              </p>
            </div>

            <div className="pt-10 border-t border-navy-700">
              <p className="text-sm text-navy-400 italic">
                These terms are governed by the laws of Nepal. Last Updated: April 2026.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
