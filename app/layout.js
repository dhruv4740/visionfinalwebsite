import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';

// Configure Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'Vision KJSCE',
  description: 'Official website for Vision KJSCE',
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} bg-black text-white`}>
        {children}
      </body>
    </html>
  )
}