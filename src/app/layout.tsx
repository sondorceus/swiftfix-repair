import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SwiftFix - Premium iPhone & Mobile Repair | We Come to You",
  description: "Same-day iPhone, MacBook & Android repairs at your location. Free diagnostics, 90-day warranty, certified technicians. Book your repair now!",
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
