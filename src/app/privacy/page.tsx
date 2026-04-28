import { Shield, Lock, Eye, FileText } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Confidential Legal Consultation Kathmandu | Lawyers In Nepal',
  description: 'Our privacy policy ensures absolute confidentiality for legal services in Nepal. Trusted by clients for secure legal advocacy and data protection in Kathmandu.',
  keywords: ["legal confidentiality Nepal", "attorney-client privilege Kathmandu", "secure legal services Nepal", "Nepal Bar Council privacy"]
};

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-navy-900">
      {/* Header */}
      <section className="bg-navy-900 py-20 border-b border-navy-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Privacy Policy</h1>
          <p className="text-navy-100 max-w-2xl mx-auto text-lg leading-relaxed">
            Your trust in our <span className="text-gold-600">secure legal services in Kathmandu</span> is our priority.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-navy-800 p-8 md:p-12 shadow-2xl border border-navy-700 space-y-12 rounded-sm">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gold-600">
                <Shield size={24} />
                <h2 className="text-2xl font-serif font-bold text-white">Commitment to Legal Confidentiality in Nepal</h2>
              </div>
              <p className="text-navy-100 leading-relaxed">
                At <span className="text-gold-600 font-bold">Lawyers In Nepal</span>, we understand the sensitive nature of <span className="font-bold underline">confidential legal consultation in Kathmandu</span>. We are committed to maintaining the highest standards of data security in line with the Nepal Bar Council’s ethical guidelines and international privacy standards for legal practitioners.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gold-600">
                <FileText size={24} />
                <h2 className="text-2xl font-serif font-bold text-white">Information We Collect for Legal Representation</h2>
              </div>
              <p className="text-navy-100 leading-relaxed">
                We collect information through our secure website forms to provide expert <span className="text-gold-600 font-bold">legal advocacy in Nepal</span>. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-navy-200">
                <li><strong>Identity Data:</strong> Full name for <span className="italic">court marriage registration</span> or litigation purposes.</li>
                <li><strong>Contact Data:</strong> Verified phone numbers for <span className="italic">criminal defense consultation</span>.</li>
                <li><strong>Case Data:</strong> Sensitive descriptions of property disputes or family law matters.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gold-600">
                <Eye size={24} />
                <h2 className="text-2xl font-serif font-bold text-white">Attorney-Client Privilege and Data Usage</h2>
              </div>
              <p className="text-navy-100 leading-relaxed">
                Your data is exclusively used for professional legal assessment and case management under the strict <span className="font-bold text-gold-600">attorney-client privilege</span> observed by our team at Lawyers In Nepal. This ensures that every <span className="italic">divorce case</span> or <span className="italic">corporate dispute</span> remains strictly private.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gold-600">
                <Lock size={24} />
                <h2 className="text-2xl font-serif font-bold text-white">Secure Data Storage in Kathmandu</h2>
              </div>
              <p className="text-navy-100 leading-relaxed">
                We implement robust security measures to prevent unauthorized access to your sensitive <span className="text-gold-600">legal data in Kathmandu</span>. All online submissions through our appointment booking system are protected using enterprise-grade SSL encryption.
              </p>
            </div>

            <div className="pt-10 border-t border-navy-700">
              <p className="text-sm text-navy-400 italic">
                Last Updated: April 2026. For any privacy-related inquiries regarding <span className="text-gold-600">legal services in Nepal</span>, please contact our senior associates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
