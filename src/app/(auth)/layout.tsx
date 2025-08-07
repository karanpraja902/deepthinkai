
//The layout.tsx file is a root layout in Next.js 13+ App Router. It's a special file that wraps around all pages in your application and provides the basic HTML structure.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DeepThink Chat",
  description: "Login to DeepThink",

};

export default function SecondayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <div>
          {children}
        </div>
    </>
  );
}

