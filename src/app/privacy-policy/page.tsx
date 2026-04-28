import { Shield, Lock, Eye, FileText } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Lawyers In Nepal. We are committed to protecting your personal information and legal data.',
};

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fcfcfc]">
      {/* Header */}
      <section className="bg-navy-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Privacy Policy</h1>
          <p className="text-navy-100 max-w-2xl mx-auto text-lg leading-relaxed">
            Your trust is our most valuable asset. Learn how we protect and manage your data.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white p-8 md:p-12 shadow-sm border border-navy-100 space-y-12">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gold-600">
                <Shield size={24} />
                <h2 className="text-2xl font-serif font-bold text-navy-900">Commitment to Confidentiality</h2>
              </div>
              <p className="text-navy-700 leading-relaxed">
                At Lawyers In Nepal, we understand the sensitive nature of legal matters. We are committed to maintaining the highest standards of confidentiality and data security in line with the Nepal Bar Council’s ethical guidelines and international privacy standards.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gold-600">
                <FileText size={24} />
                <h2 className="text-2xl font-serif font-bold text-navy-900">Information We Collect</h2>
              </div>
              <p className="text-navy-700 leading-relaxed">
                We collect information through our website forms (Appointments, Contact, and WhatsApp) to better serve your legal needs. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-navy-700">
                <li><strong>Identity Data:</strong> Full name, professional title.</li>
                <li><strong>Contact Data:</strong> Email address, phone number, physical address.</li>
                <li><strong>Case Data:</strong> Information describing your legal situation or service requirements.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, and usage patterns (via cookies).</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gold-600">
                <Eye size={24} />
                <h2 className="text-2xl font-serif font-bold text-navy-900">How We Use Your Data</h2>
              </div>
              <p className="text-navy-700 leading-relaxed">
                Your data is exclusively used for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-navy-700">
                <li>Scheduling and managing legal consultations.</li>
                <li>Communicating updates regarding your cases or inquiries.</li>
                <li>Improving our legal resources and website user experience.</li>
                <li>Compliance with legal and regulatory obligations in Nepal.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gold-600">
                <Lock size={24} />
                <h2 className="text-2xl font-serif font-bold text-navy-900">Data Security</h2>
              </div>
              <p className="text-navy-700 leading-relaxed">
                We implement robust security measures to prevent unauthorized access, alteration, or disclosure of your sensitive case data. All online submissions are protected using SSL encryption. Access to your data is restricted to authorized personnel who are bound by strict confidentiality agreements.
              </p>
            </div>

            <div className="pt-10 border-t border-navy-100">
              <p className="text-sm text-navy-500 italic">
                Last Updated: April 2026. For any privacy-related inquiries, please contact us at lawyersinnepal.com.np@gmail.com.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
