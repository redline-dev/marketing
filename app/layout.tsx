import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/Header";
import { fontVariables } from "./fonts";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Redline Development",
  description: "Redline Development website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="app-root">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
