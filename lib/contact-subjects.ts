/** Values shown in the contact form subject dropdown. */
export const CONTACT_FORM_SUBJECTS = [
  'General Inquiry',
  'AI Tool Listing',
  'Featured Placement',
  'Sponsored Article',
  'Product Review / Feature',
  'Sponsored Tutorial',
  'Newsletter Sponsorship',
  'Custom Partnership',
  'Advertising & Sponsorship',
  'Pricing Request',
  'Tool Submission',
  'Partnership',
  'Content Collaboration',
  'Technical Support',
] as const;

export type ContactFormSubject = (typeof CONTACT_FORM_SUBJECTS)[number];

const subjectSet = new Set<string>(
  CONTACT_FORM_SUBJECTS.map((s) => s.toLowerCase())
);

/** Normalize advertise CTAs and ?subject= query values to a dropdown option. */
export function resolveContactSubjectFromQuery(
  raw: string | null | undefined
): ContactFormSubject | '' {
  if (!raw?.trim()) return '';

  const decoded = decodeURIComponent(raw.trim());

  const exact = CONTACT_FORM_SUBJECTS.find(
    (s) => s.toLowerCase() === decoded.toLowerCase()
  );
  if (exact) return exact;

  const aliases: Record<string, ContactFormSubject> = {
    'ai tool listing': 'AI Tool Listing',
    'featured placement': 'Featured Placement',
    'sponsored article': 'Sponsored Article',
    'product feature': 'Product Review / Feature',
    'product review / feature': 'Product Review / Feature',
    'sponsored tutorial': 'Sponsored Tutorial',
    'newsletter sponsorship': 'Newsletter Sponsorship',
    'custom partnership': 'Custom Partnership',
    sponsorship: 'Advertising & Sponsorship',
    'advertising conversation': 'Advertising & Sponsorship',
    'pricing request': 'Pricing Request',
    advertising: 'Advertising & Sponsorship',
  };

  const alias = aliases[decoded.toLowerCase()];
  if (alias) return alias;

  if (subjectSet.has(decoded.toLowerCase())) {
    return decoded as ContactFormSubject;
  }

  return '';
}

export function contactHrefWithSubject(subject: ContactFormSubject | string): string {
  const resolved = resolveContactSubjectFromQuery(subject);
  if (!resolved) return '/contact';
  return `/contact?subject=${encodeURIComponent(resolved)}`;
}
