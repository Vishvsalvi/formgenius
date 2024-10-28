import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./components/Provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Formgenius",
  description: "Create form with AI and get instant insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </Providers>
  );
}
