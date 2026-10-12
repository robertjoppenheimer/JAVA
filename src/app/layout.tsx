import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://javasolutions.com"),
  title: {
    default: "Java Solutions — Enterprise IT Systems & Modern Solutions",
    template: "%s | Java Solutions",
  },
  description:
    "End-to-end enterprise IT solutions — systems administration, high-resilience networking, AWS cloud architecture, Odoo ERP, and software engineering.",
  keywords: [
    "IT solutions",
    "IT infrastructure",
    "networking",
    "cloud solutions",
    "AWS",
    "Odoo ERP",
    "web development",
    "cybersecurity",
    "IT support",
    "managed IT services",
  ],
  authors: [{ name: "Java Solutions" }],
  creator: "Java Solutions",
  publisher: "Java Solutions",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Java Solutions — Enterprise IT Systems & Modern Solutions",
    description:
      "End-to-end enterprise IT solutions — systems administration, high-resilience networking, AWS cloud architecture, Odoo ERP, and software engineering.",
    siteName: "Java Solutions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Java Solutions — Enterprise IT Systems & Modern Solutions",
    description:
      "End-to-end enterprise IT solutions — systems administration, networking, cloud, and Odoo ERP.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  try {
    var key = 'java-solutions-theme';
    var stored = localStorage.getItem(key);
    var theme = stored;
    if (!theme) {
      var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme = prefersDark ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased transition-colors duration-200">
        <ThemeProvider>
          <CustomCursor />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[var(--accent)] focus:text-white focus:text-xs focus:font-semibold focus:rounded-full focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-bright)]"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="relative">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
