import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import { getServerSession } from "next-auth";
import { Analytics } from "@vercel/analytics/react";
import SessionProvider from "@/lib/authProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <>
      <SessionProvider session={session}>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <div className="w-full bg-blue-900 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
              <Navbar />
            </div>

            <div className="w-full bg-white px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
              {children}
              <Analytics />
            </div>
          </body>
        </html>
      </SessionProvider>
    </>
  );
}
