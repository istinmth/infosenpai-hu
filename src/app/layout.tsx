import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from '@/components/elements/GoogleAnalytics';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "InfoSenpai",
    description: "Informatikaérettségi-felkészítő 10-12. osztályos diákoknak. Velünk gyerekjáték lesz az infóérettségi!",
};

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
        <body className={`${inter.className} bg-whitesmoke`}>{children}</body>
        </html>
    );
}