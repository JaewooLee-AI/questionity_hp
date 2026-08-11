"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ThumbsUp, BookOpen, Star, Info, ShieldCheck } from "lucide-react";
import { VirtualRoom, VirtualReview } from "@/lib/mockData";
import { ResponsiveLeadForm } from "@/components/ui/ResponsiveLeadForm";
import { RoomDetailModal, ReviewDetailModal } from "@/components/ui/DetailModals";

interface MarqueeProps {
  rooms: VirtualRoom[];
  reviews: VirtualReview[];
}

export function Marquee({ rooms, reviews }: MarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>(undefined);

  const [activeRoomDetail, setActiveRoomDetail] = useState<VirtualRoom | null>(null);
  const [activeReviewDetail, setActiveReviewDetail] = useState<VirtualReview | null>(null);

  const duplicatedRooms = [...rooms, ...rooms, ...rooms];
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  const handleOpenLead = (bookTitle: string, roomId?: string) => {
    setSelectedBook(bookTitle);
    setSelectedRoomId(roomId);
  };

  return (
    <div className="space-y-10 overflow-hidden py-4">
      {/* 1st Row: Virtual Reading Rooms with Book Cover Image */}
      <div className="relative w-full overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: isPaused ? undefined : ["0%", "-33.33%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 75,
          }}
        >
          {duplicatedRooms.map((room, idx) => (
            <div
              key={`room-${room.id}-${idx}`}
              onClick={() => setActiveRoomDetail(room)}
              className="w-[320px] sm:w-[380px] shrink-0 bg-[#f5f5f7] border border-black/10 hover:border-[#0071e3]/40 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl cursor-pointer group"
            >
              <div className="space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                      room.is_custom_created
                        ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/30"
                        : "bg-white text-[#0066cc] border border-black/10 shadow-2xs"
                    }`}
                  >
                    {room.is_custom_created ? <ShieldCheck className="w-3 h-3 text-emerald-600" /> : <Sparkles className="w-3 h-3 text-[#0066cc]" />}
                    {room.is_custom_created ? "관리자 개설" : `${room.predicted_by || "AI"} Predicted`}
                  </span>
                  <span className="text-[11px] font-mono text-[#6e6e73] bg-white px-2 py-0.5 rounded-md border border-black/5">
                    {room.meeting_type === "online" ? "온라인" : "대학로 오프라인"}
                  </span>
                </div>

                <div className="flex gap-3 pt-1">
                  {/* Book Cover Image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={room.book_image_url || "https://image.aladin.co.kr/product/31562/22/coversum/k232832857_1.jpg"}
                    alt={room.title}
                    className="w-20 h-28 object-cover rounded-xl border border-black/10 shadow-sm shrink-0 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="space-y-1.5 flex-1">
                    <h4 className="font-heading text-base font-semibold text-[#1d1d1f] group-hover:text-[#0066cc] transition-colors line-clamp-2 leading-snug">
                      {room.title}
                    </h4>
                    <p className="text-xs text-[#6e6e73] font-normal leading-relaxed line-clamp-2">
                      {room.target_audience ? `🎯 ${room.target_audience}` : room.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-4 border-t border-black/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-[#6e6e73]">
                  <ThumbsUp className="w-3.5 h-3.5 text-[#0066cc]" />
                  <span>투표 {room.vote_count || 40}명</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenLead(room.title, room.id);
                  }}
                  className="apple-button-primary px-3.5 py-1.5 text-xs flex items-center gap-1 shadow-sm active:scale-95 transition-all"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>이 방 개설 투표</span>
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 2nd Row: AI Predicted Reviews */}
      <div className="relative w-full overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: isPaused ? undefined : ["-33.33%", "0%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 85,
          }}
        >
          {duplicatedReviews.map((rev, idx) => (
            <div
              key={`rev-${rev.id}-${idx}`}
              onClick={() => setActiveReviewDetail(rev)}
              className="w-[320px] sm:w-[380px] shrink-0 bg-[#f5f5f7] border border-black/10 hover:border-[#0071e3]/40 rounded-3xl p-5 flex flex-col justify-between transition-all hover:shadow-xl cursor-pointer text-left group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#6e6e73]">
                  <span className="font-semibold text-[#0066cc] font-heading group-hover:underline">《{rev.book_title}》</span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3 h-3 fill-amber-500" />
                    <span className="font-bold text-xs">{rev.rating || 5.0}</span>
                  </div>
                </div>
                <p className="text-xs text-[#1d1d1f] font-normal leading-relaxed line-clamp-2">&quot;{rev.content}&quot;</p>
              </div>

              <div className="pt-3 mt-3 border-t border-black/5 flex items-center justify-between text-[11px] text-[#6e6e73]">
                <span>저자: {rev.author}</span>
                <span className="text-[#0066cc] font-medium flex items-center gap-1">
                  <span>✨ {rev.fake_user_persona}</span>
                  <Info className="w-3 h-3 text-[#86868b] opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Room Detail Modal */}
      <RoomDetailModal
        room={activeRoomDetail}
        onClose={() => setActiveRoomDetail(null)}
        onOpenLeadForm={(bookTitle, roomId) => handleOpenLead(bookTitle, roomId)}
      />

      {/* Review Detail Modal */}
      <ReviewDetailModal
        review={activeReviewDetail}
        onClose={() => setActiveReviewDetail(null)}
        onOpenLeadForm={(bookTitle, roomId) => handleOpenLead(bookTitle, roomId)}
      />

      {/* Lead Collection Form Modal */}
      <ResponsiveLeadForm
        isOpen={Boolean(selectedBook)}
        onClose={() => {
          setSelectedBook(null);
          setSelectedRoomId(undefined);
        }}
        defaultBookTitle={selectedBook || undefined}
        defaultRoomId={selectedRoomId}
      />
    </div>
  );
}
