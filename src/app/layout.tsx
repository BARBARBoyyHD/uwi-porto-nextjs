import { TanstackProvider } from "@/utils/ReactQueryProviders";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientRoot from "./clientRootLayout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Nahrul Hayat | Fullstack Software Engineer Portfolio",
  description:
    "Fresh Graduate Software Engineer passionate about building scalable, user-friendly, and efficient web applications. Experienced in React, Node.js, Express, and PostgreSQL/MySQL. Explore my projects, skills, and journey as a Fullstack Developer.",
  keywords: [
    "Muhammad Nahrul Hayat",
    "Software Engineer",
    "Fullstack Developer",
    "Web Developer",
    "React Developer",
    "Frontend Developer",
    "Backend Developer",
    "Fresh Graduate",
  ],
  authors: [{ name: "Muhammad Nahrul Hayat" }],
  openGraph: {
    title: "Muhammad Nahrul Hayat | Fullstack Software Engineer Portfolio",
    description:
      "Explore the portfolio of Muhammad Nahrul Hayat — a passionate Software Engineer specializing in scalable, user-friendly web applications using React, Node.js, and PostgreSQL.",
    url: "https://your-portfolio-domain.com",
    siteName: "Nahrul's Portfolio",
    images: [
      {
        url: "/og-image.png", // replace with your real image path
        width: 1200,
        height: 630,
        alt: "Muhammad Nahrul Hayat Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TanstackProvider>
          <ClientRoot>{children}</ClientRoot>
        </TanstackProvider>
      </body>
    </html>
  );
}
