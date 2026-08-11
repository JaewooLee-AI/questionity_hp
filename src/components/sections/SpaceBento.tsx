"use client";

import React from "react";
import { ExternalLink, MapPin, Coffee, Users, Laptop } from "lucide-react";

export function SpaceBento() {
  const WORK_AND_SHARE_URL = process.env.WORK_AND_SHARE_URL || "https://worknshare.readdy.co/";

  const bentoItems = [
    {
      id: "lounge",
      title: "Questionity × Work & Share 커뮤니티 라운지",
      desc: "대학로 마로니에 공원 앞, 영감과 질문이 교차하는 하이엔드 우드 톤 오픈 라운지",
      icon: Coffee,
      badge: "메인 독서 라운지",
      className: "md:col-span-2 md:row-span-2 min-h-[340px] sm:min-h-[420px]",
      bgStyle: "bg-[#f5f5f7]",
    },
    {
      id: "focus",
      title: "집중 몰입 커스텀 데스크",
      desc: "독후감 집필과 사색의 정수를 경험할 수 있는 사운드프루프 딥 포커스 존",
      icon: Laptop,
      badge: "Focus Zone",
      className: "md:col-span-1 md:row-span-1 min-h-[220px]",
      bgStyle: "bg-[#f5f5f7]",
    },
    {
      id: "meeting",
      title: "소모임 & 토론 라운드 룸",
      desc: "AI가 제안하는 가상 독서 모임이 실제 오프라인 지성 토론으로 발전하는 특별한 공간",
      icon: Users,
      badge: "Discussion Room",
      className: "md:col-span-1 md:row-span-1 min-h-[220px]",
      bgStyle: "bg-[#f5f5f7]",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-white border-t border-black/5">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <span className="text-[#0066cc] text-xs font-mono font-semibold tracking-widest uppercase block">
          PHYSICAL COMMUNITY HUB
        </span>
        <h2 className="font-heading text-3xl sm:text-5xl font-semibold text-[#1d1d1f] tracking-tight">
          질문이 머무는 오프라인 무대, <br className="sm:hidden" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066cc] via-[#0071e3] to-[#2997ff]">
            Work &amp; Share 공간 브릿지
          </span>
        </h2>
        <p className="text-base sm:text-lg text-[#6e6e73] font-normal leading-relaxed break-keep">
          Questionity 커뮤니티의 모든 독서 모임은 대학로의 상징적인 공간 &apos;Work &amp; Share&apos;에서 열립니다.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bentoItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <a
              key={item.id}
              href={WORK_AND_SHARE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative apple-card p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 ${item.className}`}
            >
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white text-[#0066cc] border border-black/10 shadow-xs">
                    <IconComponent className="w-3.5 h-3.5" />
                    {item.badge}
                  </span>
                  <span className="text-[#86868b] group-hover:text-[#0071e3] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                    <ExternalLink className="w-4 h-4" />
                  </span>
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-semibold text-[#1d1d1f] group-hover:text-[#0066cc] transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* Footer */}
              <div className="space-y-4 pt-6 mt-auto">
                <p className="text-xs sm:text-sm text-[#6e6e73] font-normal leading-relaxed">{item.desc}</p>
                <div className="apple-link inline-flex items-center gap-1 text-xs font-medium">
                  <span>Work &amp; Share 공간 둘러보기 ↗</span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
