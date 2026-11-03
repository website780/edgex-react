// Single source of truth for all site content. Edit here, rebuild, done.

export const SITE = {
  name: 'EdgeX Learning',
  url: 'https://edgex-learning.com',
  tagline: 'Redefining Excellence',
  email: 'edex@gmail.com', // NOTE: copied from the current site – confirm this is the real address
  whatsapp: '919820088974',
  // Fees are identical (₹57,000) on every course page of the old site, which looks like template filler.
  // Set to true once real fees are confirmed and add `fee` to each course below.
  showFees: false,
  // The 4 testimonials on the old site were template filler text. Shown trimmed; replace with real ones.
  showTestimonials: true,
};

export const CENTRES = [
  {
    name: 'Borivali',
    address: ['2nd Floor, Siddharth Arcade', 'Opposite Manubhai Jewellers', 'Borivali, Mumbai'],
    phone: '+91 98200 88974',
    tel: '+919820088974',
  },
  {
    name: 'Andheri',
    address: ['901, Crescent Plaza, Teli Gali', 'Andheri East, Mumbai'],
    phone: '+91 85910 21923',
    tel: '+918591021923',
  },
];

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  {
    label: 'Courses',
    href: '#',
    children: [
      { label: '11th – 12th Commerce', href: '/11th-12th-commerce/', note: 'Foundation' },
      { label: 'Chartered Accountancy', href: '/ca/', note: 'Foundation · Inter · Final' },
      { label: 'ACCA', href: '/acca/', note: 'Global qualification' },
      { label: 'CFA', href: '/cfa/', note: 'Level 1 · 2 · 3' },
    ],
  },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact/' },
];

export const FACULTY = [
  { name: 'CA/CS Nihal Bhatt', role: 'Founder, EdgeX Learning', creds: 'CA · CS', img: '/img/nihal.png', featured: true },
  { name: 'CA Shashi Singh', role: 'Income Tax', creds: 'CA', img: '/img/shashi.png' },
  { name: 'CA/CS Nimeet Piti', role: 'Costing', creds: 'CA · CS', img: '/img/nimeet.png' },
  { name: 'CA Dharmesh Sampat', role: 'Audit & Financial Management', creds: 'CA', img: '/img/dharmesh.png' },
  { name: 'Jignesh Chedda', role: 'Strategic Management', creds: 'MCA', img: '/img/jignesh.png' },
  { name: 'CA Paresh Dalal', role: 'Accounts', creds: 'CA', img: '/img/paresh.png' },
  { name: 'Rohit Shroff', role: 'Faculty, EdgeX Learning', creds: 'CA', img: '/img/rohit.png' },
  { name: 'Neeraj Sharma', role: 'Faculty, EdgeX Learning', creds: 'CA', img: '/img/neeraj.png' },
];

export type Course = {
  slug: string;
  href: string;
  no: string;
  tag: string;
  short: string; // card title
  title: string; // page h1
  hook: string;
  sub: string;
  intro: string;
  cardBlurb: string;
  photo: string;
  stages: { t: string; d: string }[];
  metaTitle: string;
  metaDesc: string;
  listTitle: string;
  list: string[];
  pillarsTitle: string;
  pillars: string[];
};

export const COURSES: Course[] = [
  {
    slug: '11th-12th-commerce',
    href: '/11th-12th-commerce/',
    no: '01',
    tag: 'Foundation',
    short: '11th & 12th Commerce',
    title: 'Commerce Classes in Mumbai for 11th & 12th Students',
    hook: 'Build the right foundation from day one.',
    sub: 'These two years shape board performance, study habits and future professional choices.',
    intro:
      'The concepts and habits developed in 11th directly influence what follows. EdgeX Learning helps students begin correctly, stay consistent and understand where commerce can take them.',
    cardBlurb: 'A strong start for boards and future professional pathways.',
    photo: '/img/stock/commerce.jpg',
    stages: [
      { t: '11th Commerce', d: 'Build the accounting and business foundation the right way.' },
      { t: '12th Commerce', d: 'Deepen concepts with board-focused practice.' },
      { t: 'Board exams', d: 'Revision, mock tests and exam readiness.' },
      { t: 'Your next step', d: 'CA, ACCA, CFA or management: choose with clarity.' },
    ],
    metaTitle: '11th & 12th Commerce Classes in Mumbai | EdgeX Learning',
    metaDesc:
      'Join EdgeX Learning’s 11th and 12th Commerce classes in Mumbai. Structured lessons, doubt support and board exam-focused practice to build strong foundations.',
    listTitle: 'Is this the right programme for you?',
    list: [
      'Students beginning commerce and wanting the right guidance from day one.',
      'Students considering CA, ACCA, finance or management.',
      'Learners who need a structured plan rather than irregular self-study.',
      'Parents seeking an experienced academic environment.',
    ],
    pillarsTitle: 'More than syllabus completion.',
    pillars: ['Accounting foundation', 'Business understanding', 'Exam readiness', 'Future direction'],
  },
  {
    slug: 'ca',
    href: '/ca/',
    no: '02',
    tag: 'Professional',
    short: 'Chartered Accountancy',
    title: 'CA Classes in Mumbai: Foundation to Final, All in One Place',
    hook: 'Prepare for CA with a clearer plan.',
    sub: 'Specialist faculty, conceptual depth and structured examination preparation across the CA journey.',
    intro:
      'CA preparation requires more than attending lectures. Students must understand complex ideas, coordinate subjects, practise consistently and revise with purpose. EdgeX Learning brings these parts together.',
    cardBlurb: 'Specialist teaching and structured CA preparation.',
    photo: '/img/stock/ca.jpg',
    stages: [
      { t: 'CA Foundation', d: 'Start with core accounting, law, maths and economics.' },
      { t: 'CA Intermediate', d: 'Specialist faculty for every subject, with steady practice.' },
      { t: 'CA Final', d: 'Answer strategy, revision and doubt resolution.' },
      { t: 'Qualified CA', d: 'A recognised professional career in finance.' },
    ],
    metaTitle: 'CA Classes in Mumbai | Foundation, Inter & Final | EdgeX',
    metaDesc:
      'Prepare for CA exams with EdgeX Learning’s CA classes in Mumbai, structured learning, experienced guidance and exam-focused preparation.',
    listTitle: 'Is this the right programme for you?',
    list: [
      'Students who want specialised faculty for individual subjects.',
      'Students who find application and answer-solving difficult.',
      'Learners struggling to plan multiple subjects together.',
      'Aspirants looking for disciplined revision and doubt resolution.',
    ],
    pillarsTitle: 'More than syllabus completion.',
    pillars: ['Conceptual depth', 'Answer strategy', 'Subject coordination', 'Professional thinking'],
  },
  {
    slug: 'acca',
    href: '/acca/',
    no: '03',
    tag: 'Global qualification',
    short: 'ACCA',
    title: 'ACCA Coaching in Mumbai for Every Paper and Level',
    hook: 'A global qualification. A clear local support system.',
    sub: 'Understand the route before you commit, then prepare paper by paper with experienced guidance.',
    intro:
      'Students and parents need clarity on eligibility, exemptions, paper progression, preparation and career direction. EdgeX Learning helps them understand the route before admission and provides structured support once the journey begins.',
    cardBlurb: 'A guided route towards a globally recognised qualification.',
    photo: '/img/stock/acca.jpg',
    stages: [
      { t: 'Applied Knowledge', d: 'Foundations of accounting, business and management.' },
      { t: 'Applied Skills', d: 'Paper-by-paper application of core finance skills.' },
      { t: 'Strategic Professional', d: 'Advanced papers with real-world case thinking.' },
      { t: 'ACCA Member', d: 'A globally recognised qualification.' },
    ],
    metaTitle: 'ACCA Coaching in Mumbai | EdgeX Learning',
    metaDesc:
      'Join EdgeX Learning for ACCA coaching in Mumbai with structured classes, expert guidance, study support and exam-focused preparation.',
    listTitle: 'Is this the right programme for you?',
    list: [
      'Students interested in accounting, audit or finance careers.',
      'Students who prefer application-oriented assessment.',
      'Learners seeking an internationally recognised qualification.',
      'Families who want pathway counselling before committing.',
    ],
    pillarsTitle: 'More than syllabus completion.',
    pillars: ['Paper-wise clarity', 'Applied learning', 'Exam practice', 'Career context'],
  },
  {
    slug: 'cfa',
    href: '/cfa/',
    no: '04',
    tag: 'Investment careers',
    short: 'CFA',
    title: 'CFA Course in Mumbai: Prepare Smarter with EdgeX Learning',
    hook: 'Prepare for CFA with structure, not guesswork.',
    sub: 'Level 1, 2 and 3 coaching with mock exams, guidance and steady study support.',
    intro:
      'CFA rewards consistent, well-planned preparation. EdgeX Learning gives candidates a clear route through the curriculum, regular practice and support when concepts get difficult.',
    cardBlurb: 'Structured Level 1, 2 and 3 preparation for investment careers.',
    photo: '/img/stock/cfa.jpg',
    stages: [
      { t: 'CFA Level 1', d: 'Core tools of investment analysis and ethics.' },
      { t: 'CFA Level 2', d: 'Valuation and application across asset classes.' },
      { t: 'CFA Level 3', d: 'Portfolio management and wealth planning.' },
      { t: 'CFA Charterholder', d: 'A gateway to investment management careers.' },
    ],
    metaTitle: 'CFA Course in Mumbai | Level 1, 2 & 3 Coaching | EdgeX',
    metaDesc:
      'Prepare for CFA Level 1, 2 and 3 with EdgeX Learning’s CFA course in Mumbai. Structured classes, guidance, mock exams and study support.',
    listTitle: 'What you’ll learn',
    list: [
      'Master Financial Statement Analysis',
      'Understand Equity & Fixed Income',
      'Build strong investment analysis skills',
      'Learn Portfolio Management & Asset Allocation',
    ],
    pillarsTitle: 'Why CFA?',
    pillars: [
      'Globally recognised finance qualification',
      'Strong investment analysis foundation',
      'Career opportunities in finance',
      'Develop valuation & analytical skills',
      'Learn portfolio management',
      'Understand risk & returns',
      'Build global finance career skills',
      'Gateway to investment management',
    ],
  },
];

export const INCLUDES = [
  'Comprehensive Study Material',
  'Practice Question Bank',
  'Regular Doubt-Solving Sessions',
  'Professional Course Foundation',
  'Downloadable Resources',
  'Detailed Revision Lectures',
];

// Text below is taken verbatim (first lines only) from the old site, where it was template filler.
// Replace with real student quotes when available.
export const TESTIMONIALS = [
  {
    name: 'Vishal Chothe',
    title: 'Great Quality',
    text: 'Education is the most powerful tool to change the world. One thing that can’t be taken from you.',
  },
  {
    name: 'Manoj Gayekar',
    title: 'Best Course Ever',
    text: 'Education is a key to success and freedom from all the forces to learn we love to pursue a best education platform.',
  },
  {
    name: 'Pranjal Sakpal',
    title: 'Very Easy Course',
    text: 'Education is the most powerful tool to change the world. A mind is a terrible thing to waste.',
  },
  {
    name: 'Yashvi Pandey',
    title: 'Excellent Quality',
    text: 'The best education system I love this.',
  },
];

export const WA_LINK = (msg = 'Hi EdgeX Learning, I would like to know more about your courses.') =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
