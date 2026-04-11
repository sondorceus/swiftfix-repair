import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Austin Mobile Repair - Premium iPhone & Mobile Repair | We Come to You",
  description: "Austin's #1 mobile repair service. Same-day iPhone, MacBook & Android repairs at your location. Free diagnostics, 90-day warranty, certified technicians. Book now!",
  keywords: "iPhone repair, mobile repair, screen replacement, MacBook repair, same day repair, phone repair near me",
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
