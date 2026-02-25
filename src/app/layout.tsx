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
  description: "AI 마케팅 엔진 Faire Clic으로 당신의 비즈니스에 클릭을 만드세요.",
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
