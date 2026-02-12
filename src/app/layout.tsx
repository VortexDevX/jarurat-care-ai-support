import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jarurat Care — AI-Enabled Patient Support",
  description:
    "A mini healthcare support web app with AI-powered request analysis, urgency classification, and volunteer-ready summaries for Jarurat Care NGO's cancer care support community.",
  keywords: [
    "Jarurat Care",
    "cancer support",
    "healthcare",
    "NGO",
    "AI",
    "patient support",
    "volunteer",
    "caregiver",
  ],
  authors: [{ name: "Jarurat Care" }],
  openGraph: {
    title: "Jarurat Care — AI-Enabled Healthcare Support",
    description:
      "Submit a support request and let AI instantly summarize, classify urgency, and recommend next steps for the volunteer team.",
    type: "website",
    locale: "en_IN",
    siteName: "Jarurat Care",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jarurat Care — AI-Enabled Healthcare Support",
    description:
      "AI-powered patient support request analysis for cancer care NGO.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
