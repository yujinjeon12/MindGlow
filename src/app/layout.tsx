"use client";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-black`}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            disableTransitionOnChange
          >
            <Provider store={store}>{children}</Provider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
