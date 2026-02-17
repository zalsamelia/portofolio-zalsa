import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zalsabilah Rezky - Data Analyst Portfolio",
  description: "Data enthusiast with a bias for action. Transforming complex datasets into clear, actionable business insights.",
  keywords: ["Data Analyst", "Business Intelligence", "Data Science", "Portfolio", "Zalsabilah Rezky", "Zalsa"],
  authors: [{ name: "Zalsabilah Rezky" }],
  openGraph: {
    title: "Zalsabilah Rezky - Data Analyst Portfolio",
    description: "Data enthusiast with a bias for action. Transforming complex datasets into clear, actionable business insights.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
