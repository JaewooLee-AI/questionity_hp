"use client";

import React, { useEffect, useState } from "react";
import { X, Sparkles, ThumbsUp, BookOpen, Star, MapPin, Users, Layers, Calendar, Tag, ShieldCheck, Edit3, Send, Loader2, MessageSquare } from "lucide-react";
import { VirtualRoom, VirtualReview } from "@/lib/mockData";
import { submitReviewAction } from "@/app/actions/submitReview";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import confetti from "canvas-confetti";

interface RoomDetailModalProps {
  room: VirtualRoom | null;
  onClose: () => void;
  onOpenLeadForm: (bookTitle: string, roomId?: string) => void;
}

export function RoomDetailModal({ room, onClose, onOpenLeadForm }: RoomDetailModalProps) {
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [personaRole, setPersonaRole] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const [roomReviews, setRoomReviews] = useState<any[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  // Fetch real reviews for this specific room
  const fetchRoomReviews = async (roomId: string) => {
    setIsLoadingReviews(true);
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("room_id", roomId)
        .order("created_at", { ascending: false });

      if (data && !error) {
        setRoomReviews(data);
      }
    } catch (err) {
      console.warn("Error fetching room reviews:", err);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  useEffect(() => {
    if (room?.id) {
      fetchRoomReviews(room.id);
    }
  }, [room?.id]);

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

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewContent.trim()) {
      toast.error("이름과 후기 내용을 입력해 주세요.");
      return;
    }

    setIsSubmittingReview(true);
    try {
      const res = await submitReviewAction({
        room_id: room.id,
        book_title: room.book_title || room.title,
        author_name: authorName,
        persona_or_role: personaRole,
        content: reviewContent,
      });

      if (res.success) {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
        toast.success("소중한 모임 후기가 성공적으로 등록되었습니다! 🎉");
        setAuthorName("");
        setPersonaRole("");
        setReviewContent("");
        setIsWriteReviewOpen(false);
        fetchRoomReviews(room.id); // Refresh review list instantly
      } else {
        toast.error("후기 등록 중 오류가 발생했습니다.", { description: res.error });
      }
    } catch (err) {
      toast.error("네트워크 오류가 발생했습니다.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

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
        <div className="flex flex-wrap items-center gap-2 pr-16 sm:pr-20">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              room.is_custom_created
                ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/30"
                : "bg-[#0071e3]/10 text-[#0066cc] border border-[#0071e3]/20"
            }`}
          >
            {room.is_custom_created ? <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Sparkles className="w-3.5 h-3.5 text-[#0066cc]" />}
            {room.is_custom_created ? "👑 관리자 확정 개설" : "✨ AI 큐레이션 독서방"}
          </span>

          <span className="text-xs font-mono text-[#6e6e73] bg-[#f5f5f7] px-2.5 py-1 rounded-full border border-black/5">
            {room.meeting_type === "online" ? "💻 온라인 진행" : "📍 오프라인 라운지"}
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
                  📖 {room.book_title} {room.book_author ? `| 저자: ${room.book_author}` : ""} {room.publisher ? `(${room.publisher})` : ""}
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

        {/* Detailed Spec Grid (Admin Schema Supported) */}
        <div className="grid grid-cols-2 gap-3 text-xs bg-[#f5f5f7] p-4 rounded-2xl border border-black/5">
          <div className="flex items-center gap-2 text-[#6e6e73]">
            <MapPin className="w-4 h-4 text-[#0066cc] shrink-0" />
            <div>
              <div className="font-medium text-[#1d1d1f]">모임 장소</div>
              <div>{room.location || "대학로 Work & Share 라운지"}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#6e6e73]">
            <Calendar className="w-4 h-4 text-[#0066cc] shrink-0" />
            <div>
              <div className="font-medium text-[#1d1d1f]">일시 및 일정</div>
              <div>{room.schedule_text || "매주 수요일 19:30 (10/15 개강)"}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#6e6e73]">
            <Tag className="w-4 h-4 text-[#0066cc] shrink-0" />
            <div>
              <div className="font-medium text-[#1d1d1f]">참가 비용</div>
              <div className="text-[#0066cc] font-semibold">{room.price_text || "파운딩 0원 (무료)"}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#6e6e73]">
            <Users className="w-4 h-4 text-[#0066cc] shrink-0" />
            <div>
              <div className="font-medium text-[#1d1d1f]">선착순 정원</div>
              <div>최대 {room.max_capacity || 12}명 (선착순 마감)</div>
            </div>
          </div>
        </div>

        {/* 💬 Submitted Reviews & Impressions Section */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="font-heading text-xs font-semibold text-[#0066cc] uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-[#0066cc]" /> 등록된 멤버 후기 및 기대평 ({roomReviews.length}개)
            </h4>
            <button
              onClick={() => setIsWriteReviewOpen(!isWriteReviewOpen)}
              className="text-xs font-semibold text-[#0066cc] bg-[#0071e3]/10 hover:bg-[#0071e3]/20 border border-[#0071e3]/20 px-2.5 py-1 rounded-lg transition-all flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" /> 후기 작성
            </button>
          </div>

          {/* User Review Submission Drawer / Form Accordion */}
          {isWriteReviewOpen && (
            <form onSubmit={handleReviewSubmit} className="bg-[#f5f5f7] border border-[#0071e3]/30 p-4 rounded-2xl space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h5 className="font-heading text-xs font-semibold text-[#0066cc] flex items-center gap-1">
                  <Edit3 className="w-3.5 h-3.5" /> ✍️ 모임 후기 및 감상평 작성하기
                </h5>
                <button type="button" onClick={() => setIsWriteReviewOpen(false)} className="text-xs text-[#86868b] hover:text-[#1d1d1f]">
                  취소
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="작성자 이름 (예: 홍길동)"
                  className="p-2 bg-white rounded-lg border border-black/10 text-xs text-[#1d1d1f]"
                  required
                />
                <input
                  type="text"
                  value={personaRole}
                  onChange={(e) => setPersonaRole(e.target.value)}
                  placeholder="직무/연차 (예: 3년차 기획자)"
                  className="p-2 bg-white rounded-lg border border-black/10 text-xs text-[#1d1d1f]"
                />
              </div>
              <textarea
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                placeholder="책을 읽고 느낀 점이나 모임에서 공유하고 싶은 생생한 후기를 남겨주세요."
                rows={3}
                className="w-full p-2 bg-white rounded-lg border border-black/10 text-xs text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                required
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="apple-button-primary px-4 py-2 text-xs flex items-center gap-1 shadow-sm"
                >
                  {isSubmittingReview ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>후기 제출하기</span>
                </button>
              </div>
            </form>
          )}

          {/* List of Reviews */}
          {roomReviews.length === 0 ? (
            <div className="p-4 bg-[#f5f5f7] rounded-2xl text-xs text-[#86868b] text-center border border-black/5">
              아직 작성된 모임 후기가 없습니다. 첫 번째 후기를 작성해 보세요!
            </div>
          ) : (
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {roomReviews.map((rev) => (
                <div
                  key={rev.id}
                  className={`p-3.5 rounded-2xl border text-xs text-left space-y-1.5 transition-all ${
                    rev.is_ai_generated === false
                      ? "bg-emerald-500/5 border-emerald-500/30"
                      : "bg-[#f5f5f7] border-black/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-semibold px-2 py-0.5 rounded-md text-[10px] ${
                        rev.is_ai_generated === false
                          ? "bg-emerald-500/20 text-emerald-800"
                          : "bg-black/5 text-[#6e6e73]"
                      }`}
                    >
                      {rev.is_ai_generated === false ? "🌟 실제 파운딩 멤버 후기" : "🤖 AI 예측 기대평"}
                    </span>
                    <span className="text-[10px] text-[#86868b] font-mono">
                      {rev.fake_user_persona || "멤버"}
                    </span>
                  </div>
                  <p className="text-[#1d1d1f] leading-relaxed whitespace-pre-line font-normal">{rev.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-wrap items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="apple-button-secondary px-4 py-2 text-xs font-medium"
          >
            닫기
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenLeadForm(room.title, room.id);
            }}
            className="apple-button-primary px-5 py-2 text-xs font-semibold shadow-md flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" />
            <span>1호 파운딩 대기자 신청</span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface ReviewDetailModalProps {
  review: VirtualReview | null;
  onClose: () => void;
  onOpenLeadForm: (bookTitle: string, roomId?: string) => void;
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
          <div className="flex items-center gap-1 text-amber-500 font-semibold text-xs bg-[#f5f5f7] px-2.5 py-1 rounded-full border border-black/5">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{review.rating || 5.0}</span>
          </div>
        </div>

        {/* Review Title & Author */}
        <div className="space-y-1">
          <h3 className="font-heading text-xl font-semibold text-[#1d1d1f] leading-snug">
            도서명: {review.book_title}
          </h3>
          <p className="text-xs font-medium text-[#0066cc]">
            저자: {review.author} | {review.fake_user_persona}
          </p>
        </div>

        {/* Review Content */}
        <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/5 text-xs text-[#1d1d1f] leading-relaxed whitespace-pre-line max-h-60 overflow-y-auto font-normal">
          {review.content}
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
              onOpenLeadForm(review.book_title, review.room_id);
            }}
            className="apple-button-primary px-6 py-2.5 text-xs font-semibold shadow-md flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" />
            <span>나도 이 방에 1호 대기자 신청하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
