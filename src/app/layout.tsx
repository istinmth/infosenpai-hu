import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from '@/components/elements/GoogleAnalytics';

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
                url: '/public/og.png',
                width: 851,
                height: 315,
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
        <html lang="hu" className="light">
        <head>
            <GoogleAnalytics/>
            <meta property="og:image" content="public/og.png"/>
            <title>InfoSenpai</title>
        </head>
        <body className={`${inter.className} bg-whitesmoke`}>{children}</body>
        </html>
    );
}