import './globals.css';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Creador - Lectura y Actualizacion de Archivos',
  description:
    'Crea archivos desde el cliente y almacenalo en un servidor virtual',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
