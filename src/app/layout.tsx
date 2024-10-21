"use client"

import { useRef } from 'react'
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Viewport } from "next";
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'

const inter = Inter({
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode,
  children: React.ReactNode;
}>) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-black`}>
        <Provider store={storeRef.current}>
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              disableTransitionOnChange
            >
              <div className="sticky top-0 bg-white dark:bg-black">
                <div className="container h-screen mx-auto text-center max-w-sm md:max-w-3xl lg:max-w-4xl">
                  {modal}
                  {children}
                </div>
              </div>
            </ThemeProvider>
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
