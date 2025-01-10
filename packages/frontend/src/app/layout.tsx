import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import EditorProvider from "@/context/EditorProvider";
import { Provider } from "jotai";
import ThemeProvider from "@/components/ThemeProvider";
import { SessionProvider } from "next-auth/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Solang",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          <ThemeProvider attribute="class" enableSystem >
            <Provider>
              <EditorProvider>{children}</EditorProvider>
            </Provider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
