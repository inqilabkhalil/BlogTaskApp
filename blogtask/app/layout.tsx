import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "My Blog App",
  description: "A simple blog app with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}