export const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://lawyerinnepal.com.np';

export const SITE_NAME = 'LawyerInNepal';
export const SITE_EMAIL = 'lawyerinnepal.com.np@gmail.com';
export const SITE_PHONE = '+977 9766910908';
export const SITE_ADDRESS = {
  streetAddress: 'Purbi Gate, Anamnagar-29',
  addressLocality: 'Kathmandu',
  postalCode: '44600',
  addressCountry: 'NP',
};

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}

export const defaultOgImage = {
  url: absoluteUrl('/opengraph-image'),
  width: 1200,
  height: 630,
  alt: 'LawyerInNepal legal services in Kathmandu, Nepal',
};

export const lawKeywordCluster = [
  'best law firm in Nepal',
  'best law firm in Kathmandu',
  'lawyer in Nepal',
  'lawyers in Kathmandu',
  'legal services in Nepal',
  'divorce lawyer in Nepal',
  'criminal defense lawyer Kathmandu',
  'company registration lawyer Nepal',
  'corporate lawyer in Nepal',
  'property dispute lawyer Kathmandu',
  'FDI lawyer Nepal',
  'court marriage lawyer Kathmandu',
  'Supreme Court advocate Nepal',
];

export function legalServiceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'LocalBusiness'],
    '@id': absoluteUrl('/#legal-service'),
    name: SITE_NAME,
    alternateName: 'Lawyer in Nepal',
    description:
      'Kathmandu law firm advising individuals, families, and businesses on litigation, corporate, family, property, criminal, and foreign investment matters in Nepal.',
    url: SITE_URL,
    image: defaultOgImage.url,
    logo: absoluteUrl('/logo.svg'),
    telephone: SITE_PHONE,
    email: SITE_EMAIL,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      ...SITE_ADDRESS,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 27.6983928,
      longitude: 85.3286204,
    },
    areaServed: [
      { '@type': 'Country', name: 'Nepal' },
      { '@type': 'City', name: 'Kathmandu' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '17:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/lawyerinnepal',
      'https://www.linkedin.com/company/lawyerinnepal',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Legal Services in Nepal',
      itemListElement: [
        'Criminal Defense Litigation',
        'Corporate Law and Company Registration',
        'Family Law and Divorce Proceedings',
        'Property and Civil Disputes',
        'Foreign Direct Investment Legal Support',
        'Supreme Court Advocacy',
      ].map((name) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name,
          areaServed: 'Nepal',
          provider: { '@id': absoluteUrl('/#legal-service') },
        },
      })),
    },
  };
}
