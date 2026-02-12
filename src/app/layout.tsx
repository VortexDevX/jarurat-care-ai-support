import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jarurat Care — AI-Enabled Patient Support",
  description:
    "A mini healthcare support web app with AI-powered request analysis for Jarurat Care NGO.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
