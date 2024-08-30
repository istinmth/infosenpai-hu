import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from '@/components/elements/GoogleAnalytics';
import { PaymentModalProvider } from '@/app/contexts/PaymentModalContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: 'InfoSenpai',
    description: 'Informatikaérettségi felkészítő 10-12. osztályos diákoknak. Velünk gyerekjáték lesz az érettségi!',
    openGraph: {
        title: 'InfoSenpai',
        description: 'Informatikaérettségi felkészítő 10-12. osztályos diákoknak. Velünk gyerekjáték lesz az érettségi!',
        url: 'https://infosenpai.hu',
        siteName: 'InfoSenpai',
        images: [
            {
                url: 'https://www.infosenpai.hu/_next/image?url=%2Fujkep.png&w=1920&q=75',
                width: 800,
                height: 600,
            },
        ],
        locale: 'hu_HU',
        type: 'website',
    },
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="hu" className="dark">
        <head>
            <GoogleAnalytics />
        </head>
        <body className={`${inter.className} bg-whitesmoke`}>
        <PaymentModalProvider>
            {children}
        </PaymentModalProvider>
        </body>
        </html>
    );
}