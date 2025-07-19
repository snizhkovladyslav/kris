import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "LiterAktiv - Літературні зустрічі у Відні",
  description: "Популяризація української літератури в Австрії. Зустрічі з письменниками, творчі вправи, лекції та читацькі клуби у Відні.",
  keywords: "українська література, Відень, літературні зустрічі, українська діаспора, Австрія, культура",
  authors: [{ name: "LiterAktiv Team" }],
  creator: "LiterAktiv",
  publisher: "LiterAktiv",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://literaktiv.at"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LiterAktiv - Літературні зустрічі у Відні",
    description: "Популяризація української літератури в Австрії. Зустрічі з письменниками, творчі вправи, лекції та читацькі клуби.",
    url: "https://literaktiv.at",
    siteName: "LiterAktiv",
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LiterAktiv - Літературні зустрічі у Відні",
    description: "Популяризація української літератури в Австрії",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
