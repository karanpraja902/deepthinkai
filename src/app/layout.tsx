
//The layout.tsx file is a root layout in Next.js 13+ App Router. It's a special file that wraps around all pages in your application and provides the basic HTML structure.
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DeepThink Chat",
  description: "AI-powered chat application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900">
        {children}
      </body>
    </html>
  );
}