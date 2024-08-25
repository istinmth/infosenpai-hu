import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InfoSenpai",
  description: "Informatikaérettségi-felkészítő diákoknak",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className="dark">
      <body className={`${inter.className} bg-whitesmoke`}>{children}</body>
      </html>
  );
}