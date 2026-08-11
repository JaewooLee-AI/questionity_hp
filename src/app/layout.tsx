import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Questionity | 대학로 복합 지성 커뮤니티 파운딩 멤버 모집",
  description:
    "질문이 모여 지성이 되는 공간, Questionity. 대학로 오프라인 Work & Share 공간 연동과 Proactive AI 챗봇이 제안하는 가상 독서 모임 100인 파운딩 멤버 모집 중.",
  keywords: ["Questionity", "대학로", "독서모임", "파운딩멤버", "Work&Share", "AI독서", "소모임"],
  openGraph: {
    title: "Questionity | 대학로 파운딩 멤버 100인 모집",
    description: "질문이 모여 지성이 되는 공간, Questionity. 첫 여정을 함께할 1호 대기자가 되어주세요.",
    url: "https://questionity.kr",
    siteName: "Questionity",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="light scroll-smooth">
      <head>
        {/* Pretendard & Outfit Fonts matching work_and_share */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-[#1d1d1f] font-sans antialiased selection:bg-[#0071e3]/20 selection:text-[#0066cc] min-h-screen flex flex-col justify-between overflow-x-hidden">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="bg-[#f5f5f7] border-t border-black/10 py-12 px-4 text-[#6e6e73] text-xs">
          <div className="max-w-6xl mx-auto space-y-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#0071e3] text-white font-bold text-xs flex items-center justify-center font-heading">
                Q
              </div>
              <span className="font-heading text-sm font-semibold text-[#1d1d1f] tracking-tight">
                Questionity × Work &amp; Share
              </span>
            </div>
            <p className="max-w-xl mx-auto leading-relaxed font-normal">
              대학로의 창조적 소극 문화와 지적 기호학이 만나는 복합 커뮤니티 공간 브랜드입니다. <br />
              오프라인 커뮤니티 공간: 대학로 Work &amp; Share (https://worknshare.readdy.co/)
            </p>
            <p className="text-[#86868b] font-mono text-[11px]">
              © {new Date().getFullYear()} Questionity Inc. All rights reserved. Authentic Pre-launch AI 예측 데이터 포함.
            </p>
          </div>
        </footer>
        <Toaster position="top-right" theme="light" richColors />
      </body>
    </html>
  );
}
