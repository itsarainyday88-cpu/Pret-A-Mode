import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pret-A-Mode | 입히는 순간 성과가 되는 AI 마케팅 솔루션",
  description: "대표님의 문체를 AI가 학습합니다. 반복되는 노동은 시스템이 맡고, 대표님은 최종 검수만 하십시오.",
  metadataBase: new URL("https://pret-a-mode.vercel.app"),
  openGraph: {
    title: "Pret-A-Mode | 마케팅 오트쿠튀르의 대중화를 선언하다",
    description: "대표님의 문체를 AI가 학습합니다. 반복되는 노동은 시스템이 맡고, 대표님은 최종 검수만 하십시오.",
    url: "https://pret-a-mode.vercel.app",
    siteName: "Pret-A-Mode",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Pret-A-Mode 로고",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pret-A-Mode | 마케팅 오트쿠튀르의 대중화를 선언하다",
    description: "대표님의 문체를 AI가 학습합니다. 반복되는 노동은 시스템이 맡고, 대표님은 최종 검수만 하십시오.",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${pretendard.variable} antialiased font-sans text-charcoal-grey selection:bg-gold-accent selection:text-white`}
        style={{
          backgroundColor: "#faf9f6",
          fontFamily: "var(--font-pretendard), ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <main className="min-h-screen flex flex-col relative w-full items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
