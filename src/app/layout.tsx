import type { Metadata } from 'next';

import { Inter } from 'next/font/google';

import './globals.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Calculadora de empréstimos administrador',
  icons: {
    icon: "favicon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="pt-br">
      <body className={inter.className}>
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
