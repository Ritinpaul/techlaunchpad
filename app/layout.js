import './globals.css';

export const metadata = {
  title: {
    default: 'MBA Partner — Programs for MBA Placements',
    template: '%s | MBA Partner',
  },
  description: 'MBA Partner helps current MBA students land Summer Internship Placements and Final Placements through Live Projects, Case Competitions, and a Placements Bootcamp. Founded by alumni of top IIMs.',
  keywords: ['MBA placements', 'MBA prep', 'case competition', 'live projects', 'CAT prep', 'IIM', 'placement bootcamp'],
  openGraph: {
    siteName: 'MBA Partner',
    type: 'website',
  },
};

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatBot from '@/components/ui/ChatBot';
import FloatingCTA from '@/components/ui/FloatingCTA';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingCTA />
        <ChatBot />
      </body>
    </html>
  );
}

