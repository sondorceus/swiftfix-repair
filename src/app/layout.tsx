import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Austin Mobile Repair — iPhone, MacBook & Samsung Repair | We Come to You",
  description: "Austin's #1 mobile repair service. Same-day iPhone, MacBook & Samsung repairs at your location. 30-day warranty, certified technicians. No fix, no pay. Book in 60 seconds!",
  keywords: "iPhone repair Austin, mobile repair Austin TX, screen replacement, MacBook repair, Samsung repair, same day repair, phone repair near me",
  openGraph: {
    title: "Austin Mobile Repair — We Come to You",
    description: "Same-day iPhone, MacBook & Samsung repairs at your location. 30-day warranty. No fix, no pay.",
    type: "website",
    locale: "en_US",
    siteName: "Austin Mobile Repair",
    url: "https://swiftfix-repair.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Austin Mobile Repair — We Come to You",
    description: "Same-day repairs at your location. 30-day warranty. No fix, no pay.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://swiftfix-repair.vercel.app" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
