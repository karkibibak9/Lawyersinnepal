export interface Attorney {
  slug: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  longDescription?: string;
  education: string;
  email: string;
  phone: string;
  image: string;
  location?: string;
  services?: string[];
  expertise?: string[];
}

export const attorneys: Attorney[] = [
  {
    slug: 'gaurab-dangi',
    name: 'Advocate Gaurab Dangi',
    role: 'Senior Criminal Defence Attorney',
    specialty: 'Criminal Litigation & Cybercrime',
    bio: 'Advocate Gaurab Dangi is a preeminent criminal defense attorney in Nepal, renowned for his strategic litigation and unwavering commitment to safeguarding his clients\' rights.',
    longDescription: `
      Navigating criminal allegations requires the expertise of a seasoned legal advocate who understands the complexities of the Nepalese judicial system. Advocate Gaurab Dangi is a preeminent criminal defense attorney in Nepal, renowned for his strategic litigation and unwavering commitment to safeguarding his clients' rights, reputations, and futures.

      With over seven years of specialized practice, Advocate Dangi possesses a profound mastery of the Muluki Criminal Code (2017) and the procedural nuances of Nepal’s legal framework. He provides reliable, confidential, and result-oriented counsel for individuals at every stage of the legal process—from initial investigation and arrest to courtroom trial and final appeals.

      ### Comprehensive Criminal Defence Services
      As a trusted legal voice in Kathmandu, Advocate Dangi offers extensive representation across various criminal matters:
      
      *   **White-Collar & Financial Crimes**: Expert handling of fraud, embezzlement, and financial litigation.
      *   **Cybercrime & Digital Offences**: Specialized defence against electronic transaction violations and online fraud.
      *   **Serious Offences & Homicide**: Dedicated representation for assault, bodily injury, and high-stakes criminal trials.
      *   **Narcotics & Drug Offences**: Legal guidance for possession, trafficking, and related charges.
      *   **Domestic Matters**: Compassionate and firm handling of domestic violence and sexual offence cases.

      ### Strategic Legal Intervention
      A professional criminal defence ensures your rights are protected during police interrogations, remand hearings, and court proceedings. Advocate Dangi works closely with clients to build robust defence strategies, handling bail applications and representation in District Courts, High Courts, and the Supreme Court of Nepal.
    `,
    education: 'LL.B. from Tribhuvan University, Certified Criminal Procedure Expert',
    email: 'lawfirmnepal01@gmail.com',
    phone: '+977 9864423830',
    location: 'Purbi Gate, Anamnagar-29, Kathmandu 44600, Nepal',
    image: '/Gaurabdai.webp',
    services: [
      'Criminal Defence Representation',
      'Police Investigation Support',
      'Bail & Detention Matters',
      'Appeals & Revision Cases',
      'Supreme Court Litigation'
    ],
    expertise: [
      'Muluki Criminal Code, 2017',
      'Criminal Procedure Code, 2017',
      'Evidence Act of Nepal',
      'Electronic Transaction Act'
    ]
  },
  {
    slug: 'kapil-prasad-bhat',
    name: 'Advocate Kapil Prasad Bhat',
    role: 'Senior Legal & Procurement Adviser',
    specialty: 'Corporate Advisory & Public Procurement',
    bio: 'Advocate Kapil Prasad Bhat is a distinguished Legal Adviser to several prominent corporations and organizations. He specializes in the complexities of public procurement law and the resolution of intricate legal disputes.',
    longDescription: `
      Advocate Kapil Prasad Bhat is a highly respected legal consultant in Nepal, serving as a Senior Legal Adviser to numerous leading companies and organizations across the nation. With extensive experience in corporate governance and regulatory compliance, he is a trusted voice in the Nepalese legal community.

      ### Specialized Expertise in Procurement & Disputes
      Advocate Bhat is particularly renowned for his expertise in:
      
      *   **Public Procurement Advisory**: Guiding companies through the intricate rules and regulations of government contracts and tender processes in Nepal.
      *   **Legal Dispute Resolution**: Expert handling of commercial and civil disputes, ensuring effective representation and strategic settlement outcomes.
      *   **Corporate Legal Strategy**: Providing profound legal counsel to boards of directors and executive teams on complex business matters.
      *   **Regulatory Compliance**: Ensuring business operations align with the latest legal frameworks and government directives.

      ### Professional Engagement
      His career is marked by a commitment to excellence and a deep understanding of the intersection between law and business. Advocate Bhat’s personalized approach to legal advisory has made him a preferred choice for companies seeking reliable and profound legal support.
    `,
    education: 'LL.B. from Tribhuvan University, Expert in Public Procurement Law',
    email: 'lawyersinnepal.com.np@gmail.com',
    phone: '+977 9851206582',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=500',
    location: 'Purbi Gate, Anamnagar-29, Kathmandu 44600, Nepal',
    services: [
      'Corporate Legal Advisory',
      'Public Procurement Advisory',
      'Legal Dispute Resolution',
      'Commercial Contract Handling',
      'Regulatory Compliance Support'
    ],
    expertise: [
      'Public Procurement Act of Nepal',
      'Company Act, 2063',
      'Commercial Law & Contracts',
      'Arbitration & Mediation'
    ]
  }
];
