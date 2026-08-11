"use client";

import React, { useEffect } from "react";
import { X, Sparkles, ThumbsUp, BookOpen, Star, MapPin, Users, Layers } from "lucide-react";
import { VirtualRoom, VirtualReview } from "@/lib/mockData";

interface RoomDetailModalProps {
  room: VirtualRoom | null;
  onClose: () => void;
  onOpenLeadForm: (bookTitle: string) => void;
}

export function RoomDetailModal({ room, onClose, onOpenLeadForm }: RoomDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (room) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [room, onClose]);

  if (!room) return null;

  // Format curriculum_json
  let curriculumList: string[] = [];
  if (Array.isArray(room.curriculum_json)) {
    curriculumList = room.curriculum_json;
  } else if (typeof room.curriculum_json === "object" && room.curriculum_json !== null) {
    curriculumList = Object.entries(room.curriculum_json).map(([week, text]) => `${week}: ${text}`);
  } else {
    curriculumList = [
      "1주차: 도서의 서사 구조 및 핵심 질문 발굴",
      "2주차: 대학로 소극장 가치와의 텍스트 융합 토론",
      "3주차: 오프라인 라이브 소모임 및 생각 확장",
      "4주차: 나만의 파운딩 독후감 에세이 완성"
    ];
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-white border border-black/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-left space-y-6 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
      >
        {/* Highly Visible Prominent Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#1d1d1f] bg-[#f5f5f7] hover:bg-[#e8e8ed] border border-black/10 p-2 sm:p-2.5 rounded-full shadow-xs transition-all z-10 flex items-center gap-1"
          aria-label="닫기"
        >
          <X className="w-5 h-5 text-[#1d1d1f]" />
          <span className="hidden sm:inline text-xs font-semibold pr-1">닫기</span>
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-2 pr-16 sm:pr-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0071e3]/10 text-[#0066cc] border border-[#0071e3]/20">
            <Sparkles className="w-3.5 h-3.5" /> ✨ AI Predicted Room
          </span>
          <span className="text-xs font-mono text-[#6e6e73] bg-[#f5f5f7] px-2.5 py-1 rounded-full border border-black/5">
            Admin Sync Ready
          </span>
        </div>

        {/* Room Header with Book Image */}
        <div className="flex flex-col sm:flex-row gap-5 items-start">
          {/* Book Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={room.book_image_url || "https://image.aladin.co.kr/product/31562/22/coversum/k232832857_1.jpg"}
            alt={room.title}
            className="w-28 h-40 object-cover rounded-2xl border border-black/10 shadow-md shrink-0 mx-auto sm:mx-0"
          />

          <div className="space-y-2.5 flex-1">
            <div>
              <h3 className="font-heading text-2xl font-semibold text-[#1d1d1f] tracking-tight leading-snug">
                {room.title}
              </h3>
              {room.book_title && (
                <p className="text-xs font-semibold text-[#0066cc] mt-1">
                  📖 {room.book_title} {room.book_author ? `| 저자: ${room.book_author}` : ""}
                </p>
              )}
            </div>

            {(room.book_description || room.description) && (
              <div className="p-3 rounded-xl bg-[#f5f5f7] border border-black/5 text-xs text-[#6e6e73] space-y-1">
                <div className="font-semibold text-[#1d1d1f] flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-[#0066cc]" /> 도서 핵심 요약 설명
                </div>
                <p className="leading-relaxed line-clamp-4">{room.book_description || room.description}</p>
              </div>
            )}

            <div className="p-3 rounded-xl bg-[#f5f5f7] border border-black/5 text-xs text-[#6e6e73] space-y-1">
              <div className="font-semibold text-[#1d1d1f] flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#0066cc]" /> 타깃 페르소나
              </div>
              <p className="leading-relaxed">{room.target_audience || "지적 호기심과 성찰을 바라는 모든 파운딩 멤버"}</p>
            </div>
          </div>
        </div>

        {/* 4-Week Curriculum */}
        <div className="space-y-3">
          <h4 className="font-heading text-xs font-semibold text-[#0066cc] uppercase tracking-wider flex items-center gap-1">
            <Layers className="w-4 h-4 text-[#0066cc]" /> 4주 커리큘럼 로드맵 (Curriculum)
          </h4>
          <div className="grid grid-cols-1 gap-2 text-xs">
            {curriculumList.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#f5f5f7] border border-black/5 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#0071e3] text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-[#1d1d1f] font-medium leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Spec Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs bg-[#f5f5f7] p-4 rounded-2xl border border-black/5">
          <div className="flex items-center gap-2 text-[#6e6e73]">
            <MapPin className="w-4 h-4 text-[#0066cc] shrink-0" />
            <div>
              <div className="font-medium text-[#1d1d1f]">대학로 오프라인</div>
              <div>Work &amp; Share 라운지</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#6e6e73]">
            <ThumbsUp className="w-4 h-4 text-[#0066cc] shrink-0" />
            <div>
              <div className="font-medium text-[#1d1d1f]">현재 개설 투표</div>
              <div>{room.vote_count || 45}명 찬성 등록</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="apple-button-secondary px-5 py-2.5 text-xs font-medium"
          >
            닫기
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenLeadForm(room.title);
            }}
            className="apple-button-primary px-6 py-2.5 text-xs font-semibold shadow-md flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>이 독서방 1호 대기자 신청</span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface ReviewDetailModalProps {
  review: VirtualReview | null;
  onClose: () => void;
  onOpenLeadForm: (bookTitle: string) => void;
}

export function ReviewDetailModal({ review, onClose, onOpenLeadForm }: ReviewDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (review) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [review, onClose]);

  if (!review) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white border border-black/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-left space-y-6 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
      >
        {/* Highly Visible Prominent Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#1d1d1f] bg-[#f5f5f7] hover:bg-[#e8e8ed] border border-black/10 p-2 sm:p-2.5 rounded-full shadow-xs transition-all z-10 flex items-center gap-1"
          aria-label="닫기"
        >
          <X className="w-5 h-5 text-[#1d1d1f]" />
          <span className="hidden sm:inline text-xs font-semibold pr-1">닫기</span>
        </button>

        {/* Header Badge */}
        <div className="flex items-center justify-between pr-16 sm:pr-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0071e3]/10 text-[#0066cc] border border-[#0071e3]/20">
            <Sparkles className="w-3.5 h-3.5" /> ✨ AI Predicted 독후감
          </span>
          <div className="flex items-center gap-1 text-amber-500 font-bold text-xs bg-[#f5f5f7] px-2.5 py-1 rounded-full border border-black/5">
            <Star className="w-3.5 h-3.5 fill-amber-500" />
            <span>{review.rating || 5.0} / 5.0</span>
          </div>
        </div>

        {/* Book & Reviewer Meta */}
        <div className="space-y-1">
          <h3 className="font-heading text-2xl font-semibold text-[#1d1d1f] tracking-tight">
            《{review.book_title}》
          </h3>
          <p className="text-xs text-[#0066cc] font-medium">저자: {review.author}</p>
          <p className="text-xs text-[#6e6e73]">작성자 페르소나: {review.fake_user_persona}</p>
        </div>

        {/* Review Text Quote Box */}
        <div className="bg-[#f5f5f7] p-5 rounded-2xl border border-black/5 space-y-3">
          <p className="text-sm text-[#1d1d1f] font-normal leading-relaxed italic">
            &quot;{review.content}&quot;
          </p>
          <p className="text-xs text-[#6e6e73] font-normal leading-relaxed pt-2 border-t border-black/5">
            💡 <strong>AI 지성 인사이트:</strong> 이 독후감은 어드민 대시보드 핫 트렌드 분석을 통해 기획되었으며, 대학로 커뮤니티의 철학적 소통 가치를 나타냅니다.
          </p>
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="apple-button-secondary px-5 py-2.5 text-xs font-medium"
          >
            닫기
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenLeadForm(review.book_title);
            }}
            className="apple-button-primary px-6 py-2.5 text-xs font-semibold shadow-md flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>이 책으로 독서방 개설 신청</span>
          </button>
        </div>
      </div>
    </div>
  );
}
