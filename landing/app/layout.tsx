import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI for Business Growth | AIMER × HACA Tech School",
  description: "Exclusive Interactive Session on Applied AI in Sales & Marketing. 29 April 2026, 7–9 PM on Google Meet.",
  metadataBase: new URL("https://haca-x-aimer.vercel.app"),
  openGraph: {
    title: "AI for Business Growth | AIMER × HACA Tech School",
    description: "Exclusive Interactive Session on Applied AI in Sales & Marketing. 29 April 2026, 7–9 PM on Google Meet.",
    url: "https://haca-x-aimer.vercel.app",
    siteName: "AIMER × HACA Tech School",
    images: [
      {
        url: "/og-image.png",
        width: 1080,
        height: 1920,
        alt: "AI for Business Growth – 29 April 2026",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI for Business Growth | AIMER × HACA Tech School",
    description: "Exclusive Interactive Session on Applied AI in Sales & Marketing. 29 April 2026, 7–9 PM on Google Meet.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
