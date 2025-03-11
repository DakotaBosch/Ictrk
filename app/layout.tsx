import './globals.css';
import Header from '@/components/Header';

export const metadata = {
  title: 'CatTrack - Shipment Tracking',
  description: 'Track your shipments in real-time',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <Header />
        {children}
      </body>
    </html>
  )
}
