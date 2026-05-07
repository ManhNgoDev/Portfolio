import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "A personal portfolio website built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-screen bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#111827] bg-fixed">
        {children}
      </body>
    </html>
  );
}
