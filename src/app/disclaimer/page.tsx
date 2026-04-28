import { ShieldAlert, Info, Gavel, Scale } from 'lucide-react';

export const metadata = {
  title: 'Legal Disclaimer | Attorney-Client Privilege Notice | Lawyers In Nepal',
  description: 'Our legal disclaimer clarifies that information on this Kathmandu law firm website is for general guidance and not specific legal advice in Nepal.',
  keywords: ["legal disclaimer Nepal", "not legal advice Kathmandu", "attorney-client privilege notice", "Nepal bar council regulations"]
};

export default function Disclaimer() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-navy-900">
      {/* Header */}
      <section className="bg-navy-900 py-20 border-b border-navy-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Legal Disclaimer</h1>
          <p className="text-navy-100 max-w-2xl mx-auto text-lg leading-relaxed">
            Essential <span className="text-gold-600">legal notice</span> for users seeking information on <span className="text-gold-600">law practice in Nepal</span>.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-navy-800 p-8 md:p-12 shadow-2xl border border-navy-700 space-y-12 rounded-sm">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gold-600">
                <Info size={24} />
                <h2 className="text-2xl font-serif font-bold text-white">General Information Only</h2>
              </div>
              <p className="text-navy-100 leading-relaxed">
                The information provided on this website by <span className="text-gold-600 font-bold">Lawyers In Nepal</span> is for general informational purposes only. It is not intended to be <span className="font-bold underline">legal advice in Kathmandu</span> or any other jurisdiction in Nepal. You should not rely on any information on this site as an alternative to legal advice from a <span className="text-gold-600 font-bold">senior advocate in Nepal</span>.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gold-600">
                <Gavel size={24} />
                <h2 className="text-2xl font-serif font-bold text-white">No Professional Relationship</h2>
              </div>
              <p className="text-navy-100 leading-relaxed">
                Use of this website, including sending queries related to <span className="italic">divorce law</span>, <span className="italic">corporate litigation</span>, or <span className="italic">criminal defense</span> through our contact forms, does not create an <span className="text-gold-600 font-bold">attorney-client relationship</span> between you and our firm. 
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gold-600">
                <ShieldAlert size={24} />
                <h2 className="text-2xl font-serif font-bold text-white">Compliance with Nepal Bar Council</h2>
              </div>
              <p className="text-navy-100 leading-relaxed">
                This website is designed to provide information about our <span className="text-gold-600">top-rated legal services in Kathmandu</span> and is in full compliance with the <span className="font-bold">Nepal Bar Council (Code of Conduct) Rules</span>. We do not solicit or advertise in a manner prohibited by the regulations governing <span className="italic underline">lawyers in Nepal</span>.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gold-600">
                <Scale size={24} />
                <h2 className="text-2xl font-serif font-bold text-white">Accuracy of Legal Information</h2>
              </div>
              <p className="text-navy-100 leading-relaxed">
                While we make every effort to update our content with the latest laws of Nepal (e.g., <span className="italic text-gold-500">Muluki Civil Code</span>), we do not guarantee that all information is complete, accurate, or current. For specific <span className="text-gold-600">legal consultation in Nepal</span>, please book a face-to-face meeting at our Anamnagar office.
              </p>
            </div>

            <div className="pt-10 border-t border-navy-700">
              <p className="text-sm text-navy-400 italic">
                Last Updated: April 2026. Lawyers In Nepal - Excellence in Advocacy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
