
//The layout.tsx file is a root layout in Next.js 13+ App Router. It's a special file that wraps around all pages in your application and provides the basic HTML structure.
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DeepThink Chat",
  description: "AI-powered chat application with voice input and file sharing",
  keywords: ["AI", "chat", "voice", "assistant", "conversation"],
  authors: [{ name: "DeepThink Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}