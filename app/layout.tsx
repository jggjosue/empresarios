import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Footer from './components/Footer/index';
import Navbar from './components/Navbar/index';
import BottomNavbar from './components/Navbar/BottomNavbar';
import './globals.css';

export const metadata = {
  title: 'Empresarios',
  description: 'Free promotions page and subscription to a membership which provides events, products, and benefits for founders, entrepreneurs, business executives, and travelers. Our membership gives you the privileged access you need to take your business to the next level.',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="Empresarios"
          content="Subscribing to Magazine Founder promotions is more than a privilege. It is the key to unlocking infinite opportunities."
        />
        <title>Empresarios</title>
      </head>
      <body>
        <Navbar />
        <BottomNavbar />
        {children}
        <Analytics />
        <SpeedInsights />
        <Footer />
      </body>
    </html>
  )
}
