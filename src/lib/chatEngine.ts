// ============================================================
// Lawyers In Nepal – Rule-Based Legal Chat Engine
// No external AI API required. Fully offline-capable.
// ============================================================

export type ChatRole = 'user' | 'assistant';
export interface ChatMessage { role: ChatRole; content: string; }

export type BookingState = 'idle' | 'name' | 'phone' | 'service' | 'date' | 'confirm';
export interface BookingData {
  name?: string;
  phone?: string;
  service?: string;
  date?: string;
}

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

function pick(r: string | string[]): string {
  if (Array.isArray(r)) return r[Math.floor(Math.random() * r.length)];
  return r;
}

const INTENTS: Intent[] = [
  {
    keywords: ['hello', 'hi', 'hey', 'namaste', 'good morning', 'good afternoon', 'good evening', 'howdy', 'sup', 'greetings', 'hola'],
    response: [
      'Namaste! 🙏 Welcome to Lawyers In Nepal. How can I help you today?',
      'Hello! I\'m the Lawyers In Nepal assistant. Whether it\'s a corporate matter or a personal legal issue — I\'m here to help. What can I do for you?',
      'Namaste! 🙏 Great to have you here. I can answer legal questions or help you book a consultation. What do you need?',
    ]
  },
  {
    keywords: ['how are you', 'how r you', 'how do you do', 'how\'s it going', 'hows it going', 'you good', 'are you okay', 'how are u'],
    response: [
      'I\'m doing great, thank you for asking! 😊 Always ready to help with legal questions. What can I assist you with today?',
      'Fantastic, thanks for asking! I\'m here and ready to help. Do you have a legal question or would you like to book a consultation?',
      'All good! 🙏 I spend my days helping people navigate Nepalese law. How can I help you?',
    ]
  },
  {
    keywords: ['who are you', 'what are you', 'tell me about yourself', 'introduce yourself', 'your name', 'are you a bot', 'are you ai', 'are you human', 'are you real'],
    response: [
      'I\'m the virtual legal assistant for **Lawyers In Nepal** 🤖⚖️\n\nI\'m powered by a legal knowledge engine trained on Nepalese law — including the Muluki Civil Code, Labor Act 2074, FITTA, and more.\n\nI can:\n• Answer your legal questions in plain language\n• Guide you through legal procedures in Nepal\n• Help you book a consultation with our expert lawyers\n\nWhat would you like to know?',
      'I\'m the AI legal assistant for **Lawyers In Nepal**, a premier law firm in Kathmandu. I\'m not a human lawyer, but I\'m trained on Nepalese legal procedures and can give you accurate general guidance.\n\nHow can I help you today?',
    ]
  },
  {
    keywords: ['what can you do', 'what do you know', 'how can you help', 'capabilities', 'what topics'],
    response: 'I can help you with a wide range of topics!\n\n⚖️ **Legal Questions** — Divorce, criminal law, property, business, immigration\n📋 **Procedures** — Company registration, trademark filing, and more\n💰 **Fee Estimates** — General cost ranges for services in Nepal\n📅 **Appointments** — I can book a consultation with our lawyers\n📍 **Firm Info** — Contact details, office location, practice areas\n\nJust ask me anything! If I don\'t know, I\'ll connect you with a real lawyer. 🙏'
  },
  {
    keywords: ['services', 'what do you offer', 'practice areas', 'areas of law', 'specialization', 'offer'],
    response: 'We offer a comprehensive range of legal services in Kathmandu:\n\n⚖️ **Corporate & Business Law** — Company registration, FDI (FITTA), branch offices, liquidation\n👨‍👩‍👧 **Family Law** — Divorce, child custody, marriage registration, inheritance\n🏠 **Property Law** — Land purchase, title verification, Malpot office procedures\n🔒 **Criminal Defense** — Arrest rights, bail, trial representation\n📋 **Labor & Employment** — Labor Act compliance, SSF registration, work permits\n💡 **Intellectual Property** — Trademark, copyright, patent registration\n🌐 **Immigration** — Work permits, NRN rights, foreign visas\n🤝 **Arbitration & Disputes** — Commercial dispute resolution, cheque bounce, mediation\n\nWhich area can I assist you with today?'
  },
  {
    keywords: ['divorce', 'separation', 'alimony', 'custody', 'child custody', 'matrimonial', 'marriage break'],
    response: '**Divorce Law in Nepal** is governed by the Muluki Civil Code, 2074.\n\nKey points:\n• Either spouse can file for divorce — mutual consent or contested\n• **Alimony** is calculated based on assets and duration of marriage\n• **Child custody** defaults to the mother for children under 5; older children\'s preference is considered\n• Property acquired during marriage is generally split 50/50\n• The process takes **2–6 months** at the District Court in Kathmandu\n\nOur family law team handles divorce cases with sensitivity and discretion.\n\nWould you like to **book a free consultation** with our divorce lawyers? Just say "book appointment".'
  },
  {
    keywords: ['criminal', 'arrest', 'bail', 'fir', 'police', 'murder', 'fraud', 'theft', 'cheque bounce', 'accused', 'prison', 'jail', 'offense', 'crime', 'defense'],
    response: '**Criminal Defense at Lawyers In Nepal:**\n\nYour fundamental rights under the Muluki Criminal Code:\n• Right to know charges within **24 hours** of arrest\n• Right to an advocate from the moment of arrest\n• Right to **bail** (for bailable offenses) — typically NPR 10,000–500,000 depending on severity\n• Right to a fair and speedy trial\n\n**Cheque Bounce Cases**: We can file under the Negotiable Instruments Act or the Banking Offense Act for criminal penalties + 25% interest.\n\nOur criminal defense lawyers have represented clients across Kathmandu\'s district courts and the Supreme Court.\n\nType "book appointment" to speak with a criminal lawyer today.'
  },
  {
    keywords: ['property', 'land', 'house', 'real estate', 'lal purja', 'malpot', 'buy land', 'sell land', 'title', 'deed'],
    response: '**Property Law in Nepal** — Key Facts:\n\n🔍 **Before buying**, always verify:\n  - Lal Purja (Ownership Certificate) authenticity\n  - Malpot Office records for existing mortgages\n  - Napi (Survey) boundary confirmation\n\n📝 **Registration (The "Pass")**:\n  - Sale Deed drafted by a lawyer\n  - Registration tax paid at Malpot Office\n  - New Lal Purja issued in buyer\'s name\n\n⚠️ **Foreign nationals** generally cannot own land, but NRNs with a valid ID Card can purchase residential property within limits.\n\nReady to verify a property? Type "book appointment".'
  },
  {
    keywords: ['company', 'business', 'startup', 'pvt ltd', 'private limited', 'ocr', 'company registrar', 'incorporate', 'open business'],
    response: '**Company Registration in Nepal** — Process Overview:\n\n**For Nepalese Companies (Pvt. Ltd.):**\n1. Reserve company name at OCR online portal\n2. Draft AOA/MOA (Articles & Memorandum of Association)\n3. Submit with citizenship copies of all directors\n4. Obtain Company Registration Certificate\n5. Register for PAN/VAT at the Inland Revenue Office\n\n**Time**: ~3–7 working days | **Min. Capital**: No minimum for local companies\n\n**For Foreign Companies (FITTA)**:\n- Min. investment: NPR 20 Million (~USD 150,000)\n- Approval through Department of Industries\n- Full profit repatriation rights after tax\n\nType "book appointment" to get started!'
  },
  {
    keywords: ['foreign investment', 'fitta', 'fdi', 'invest in nepal', 'foreign company', 'international investor'],
    response: '**Foreign Investment in Nepal (FITTA 2075)**:\n\n✅ Minimum investment: **NPR 20 Million** (~USD 150,000)\n✅ Full repatriation of profits in foreign currency (after tax)\n✅ 100% foreign ownership allowed in most sectors\n\n❌ Restricted sectors: Agriculture, cottage industry, retail, real estate speculation\n\n**Process**:\n1. Apply to Dept. of Industries with project report\n2. Get FDI approval + company registration at OCR\n3. PAN/VAT registration\n4. Open a corporate bank account\n\nWould you like a consultation? Type "book appointment".'
  },
  {
    keywords: ['trademark', 'brand', 'logo', 'intellectual property', 'copyright', 'patent', 'protect brand', 'brand name'],
    response: '**Intellectual Property Protection in Nepal**:\n\n📌 **Trademark Registration**:\n- Filed at the Department of Industry (DOI)\n- Valid for **7 years**, renewable indefinitely\n- Covers: Logos, brand names, slogans, packaging\n- Processing time: **3–6 months**\n\n📌 **Copyright**:\n- Automatic protection upon creation\n- Voluntary registration at Copyright Registrar\'s Office\n- Lifetime of author + 50 years protection\n\n📌 **Patent**:\n- Filed with the Department of Industry\n- Valid for 7 years with renewable options\n\nType "book appointment" to protect your brand today!'
  },
  {
    keywords: ['labor', 'labour', 'employee', 'employer', 'ssf', 'social security', 'work contract', 'termination', 'fired', 'gratuity', 'employment'],
    response: '**Nepal Labor Act 2074 — Key Highlights**:\n\n👷 **Employee Rights**:\n- Mandatory SSF contribution: **31%** of basic salary (20% employer + 11% employee)\n- Minimum 1 month notice for termination (or salary in lieu)\n- Gratuity: 8.33% of annual basic salary per year of service\n- 18 days annual leave + 13 public holidays\n\n⚠️ **Employers** must register all staff with the SSF within 30 days of hiring.\n\nType "book appointment" to consult our labor lawyers.'
  },
  {
    keywords: ['work permit', 'visa', 'immigration', 'expat', 'foreign worker', 'nrn', 'non resident', 'working in nepal'],
    response: '**Work Permits & Immigration in Nepal**:\n\n📋 **Who Needs a Work Permit?**\nAll foreign nationals working in Nepal (except Indian citizens under special treaties) must have a valid work permit.\n\n**Process**:\n1. Employer applies to the Dept. of Labour & Vocational Training\n2. Company must justify why a Nepalese citizen cannot fill the role\n3. Permit valid for **1 year**, renewable annually\n\n🌏 **NRN Rights**: Can obtain NRN citizenship/ID card, purchase residential property, and repatriate investments.\n\nType "book appointment" to speak with an immigration lawyer.'
  },
  {
    keywords: ['arbitration', 'mediation', 'dispute', 'commercial dispute', 'contract dispute', 'nepca', 'conflict resolution'],
    response: '**Arbitration & Dispute Resolution in Nepal**:\n\n⚖️ **Why Arbitration over Court?**\n- **Faster**: Average 6–12 months vs. 3–7 years for court\n- **Private**: No public record of the dispute\n- **Final**: Arbitral awards are enforceable like court decrees\n\n📋 Our Arbitrators are registered with **NEPCA** and have handled disputes in construction, banking, real estate, and IT sectors.\n\n**International Arbitration**: Nepal is a signatory to the New York Convention — foreign arbitral awards are enforceable.\n\nType "book appointment" to discuss your dispute.'
  },
  {
    keywords: ['book', 'appointment', 'consult', 'consultation', 'meet', 'schedule', 'talk to lawyer', 'speak to lawyer', 'hire', 'need help', 'get help', 'legal help', 'need a lawyer', 'find a lawyer', 'i want to'],
    response: '__BOOKING_START__'
  },
  {
    keywords: ['contact', 'phone', 'address', 'location', 'office', 'where are you', 'find you', 'reach you', 'email', 'whatsapp', 'call you', 'thamel', 'kathmandu'],
    response: '**Lawyers In Nepal — Contact Information:**\n\n📍 **Office**: Thamel, Kathmandu, Nepal\n📞 **Phone/WhatsApp**: +977 9815861066\n📧 **Email**: info@lawyersinnepal.com\n🕐 **Hours**: Sunday–Friday, 9:00 AM – 6:00 PM (NPT)\n\nYou can also use the **WhatsApp button** below for instant messaging.\n\nIs there a specific legal matter I can help you with today?'
  },
  {
    keywords: ['fee', 'fees', 'cost', 'charge', 'price', 'how much', 'rate', 'expensive', 'affordable', 'payment'],
    response: [
      'Our fees vary based on the complexity and type of legal matter. We offer:\n\n• **Free initial 15-minute consultation** via WhatsApp\n• Fixed fees for straightforward matters (company registration, trademark filing)\n• Hourly rates for litigation and complex corporate work\n\nWould you like to book a free consultation? Type "book appointment".',
      'Legal fees depend on the type of service:\n\n• Company Registration: Starting from NPR 15,000\n• Trademark Filing: Starting from NPR 12,000\n• Divorce Cases: NPR 30,000–150,000 depending on complexity\n• Property Transactions: 1–2% of property value\n\nFor an accurate quote, type "book appointment"!',
    ]
  },
  {
    keywords: ['ngo', 'ingo', 'non profit', 'nonprofit', 'charity', 'social welfare', 'swc', 'foundation'],
    response: '**NGO & INGO Registration in Nepal**:\n\n🏛️ **Local NGO** — Registered at the District Administration Office (DAO)\n🌐 **INGO** — Must sign a General Agreement with the Social Welfare Council (SWC)\n\nKey requirements:\n- Minimum 7 founding members (for local NGOs)\n- Detailed constitution and project plan\n- INGOs must bring minimum USD 200,000/year in funding\n- Annual SWC reporting + financial audit mandatory\n\nType "book appointment" to speak with our NGO specialists.'
  },
  {
    keywords: ['thank', 'thanks', 'thank you', 'helpful', 'perfect', 'awesome', 'excellent', 'amazing', 'brilliant', 'wonderful'],
    response: [
      'You\'re most welcome! 🙏 Is there anything else I can help you with?',
      'Happy to help! If you have any other legal questions, feel free to ask. Namaste! 🙏',
      'Glad I could assist! Remember, our lawyers are always available for a detailed consultation. Anything else you need?',
    ]
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'cya', 'take care', 'done', 'nothing else', 'that\'s all', 'all good'],
    response: [
      'Goodbye! 🙏 Thank you for visiting Lawyers In Nepal. Feel free to return anytime. Namaste!',
      'Take care! 🙏 If you ever need legal help in Nepal, we\'re just a WhatsApp message away. Namaste!',
    ]
  },
  {
    keywords: ['joke', 'funny', 'make me laugh', 'humor', 'humour'],
    response: [
      'Ha! 😄 Why did the lawyer bring a ladder to court?\n\nBecause the case was going to a **higher court**! ⚖️\n\nAnyway, how can I help you with something legal today? 🙏',
      'Here\'s one: A client asks his lawyer, "How much to answer three questions?"\nLawyer: "NPR 5,000."\nClient: "Isn\'t that expensive?"\nLawyer: "Yes. What\'s your third question?" 😄\n\nNow, what legal matter can I help you with today?',
    ]
  },
  {
    keywords: ['urgent', 'emergency', 'asap', 'immediately', 'right now', 'help me now', 'crisis', 'arrested', 'detained'],
    response: '**🚨 Urgent Legal Assistance:**\n\nFor immediate legal emergencies, please contact us directly:\n\n📞 **WhatsApp (Fastest)**: +977 9815861066\n📞 **Direct Call**: +977 9815861066\n\nOur team is available during office hours (Sun–Fri, 9AM–6PM NPT). For after-hours emergencies, WhatsApp is monitored.\n\nIf someone has been **arrested**, they have the right to:\n• Call a lawyer immediately\n• Know the charges within 24 hours\n• Request bail for bailable offenses\n\nPlease reach us via WhatsApp right now.'
  },
  {
    keywords: ['ok', 'okay', 'understood', 'i see', 'got it', 'i understand', 'noted', 'alright'],
    response: [
      'Great! 😊 Is there anything else you\'d like to know about Nepalese law?',
      'Perfect! Let me know if you have any other questions. I\'m here to help! 🙏',
      'Noted! Feel free to ask anything about our legal services. What else can I help you with?',
    ]
  },
];

const FALLBACKS = [
  'I might not have a specific answer for that, but I can definitely connect you with an expert! 😊\n\nOur lawyers cover all areas of Nepalese law. You can:\n• Type **"book appointment"** to schedule a consultation\n• WhatsApp us at **+977 9815861066** for immediate help\n\nWhat else can I help you with?',
  'That\'s a bit outside my knowledge, but our legal team in Kathmandu would know exactly! 🏛️\n\nType **"book appointment"** and one of our advocates will get back to you within 24 hours.\n\nOr ask me about: divorce, company registration, property law, criminal defense, trademark, or immigration.',
  'Hmm, I\'m not sure about that specific topic. I\'m best at answering Nepalese legal questions! 🙏\n\nTry asking me about:\n• "How do I register a company in Nepal?"\n• "What are divorce procedures in Nepal?"\n• "How do I get a work permit?"\n\nOr type **"book appointment"** to speak with a real lawyer.',
];

export const BOOKING_PROMPTS = {
  start: 'I\'d be happy to help you schedule a consultation! 😊\n\nFirst, may I have your **full name** please?',
  phone: (name: string) => `Thank you, ${name}! 📱\n\nWhat is the best **phone number** to reach you? (WhatsApp preferred)`,
  service: `Great! Which **legal service** do you need?\n\n${SERVICES.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nPlease type the number or name of the service.`,
  date: 'Almost done! 📅\n\nWhat is your **preferred date and time** for the consultation?\n(e.g., "April 20, 2026 at 10 AM" or "Next Monday afternoon")',
  confirm: (data: BookingData) =>
    `✅ **Please confirm your appointment details:**\n\n👤 Name: ${data.name}\n📞 Phone: ${data.phone}\n⚖️ Service: ${data.service}\n📅 Date: ${data.date}\n\nType **"confirm"** to submit, or **"cancel"** to start over.`,
  success: (data: BookingData) =>
    `🎉 **Your appointment request has been submitted!**\n\n👤 ${data.name}\n📞 ${data.phone}\n⚖️ ${data.service}\n📅 ${data.date}\n\nOur team will contact you within **2–4 hours** to confirm.\n📱 WhatsApp: +977 9815861066\n\nThank you for choosing Lawyers In Nepal! Namaste 🙏`,
};

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
  const newData = { ...bookingData };

  // ── Active booking flow ──
  if (bookingState !== 'idle') {
    if (['cancel', 'stop', 'exit', 'quit', 'nevermind', 'never mind'].some(k => text.includes(k))) {
      return { response: 'No problem! Your booking has been cancelled. How else can I assist you?', newBookingState: 'idle', newBookingData: {} };
    }

    if (bookingState === 'name') {
      newData.name = userInput.trim();
      return { response: BOOKING_PROMPTS.phone(newData.name!), newBookingState: 'phone', newBookingData: newData };
    }

    if (bookingState === 'phone') {
      const cleaned = userInput.replace(/\s+/g, '').replace(/[^0-9+]/g, '');
      if (cleaned.length < 7) {
        return { response: 'That doesn\'t look like a valid phone number. Please enter your phone number (e.g., +977 9815861066):', newBookingState: 'phone', newBookingData: newData };
      }
      newData.phone = userInput.trim();
      return { response: BOOKING_PROMPTS.service, newBookingState: 'service', newBookingData: newData };
    }

    if (bookingState === 'service') {
      const num = parseInt(text);
      if (!isNaN(num) && num >= 1 && num <= SERVICES.length) {
        newData.service = SERVICES[num - 1];
      } else {
        const matched = SERVICES.find(s => text.includes(s.toLowerCase().split(' ')[0]));
        newData.service = matched || userInput.trim();
      }
      return { response: BOOKING_PROMPTS.date, newBookingState: 'date', newBookingData: newData };
    }

    if (bookingState === 'date') {
      newData.date = userInput.trim();
      return { response: BOOKING_PROMPTS.confirm(newData), newBookingState: 'confirm', newBookingData: newData };
    }

    if (bookingState === 'confirm') {
      if (text.includes('confirm') || text.includes('yes') || text.includes('ok') || text.includes('sure')) {
        return { response: BOOKING_PROMPTS.success(newData), newBookingState: 'idle', newBookingData: {}, bookingComplete: newData };
      }
      return { response: 'Please type **"confirm"** to submit your appointment, or **"cancel"** to start over.', newBookingState: 'confirm', newBookingData: newData };
    }
  }

  // ── Intent matching ──
  for (const intent of INTENTS) {
    const matched = intent.keywords.some(kw => text.includes(kw));
    if (matched) {
      const resp = pick(intent.response);
      if (resp === '__BOOKING_START__') {
        return { response: BOOKING_PROMPTS.start, newBookingState: 'name', newBookingData: {} };
      }
      return { response: resp, newBookingState: 'idle', newBookingData: {} };
    }
  }

  return { response: pick(FALLBACKS), newBookingState: 'idle', newBookingData: {} };
}
