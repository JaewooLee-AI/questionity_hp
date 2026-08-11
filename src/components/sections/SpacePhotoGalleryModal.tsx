"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Sparkles, MapPin, Grid, ZoomIn } from "lucide-react";

export const GALLERY_PHOTOS = [
  { src: "/img/photo-003.png", title: "메인 코워킹 라운지 (Window Lounge)", desc: "자연 채창 통창과 원목 커뮤니티 데스크", category: "독서 라운지" },
  { src: "/img/photo-002.png", title: "메인 로비 & 샹들리에 Lounge", desc: "골드 커스텀 샹들리에와 딥블루 소파", category: "로비 라운지" },
  { src: "/img/photo-015.png", title: "프라이빗 포커스 룸 (1~2인)", desc: "사운드프루프 독립 1~2인 작업 스튜디오", category: "포커스 존" },
  { src: "/img/photo-005.png", title: "첨단 스마트 미팅룸 (대회의실)", desc: "4K 모니터와 화상회의 지원 12인 대회의실", category: "토론 미팅룸" },
  { src: "/img/photo-007.png", title: "릴렉스 & 영감 존 (Café Lounge)", desc: "학림 감성 드립커피 바 & 스마트 락커", category: "편의 공간" },
  { src: "/img/photo-010.png", title: "이그제큐티브 세미나 룸", desc: "고급 패브릭 암체어 프라이빗 세미나 룸", category: "토론 미팅룸" },
  { src: "/img/photo-001.png", title: "OA 프린팅 & 서비스 허브", desc: "무제한 초고속 프린팅 및 사무용품 지원", category: "편의 공간" },
  { src: "/img/photo-017.png", title: "팀 포커스 스위트 (3~4인)", desc: "U자형 협업 데스크 독립 팀 오피스", category: "포커스 존" },
  { src: "/img/photo-012.png", title: "보안 복도 & 프라이빗 존", desc: "세로결 스트라이프 프라이버시 유리 복도", category: "포커스 존" },
  { src: "/img/photo-020.png", title: "적벽돌 크리에이티브 팀 룸", desc: "대학로 소극장 감성의 레드 브릭 스튜디오", category: "포커스 존" },
];

interface SpacePhotoGalleryModalProps {
  isOpen: boolean;
  initialIndex?: number;
  onClose: () => void;
}

export function SpacePhotoGalleryModal({ isOpen, initialIndex = 0, onClose }: SpacePhotoGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!isOpen) return null;

  const currentPhoto = GALLERY_PHOTOS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? GALLERY_PHOTOS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === GALLERY_PHOTOS.length - 1 ? 0 : prev + 1));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-[#1d1d1f] text-white rounded-3xl border border-white/10 shadow-2xl overflow-hidden text-left flex flex-col max-h-[90vh]"
        >
          {/* Top Bar */}
          <div className="p-4 sm:p-5 bg-black/40 border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#0071e3] text-white font-bold text-xs flex items-center justify-center font-heading">
                W
              </span>
              <span className="font-heading font-semibold text-sm sm:text-base tracking-tight text-white flex items-center gap-2">
                Work &amp; Share 공간 갤러리
                <span className="text-[11px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  {currentIndex + 1} / {GALLERY_PHOTOS.length}
                </span>
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Photo Display Area */}
          <div className="relative flex-1 min-h-[300px] sm:min-h-[420px] bg-black flex items-center justify-center overflow-hidden group">
            {/* eslint-disable-next-html-element-suppression */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentPhoto.src}
              alt={currentPhoto.title}
              className="w-full h-full object-contain max-h-[60vh] transition-transform duration-300"
            />

            {/* Nav Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-[#0071e3] transition-all shadow-lg backdrop-blur-sm"
              aria-label="이전 사진"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-[#0071e3] transition-all shadow-lg backdrop-blur-sm"
              aria-label="다음 사진"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Info Bar */}
          <div className="p-5 bg-black/60 border-t border-white/10 shrink-0 space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#2997ff] font-semibold block mb-1">
                  {currentPhoto.category}
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-semibold text-white">
                  {currentPhoto.title}
                </h3>
              </div>
              <p className="text-xs text-slate-300 font-normal">{currentPhoto.desc}</p>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 overflow-x-auto pt-2 scrollbar-none">
              {GALLERY_PHOTOS.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    idx === currentIndex ? "border-[#0071e3] scale-105" : "border-transparent opacity-50 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo.src} alt={photo.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
