import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import "./globals.css";
const Provider = dynamic(() => import("./provider"), { ssr: false });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/szs0ybv.css"
        ></link>
      </head>
      <body>
        <Provider>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
