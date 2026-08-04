import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toast } from '@/components/Toast';
import { WhatsAppFloatingBtn } from '@/components/WhatsAppFloatingBtn';
import { ScrollToTop } from '@/components/ScrollToTop';
import { STORE_CONFIG } from '@/lib/config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: `${STORE_CONFIG.name} - Makanan Rumahan Lezat, Murah & Bersih di Semarang`,
    template: `%s | ${STORE_CONFIG.name}`,
  },
  description: `${STORE_CONFIG.subtitle} Warung makan rumahan milik ${STORE_CONFIG.owner} di ${STORE_CONFIG.address.fullAddress}.`,
  keywords: [
    'Warung Marjukis',
    'Warung Marjuki Semarang',
    'Kuliner Semarang',
    'Soto Ayam Semarang',
    'Nasi Rames Semarang',
    'Indomie Telur',
    'Tempe Mendoan',
    'Tahu Bakso Semarang',
    'Makanan Rumahan Semarang',
    'Ibu Yulia Jomblang Perbalan',
  ],
  authors: [{ name: STORE_CONFIG.owner }],
  creator: STORE_CONFIG.name,
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://warungmarjukis.com',
    title: `${STORE_CONFIG.name} - Kuliner Rumahan Ibu Yulia Semarang`,
    description: STORE_CONFIG.subtitle,
    siteName: STORE_CONFIG.name,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: `${STORE_CONFIG.name} Food Banner`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: STORE_CONFIG.name,
    description: STORE_CONFIG.subtitle,
    images: ['https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: STORE_CONFIG.name,
  image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=1200&q=80',
  '@id': 'https://warungmarjukis.com',
  url: 'https://warungmarjukis.com',
  telephone: STORE_CONFIG.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${STORE_CONFIG.address.street} ${STORE_CONFIG.address.rtRw}`,
    addressLocality: STORE_CONFIG.address.city,
    addressRegion: STORE_CONFIG.address.province,
    addressCountry: 'ID',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -7.001,
    longitude: 110.435,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '06:00',
    closes: '21:00',
  },
  servesCuisine: 'Indonesian',
  priceRange: 'Rp 1.500 - Rp 8.000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toast />
            <WhatsAppFloatingBtn />
            <ScrollToTop />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
