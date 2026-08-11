"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Sparkles, ChevronRight, BookOpenCheck, ShieldCheck, Users, MessageSquare, BookOpen, Coffee } from "lucide-react";
import { ResponsiveLeadForm } from "@/components/ui/ResponsiveLeadForm";

export function Hero() {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative pt-28 pb-20 overflow-hidden bg-white text-[#1d1d1f]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Apple Style Floating Eyebrow Pill */}
        <motion.div variants={itemVariants} className="inline-block">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5f5f7] text-[#6e6e73] text-xs font-medium mb-6 border border-black/10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#0071e3] animate-pulse" />
            <span>Questionity Daehangno · Founding Member Opening</span>
          </div>
        </motion.div>

        {/* Apple Iconic Large Headline */}
        <motion.h1
          variants={itemVariants}
          className="font-heading text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] mb-6 text-[#1d1d1f]"
        >
          질문이 모여 지성이 되는 공간, <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066cc] via-[#0071e3] to-[#2997ff]">
            Questionity
          </span>
          .
        </motion.h1>

        {/* Apple Subtitle */}
        <motion.div variants={itemVariants} className="space-y-4 max-w-3xl mx-auto mb-8">
          <p className="text-lg sm:text-2xl text-[#6e6e73] font-normal leading-relaxed break-keep">
            대학로 소극장의 열기와 독서가 만나는 복합 지성 커뮤니티. <br className="hidden sm:inline" />
            첫 여정을 함께할 <span className="text-[#1d1d1f] font-semibold">파운딩 멤버 100인</span>을 모십니다.
          </p>

          {/* Authentic Pre-launch Notice Banner */}
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#f5f5f7] border border-black/10 text-[#6e6e73] text-xs sm:text-sm text-left sm:text-center shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#0066cc] shrink-0" />
            <span>
              본 페이지의 독서 모임과 리뷰는 여러분을 위해 <strong className="text-[#1d1d1f]">AI가 예측한 가상 프리뷰</strong>입니다.
              원하는 모임의 첫 번째 대기자가 되어주세요.
            </span>
          </div>
        </motion.div>

        {/* Apple Style Dual CTA */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={() => setIsLeadFormOpen(true)}
            className="apple-button-primary px-7 py-3.5 text-sm font-medium flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all group"
          >
            <Sparkles className="w-4 h-4" />
            <span>파운딩 멤버 1호 신청하기</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#preview-section"
            className="apple-link text-sm font-medium flex items-center gap-1 py-2 px-3 hover:text-[#0055b3] transition-all break-keep"
          >
            <BookOpenCheck className="w-4 h-4 text-[#0066cc]" />
            <span>AI 가상 모임 둘러보기</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Key Feature Specs (Apple Light Grid Style) */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-xs text-[#6e6e73]">
          <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/10 flex items-center gap-3">
            <Users className="w-5 h-5 text-[#0066cc] flex-shrink-0" />
            <div className="text-left">
              <div className="font-semibold text-[#1d1d1f]">파운딩 100인 한정</div>
              <div className="text-[11px]">우선 공간 이용 혜택</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/10 flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <div className="text-left">
              <div className="font-semibold text-[#1d1d1f]">Proactive AI 챗봇</div>
              <div className="text-[11px]">MBTI &amp; 알라딘 도서 타로</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/10 flex items-center gap-3">
            <Coffee className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div className="text-left">
              <div className="font-semibold text-[#1d1d1f]">Work &amp; Share 연동</div>
              <div className="text-[11px]">대학로 마로니에 라운지</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/10 flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-purple-600 flex-shrink-0" />
            <div className="text-left">
              <div className="font-semibold text-[#1d1d1f]">Authentic Pre-launch</div>
              <div className="text-[11px]">투명한 콜드스타트극복</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <ResponsiveLeadForm isOpen={isLeadFormOpen} onClose={() => setIsLeadFormOpen(false)} />
    </section>
  );
}
