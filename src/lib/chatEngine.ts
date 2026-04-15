// ============================================================
// Lawyers In Nepal – Rule-Based Legal Chat Engine
// No external AI API required. Fully offline-capable.
// ============================================================

export type ChatRole = 'user' | 'assistant';
export interface ChatMessage { role: ChatRole; content: string; }

// ── Booking State Machine ──────────────────────────────────
export type BookingState = 'idle' | 'name' | 'phone' | 'service' | 'date' | 'confirm';
export interface BookingData {
  name?: string;
  phone?: string;
  service?: string;
  date?: string;
}

// ── Intent Definitions ─────────────────────────────────────
interface Intent {
  keywords: string[];
  response: string | string[];
}

const SERVICES = [
  'Civil Law', 'Criminal Law', 'Corporate Law', 'Family Law',
  'Divorce', 'Property Law', 'Immigration', 'Intellectual Property',
  'Labor Law', 'Business Registration', 'Foreign Investment (FITTA)',
  'NGO/INGO Registration', 'Trademark', 'Arbitration', 'Other'
];

// Pick a random response if array provided
function pick(r: string | string[]): string {
  if (Array.isArray(r)) return r[Math.floor(Math.random() * r.length)];
  return r;
}

// ── Intents Knowledge Base ────────────────────────────────
const INTENTS: Intent[] = [
  // Greetings
  {
    keywords: ['hello', 'hi', 'hey', 'namaste', 'good morning', 'good afternoon', 'good evening', 'howdy'],
    response: [
      'Namaste! 🙏 Welcome to Lawyers In Nepal. I\'m your legal assistant. How can I help you today?',
      'Namaste! 🙏 Great to have you here. I can answer your legal questions or help you book a consultation. What do you need?',
      'Hello! I\'m the Lawyers In Nepal assistant. Whether it\'s a corporate matter or a personal legal issue — I\'m here to help. What can I do for you?'
    ]
  },

  // Services overview
  {
    keywords: ['services', 'what do you offer', 'practice areas', 'what can you help', 'areas of law', 'specialization'],
    response: `We offer a comprehensive range of legal services in Kathmandu:

⚖️ **Corporate & Business Law** — Company registration, FDI (FITTA), branch offices, liquidation
👨‍👩‍👧 **Family Law** — Divorce, child custody, marriage registration, inheritance
🏠 **Property Law** — Land purchase, title verification, Malpot office procedures
🔒 **Criminal Defense** — Arrest rights, bail, trial representation
📋 **Labor & Employment** — Labor Act compliance, SSF registration, work permits
💡 **Intellectual Property** — Trademark, copyright, patent registration
🌐 **Immigration** — Work permits, NRN rights, foreign visas
🤝 **Arbitration & Disputes** — Commercial dispute resolution, cheque bounce, mediation

Which area can I assist you with today?`
  },

  // Divorce
  {
    keywords: ['divorce', 'separation', 'alimony', 'custody', 'child custody', 'matrimonial', 'marriage break'],
    response: `**Divorce Law in Nepal** is governed by the Muluki Civil Code, 2074.

Key points:
• Either spouse can file for divorce — mutual consent or contested
• **Alimony** is calculated based on assets and duration of marriage
• **Child custody** defaults to the mother for children under 5; older children's preference is considered
• Property acquired during marriage is generally split 50/50
• The process takes **2–6 months** at the District Court in Kathmandu

Our family law team handles divorce cases with sensitivity and discretion.

Would you like to **book a free consultation** with our divorce lawyers? Just say "book appointment".`
  },

  // Criminal
  {
    keywords: ['criminal', 'arrest', 'bail', 'fir', 'police', 'murder', 'fraud', 'theft', 'cheque bounce', 'accused', 'prison', 'jail', 'offense', 'crime'],
    response: `**Criminal Defense at Lawyers In Nepal:**

Your fundamental rights under the Muluki Criminal Code:
• Right to know charges within **24 hours** of arrest
• Right to an advocate from the moment of arrest
• Right to **bail** (for bailable offenses) — typically NPR 10,000–500,000 depending on severity
• Right to a fair and speedy trial

**Cheque Bounce Cases**: We can file under the Negotiable Instruments Act or the Banking Offense Act for criminal penalties + 25% interest.

Our criminal defense lawyers have represented clients across Kathmandu's district courts and the Supreme Court.

Type "book appointment" to speak with a criminal lawyer today.`
  },

  // Property
  {
    keywords: ['property', 'land', 'house', 'real estate', 'lal purja', 'malpot', 'buy land', 'sell land', 'title', 'deed', 'registration'],
    response: `**Property Law in Nepal** — Key Facts:

🔍 **Before buying**, always verify:
  - Lal Purja (Ownership Certificate) authenticity
  - Malpot Office records for existing mortgages
  - Napi (Survey) boundary confirmation

📝 **Registration (The "Pass")**:
  - Sale Deed drafted by a lawyer
  - Registration tax paid at the Malpot Office
  - New Lal Purja issued in buyer's name

⚠️ **Foreign nationals** generally cannot own land, but NRNs with a valid ID Card can purchase residential property within limits.

We handle full end-to-end property transactions in Kathmandu, Lalitpur, and Bhaktapur.

Ready to verify a property? Type "book appointment".`
  },

  // Company / Business Registration
  {
    keywords: ['company', 'register', 'registration', 'business', 'startup', 'pvt ltd', 'private limited', 'ocr', 'company registrar', 'incorporate'],
    response: `**Company Registration in Nepal** — Process Overview:

**For Nepalese Companies (Pvt. Ltd.):**
1. Reserve company name at OCR online portal
2. Draft AOA/MOA (Articles & Memorandum of Association)
3. Submit with citizenship copies of all directors
4. Obtain Company Registration Certificate
5. Register for PAN/VAT at the Inland Revenue Office

**Time**: ~3–7 working days | **Min. Capital**: No minimum for local companies

**For Foreign Companies (FITTA)**:
- Min. investment: NPR 20 Million (~USD 150,000)
- Approval through Department of Industries
- Full profit repatriation rights after tax

Our corporate team handles the entire process so you can focus on building your business.

Type "book appointment" to get started!`
  },

  // Foreign investment / FITTA
  {
    keywords: ['foreign investment', 'fitta', 'fdi', 'international', 'invest in nepal', 'foreigner register', 'bring money'],
    response: `**Foreign Investment in Nepal (FITTA 2075)**:

✅ Minimum investment: **NPR 20 Million** (~USD 150,000)
✅ Full repatriation of profits in foreign currency (after tax)
✅ 100% foreign ownership allowed in most sectors

❌ Restricted sectors: Agriculture, cottage industry, retail, real estate speculation

**Process**:
1. Apply to Dept. of Industries with project report
2. Get FDI approval + company registration at OCR
3. PAN/VAT registration
4. Open a corporate bank account

We specialize in helping international businesses enter Nepal legally and efficiently.

Would you like a consultation? Type "book appointment".`
  },

  // Trademark / IP
  {
    keywords: ['trademark', 'brand', 'logo', 'ip', 'intellectual property', 'copyright', 'patent', 'protect brand', 'brand name'],
    response: `**Intellectual Property Protection in Nepal**:

📌 **Trademark Registration**:
- Filed at the Department of Industry (DOI)
- Valid for **7 years**, renewable indefinitely
- Covers: Logos, brand names, slogans, packaging
- Processing time: **3–6 months**
- Strong protection against local counterfeiting

📌 **Copyright**:
- Automatic protection upon creation
- Voluntary registration at Copyright Registrar's Office
- Lifetime of author + 50 years protection

📌 **Patent**:
- Filed with the Department of Industry
- Valid for 7 years with renewable options

We handle IP filings, renewals, and infringement litigation in Kathmandu.

Type "book appointment" to protect your brand today!`
  },

  // Labor / Employment
  {
    keywords: ['labor', 'labour', 'employee', 'employer', 'ssf', 'social security', 'work contract', 'termination', 'fired', 'gratuity', 'provident fund'],
    response: `**Nepal Labor Act 2074 — Key Highlights**:

👷 **Employee Rights**:
- Mandatory SSF contribution: **31%** of basic salary (20% employer + 11% employee)
- Minimum 1 month notice for termination (or salary in lieu)
- Gratuity: 8.33% of annual basic salary per year of service
- 18 days annual leave + 13 public holidays

⚠️ **Employers** must register all staff with the SSF within 30 days of hiring. Penalties for non-compliance are significant.

📋 **Employment Contracts** must specify: role, salary, working hours, benefits, and termination terms.

Our labor law team assists both employers and employees in Kathmandu.

Type "book appointment" to consult our labor lawyers.`
  },

  // Immigration / Work Permit
  {
    keywords: ['work permit', 'visa', 'immigration', 'expat', 'foreign worker', 'nrn', 'non resident', 'foreigner work'],
    response: `**Work Permits & Immigration in Nepal**:

📋 **Who Needs a Work Permit?**
All foreign nationals working in Nepal (except Indian citizens under special treaties) must have a valid work permit.

**Process**:
1. Employer applies to the Dept. of Labour & Vocational Training
2. Company must justify why a Nepalese citizen cannot fill the role
3. Permit valid for **1 year**, renewable annually

🌏 **NRN (Non-Resident Nepali) Rights**:
- Can obtain NRN citizenship/ID card
- Right to purchase residential property (within limits)
- Full investment and repatriation rights

Our immigration team assists companies with foreign staff onboarding and NRN legal matters.

Type "book appointment" to speak with an immigration lawyer.`
  },

  // Arbitration
  {
    keywords: ['arbitration', 'mediation', 'dispute', 'commercial dispute', 'contract dispute', 'nepca', 'alternate dispute'],
    response: `**Arbitration & Dispute Resolution in Nepal**:

Nepal's **Arbitration Act, 2055** and the **NEPCA** (Nepal Council of Arbitration) govern commercial disputes.

⚖️ **Why Arbitration over Court?**
- **Faster**: Average 6–12 months vs. 3–7 years for court
- **Private**: No public record of the dispute
- **Final**: Arbitral awards are enforceable like court decrees

📋 **Our Arbitrators** are registered with NEPCA and have handled disputes in construction, banking, real estate, and IT sectors.

**International Arbitration**: Nepal is a signatory to the New York Convention — foreign arbitral awards are enforceable in Nepal.

Type "book appointment" to discuss your commercial dispute.`
  },

  // Appointment / booking triggers
  {
    keywords: ['book', 'appointment', 'consult', 'consultation', 'meet', 'schedule', 'talk to lawyer', 'speak to', 'hire', 'need help', 'contact'],
    response: '__BOOKING_START__'
  },

  // Contact / location
  {
    keywords: ['contact', 'phone', 'address', 'location', 'office', 'where are you', 'find you', 'reach you', 'email', 'whatsapp'],
    response: `**Lawyers In Nepal — Contact Information:**

📍 **Office**: Thamel, Kathmandu, Nepal
📞 **Phone/WhatsApp**: +977 9815861066
📧 **Email**: info@lawyersinnepal.com
🕐 **Hours**: Sunday–Friday, 9:00 AM – 6:00 PM (NPT)

You can also use the **WhatsApp button** below for instant messaging, or visit our Contact page on the website.

Is there a specific legal matter I can help you with today?`
  },

  // Fees / cost
  {
    keywords: ['fee', 'fees', 'cost', 'charge', 'price', 'how much', 'rate', 'expensive', 'affordable'],
    response: [
      `Our fees vary based on the complexity and type of legal matter. We offer:\n\n• **Free initial 15-minute consultation** via WhatsApp\n• Fixed fees for straightforward matters (company registration, trademark filing)\n• Hourly rates for litigation and complex corporate work\n\nWe are committed to providing affordable, transparent legal services in Kathmandu.\n\nWould you like to book a free consultation to discuss your specific case? Type "book appointment".`,
      `Legal fees depend on the type of service:\n\n• Company Registration: Starting from NPR 15,000\n• Trademark Filing: Starting from NPR 12,000\n• Divorce Cases: NPR 30,000–150,000 depending on complexity\n• Property Transactions: 1–2% of property value\n\nFor an accurate quote, please book a free consultation. Type "book appointment"!`
    ]
  },

  // Thank you
  {
    keywords: ['thank', 'thanks', 'thank you', 'helpful', 'great', 'perfect', 'awesome', 'excellent', 'good'],
    response: [
      'You\'re most welcome! 🙏 Is there anything else I can help you with?',
      'Happy to help! If you have any other legal questions, feel free to ask. Namaste! 🙏',
      'Glad I could assist! Remember, our lawyers are always available for a detailed consultation. Is there anything else you need?'
    ]
  },

  // Goodbye
  {
    keywords: ['bye', 'goodbye', 'see you', 'later', 'cya', 'take care', 'done', 'nothing else', 'that\'s all'],
    response: [
      'Goodbye! 🙏 Thank you for visiting Lawyers In Nepal. Feel free to return anytime you need legal assistance. Namaste!',
      'Take care! 🙏 If you ever need legal help in Nepal, we\'re just a WhatsApp message away. Namaste!'
    ]
  },

  // NGO / INGO
  {
    keywords: ['ngo', 'ingo', 'non profit', 'nonprofit', 'charity', 'social welfare', 'swc'],
    response: `**NGO & INGO Registration in Nepal**:

🏛️ **Local NGO** — Registered at the District Administration Office (DAO)
🌐 **INGO** — Must sign a General Agreement with the Social Welfare Council (SWC)

Key requirements:
- Minimum 7 founding members (for local NGOs)
- Detailed constitution and project plan
- INGOs must bring minimum USD 200,000/year in funding
- Annual SWC reporting + financial audit mandatory

Our team has helped dozens of development organizations get registered and stay compliant in Nepal.

Type "book appointment" to speak with our NGO specialists.`
  },
];

// ── Fallback responses ─────────────────────────────────────
const FALLBACKS = [
  `That's a great question! For specific legal advice on this matter, I'd recommend speaking directly with one of our advocates.\n\n📞 **WhatsApp**: +977 9815861066\n\nOr type **"book appointment"** and I'll help you schedule a consultation.`,
  `I may not have the exact answer for that specific situation, but our legal team certainly does. Type **"book appointment"** and one of our lawyers will get back to you within 24 hours.\n\n📞 **Direct line**: +977 9815861066`,
  `That's an important legal question. While I can provide general guidance, each case is unique and deserves personalized attention from a qualified advocate.\n\nWould you like to **book a consultation**? Our lawyers specialize in all areas of Nepalese law.`,
];

// ── Booking Flow Messages ──────────────────────────────────
export const BOOKING_PROMPTS = {
  start: `I'd be happy to help you schedule a consultation! 😊\n\nFirst, may I have your **full name** please?`,
  phone: (name: string) => `Thank you, ${name}! 📱\n\nWhat is the best **phone number** to reach you? (WhatsApp preferred)`,
  service: `Great! Which **legal service** do you need?\n\n${SERVICES.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nPlease type the number or name of the service.`,
  date: `Almost done! 📅\n\nWhat is your **preferred date and time** for the consultation?\n(e.g., "April 20, 2026 at 10 AM" or "Next Monday afternoon")`,
  confirm: (data: BookingData) =>
    `✅ **Please confirm your appointment details:**\n\n👤 Name: ${data.name}\n📞 Phone: ${data.phone}\n⚖️ Service: ${data.service}\n📅 Date: ${data.date}\n\nType **"confirm"** to submit, or **"cancel"** to start over.`,
  success: (data: BookingData) =>
    `🎉 **Your appointment request has been submitted!**\n\n👤 ${data.name}\n📞 ${data.phone}\n⚖️ ${data.service}\n📅 ${data.date}\n\nOur team will contact you within **2–4 hours** to confirm. You can also reach us directly:\n📱 WhatsApp: +977 9815861066\n\nThank you for choosing Lawyers In Nepal! Namaste 🙏`,
};

// ── Main Engine Function ───────────────────────────────────
export function processMessage(
  userInput: string,
  bookingState: BookingState,
  bookingData: BookingData
): {
  response: string;
  newBookingState: BookingState;
  newBookingData: BookingData;
  bookingComplete?: BookingData;
} {
  const text = userInput.trim().toLowerCase();
  let newData = { ...bookingData };

  // ── Handle active booking flow ──
  if (bookingState !== 'idle') {
    // Allow escape from booking
    if (['cancel', 'stop', 'exit', 'quit', 'nevermind', 'never mind'].some(k => text.includes(k))) {
      return {
        response: 'No problem! Your booking has been cancelled. How else can I assist you?',
        newBookingState: 'idle',
        newBookingData: {},
      };
    }

    if (bookingState === 'name') {
      newData.name = userInput.trim();
      return {
        response: BOOKING_PROMPTS.phone(newData.name!),
        newBookingState: 'phone',
        newBookingData: newData,
      };
    }

    if (bookingState === 'phone') {
      // Basic phone validation
      const cleaned = userInput.replace(/\s+/g, '').replace(/[^0-9+]/g, '');
      if (cleaned.length < 7) {
        return {
          response: 'That doesn\'t look like a valid phone number. Please enter your phone number (e.g., +977 9815861066):',
          newBookingState: 'phone',
          newBookingData: newData,
        };
      }
      newData.phone = userInput.trim();
      return {
        response: BOOKING_PROMPTS.service,
        newBookingState: 'service',
        newBookingData: newData,
      };
    }

    if (bookingState === 'service') {
      // Match service by number or name
      const num = parseInt(text);
      if (!isNaN(num) && num >= 1 && num <= SERVICES.length) {
        newData.service = SERVICES[num - 1];
      } else {
        const matched = SERVICES.find(s => text.includes(s.toLowerCase().split(' ')[0]));
        newData.service = matched || userInput.trim();
      }
      return {
        response: BOOKING_PROMPTS.date,
        newBookingState: 'date',
        newBookingData: newData,
      };
    }

    if (bookingState === 'date') {
      newData.date = userInput.trim();
      return {
        response: BOOKING_PROMPTS.confirm(newData),
        newBookingState: 'confirm',
        newBookingData: newData,
      };
    }

    if (bookingState === 'confirm') {
      if (text.includes('confirm') || text.includes('yes') || text.includes('ok') || text.includes('sure')) {
        return {
          response: BOOKING_PROMPTS.success(newData),
          newBookingState: 'idle',
          newBookingData: {},
          bookingComplete: newData,
        };
      } else {
        return {
          response: 'Please type **"confirm"** to submit your appointment, or **"cancel"** to start over.',
          newBookingState: 'confirm',
          newBookingData: newData,
        };
      }
    }
  }

  // ── Intent matching (idle state) ──
  for (const intent of INTENTS) {
    const matched = intent.keywords.some(kw => text.includes(kw));
    if (matched) {
      const resp = pick(intent.response);
      if (resp === '__BOOKING_START__') {
        return {
          response: BOOKING_PROMPTS.start,
          newBookingState: 'name',
          newBookingData: {},
        };
      }
      return {
        response: resp,
        newBookingState: 'idle',
        newBookingData: {},
      };
    }
  }

  // ── Fallback ──
  return {
    response: pick(FALLBACKS),
    newBookingState: 'idle',
    newBookingData: {},
  };
}
