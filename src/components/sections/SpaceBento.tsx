"use client";

import React, { useState } from "react";
import { Coffee, Users, Laptop, Sparkles, ZoomIn, Eye } from "lucide-react";
import { SpacePhotoGalleryModal, GALLERY_PHOTOS } from "@/components/sections/SpacePhotoGalleryModal";

export function SpaceBento() {
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const bentoItems = [
    {
      id: "lounge",
      title: "Questionity × Work & Share 커뮤니티 라운지",
      desc: "대학로 마로니에 공원 앞, 자연 채광 통창과 스페셜티 우드 톤 오픈 라운지 (자율석 30석)",
      image: "/img/photo-003.png",
      badge: "메인 독서 라운지",
      photoIndex: 0,
      className: "md:col-span-2 md:row-span-2 min-h-[360px] sm:min-h-[440px]",
    },
    {
      id: "focus",
      title: "집중 몰입 딥 포커스 존",
      desc: "사운드프루프 1인 전용 스튜디오 및 조용한 집필 공간",
      image: "/img/photo-015.png",
      badge: "Focus Studio",
      photoIndex: 2,
      className: "md:col-span-1 md:row-span-1 min-h-[240px]",
    },
    {
      id: "meeting",
      title: "소모임 & 토론 라운드 룸",
      desc: "4K 스마트 브리핑과 화상회의를 지원하는 12인 대회의실",
      image: "/img/photo-005.png",
      badge: "Discussion Room",
      photoIndex: 3,
      className: "md:col-span-1 md:row-span-1 min-h-[240px]",
    },
  ];

  const handleOpenGalleryIndex = (idx: number) => {
    setSelectedPhotoIndex(idx);
    setGalleryModalOpen(true);
  };

  return (
    <>
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-white border-t border-black/5">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-[#0066cc] text-xs font-mono font-semibold tracking-widest uppercase block">
            PHYSICAL COMMUNITY HUB
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-semibold text-[#1d1d1f] tracking-tight">
            질문이 머무는 오프라인 무대, <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066cc] via-[#0071e3] to-[#2997ff]">
              Work &amp; Share 공간 브릿지
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#6e6e73] font-normal leading-relaxed break-keep">
            Questionity 커뮤니티의 모든 오프라인 모임이 열리는 대학로 &apos;Work &amp; Share&apos; 하이엔드 오피스 실제 모습입니다.
          </p>

          <button
            onClick={() => handleOpenGalleryIndex(0)}
            className="apple-button-secondary px-5 py-2.5 text-xs font-semibold inline-flex items-center gap-2 shadow-xs hover:scale-105 active:scale-95 transition-all mt-2"
          >
            <Eye className="w-4 h-4 text-[#0066cc]" />
            <span>Work &amp; Share 23종 공간 사진 전체보기</span>
          </button>
        </div>

        {/* Bento Grid with Real Photos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bentoItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenGalleryIndex(item.photoIndex)}
              className={`group relative rounded-[2rem] overflow-hidden border border-black/10 bg-[#f5f5f7] flex flex-col justify-between cursor-pointer transition-all duration-500 hover:shadow-2xl hover:border-[#0071e3]/40 ${item.className}`}
            >
              {/* Space Photo Background */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                {/* eslint-disable-next-html-element-suppression */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                {/* Dark Vignette Overlay for Title Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/85 transition-colors" />
              </div>

              {/* Top Badge */}
              <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-[#0066cc] border border-white/40 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#0066cc]" />
                  {item.badge}
                </span>
                <span className="p-2 rounded-full bg-black/40 text-white backdrop-blur-md group-hover:bg-[#0071e3] transition-colors">
                  <ZoomIn className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom Card Info */}
              <div className="relative z-10 p-6 sm:p-8 text-left space-y-2 text-white mt-auto">
                <h3 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight leading-snug group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed">{item.desc}</p>
                <div className="pt-2 text-xs font-semibold text-amber-400 flex items-center gap-1">
                  <span>고화질 공간 3D 사진 확대 보기 🔍</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Photo Gallery Modal */}
      <SpacePhotoGalleryModal
        isOpen={galleryModalOpen}
        initialIndex={selectedPhotoIndex}
        onClose={() => setGalleryModalOpen(false)}
      />
    </>
  );
}
