import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFab from '@/components/WhatsAppFab';
import Motion from '@/components/Motion';
import { EnquiryProvider } from '@/components/EnquiryModal';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: 'EdgeX Learning | CA, ACCA, CFA & Commerce Classes in Mumbai',
  description:
    'Explore EdgeX Learning for professional coaching classes in Mumbai, covering CA, ACCA, CFA and Commerce with structured learning support.',
  icons: { icon: '/img/favicon.png', apple: '/img/favicon.png' },
  openGraph: {
    type: 'website',
    siteName: 'EdgeX Learning',
    title: 'EdgeX Learning | CA, ACCA, CFA & Commerce Classes in Mumbai',
    description:
      'Explore EdgeX Learning for professional coaching classes in Mumbai, covering CA, ACCA, CFA and Commerce with structured learning support.',
    images: ['/img/logo.png'],
  },
  alternates: { canonical: '/' },
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'EdgeX Learning',
  url: SITE.url,
  logo: `${SITE.url}/img/logo.png`,
  founder: { '@type': 'Person', name: 'Nihal Bhatt' },
  address: [
    { '@type': 'PostalAddress', streetAddress: '2nd Floor, Siddharth Arcade, Opposite Manubhai Jewellers', addressLocality: 'Borivali, Mumbai', addressCountry: 'IN' },
    { '@type': 'PostalAddress', streetAddress: '401, 4th Floor, B Wing, Vertex Vikas', addressLocality: 'Andheri East, Mumbai', addressRegion: 'Maharashtra', postalCode: '400069', addressCountry: 'IN' },
  ],
  telephone: '+919820088974',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');setTimeout(function(){if(!document.documentElement.hasAttribute('data-motion-ready'))document.documentElement.classList.add('reveal-all')},5000)",
          }}
        />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <EnquiryProvider>
        <Navbar />
        <Motion />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
        </EnquiryProvider>
      </body>
    </html>
  );
}
