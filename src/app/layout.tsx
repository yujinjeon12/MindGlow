"use client";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${inter.className} bg-white dark:bg-black`}>
        <SessionProvider>
          <Provider store={store}>{children}</Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
