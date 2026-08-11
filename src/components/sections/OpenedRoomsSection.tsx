"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, Calendar, MapPin, Users, BookOpen, ShieldCheck, Tag, ArrowRight } from "lucide-react";
import { FALLBACK_VIRTUAL_ROOMS, VirtualRoom } from "@/lib/mockData";
import { supabase } from "@/lib/supabase/client";
import { RoomDetailModal } from "@/components/ui/DetailModals";
import { ResponsiveLeadForm } from "@/components/ui/ResponsiveLeadForm";

export function OpenedRoomsSection() {
  const [rooms, setRooms] = useState<VirtualRoom[]>(FALLBACK_VIRTUAL_ROOMS);
  const [activeRoomDetail, setActiveRoomDetail] = useState<VirtualRoom | null>(null);
  const [selectedBookTitle, setSelectedBookTitle] = useState<string | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>(undefined);

  const fetchRooms = async () => {
    try {
      const { data: roomsData, error } = await supabase
        .from("rooms")
        .select("id, title, book_title, book_author, book_description, book_image_url, publisher, target_audience, curriculum_json, meeting_type, location, schedule_text, price_text, max_capacity, created_at, is_ai_generated, is_custom_created")
        .order("created_at", { ascending: false });

      if (roomsData && roomsData.length > 0 && !error) {
        const parsed = roomsData.map((r: any) => ({
          id: r.id,
          title: r.title,
          book_title: r.book_title || r.title,
          book_author: r.book_author || "저자 미상",
          book_description: r.book_description || r.target_audience || "질문이 이끄는 4주 독서 커뮤니티",
          description: r.book_description ? `${r.book_description.slice(0, 100)}...` : r.target_audience,
          book_image_url: r.book_image_url || "https://image.aladin.co.kr/product/31562/22/coversum/k232832857_1.jpg",
          publisher: r.publisher || "출판사",
          target_audience: r.target_audience || "지적 호기심을 지닌 파운딩 멤버",
          curriculum_json: r.curriculum_json,
          meeting_type: r.meeting_type || "offline",
          location: r.location || "대학로 Work & Share 라운지",
          schedule_text: r.schedule_text || "매주 수요일 19:30 (선착순 개강)",
          price_text: r.price_text || "파운딩 0원 (무료)",
          max_capacity: r.max_capacity || 12,
          is_ai_generated: r.is_ai_generated ?? true,
          is_custom_created: r.is_custom_created ?? true,
          predicted_by: r.is_custom_created ? "관리자 확정 개설" : "AI 큐레이션",
          vote_count: 80,
        }));

        setRooms([...parsed, ...FALLBACK_VIRTUAL_ROOMS]);
      } else {
        setRooms(FALLBACK_VIRTUAL_ROOMS);
      }
    } catch (err) {
      console.warn("OpenedRoomsSection Supabase fetch error, fallback used:", err);
      setRooms(FALLBACK_VIRTUAL_ROOMS);
    }
  };

  useEffect(() => {
    fetchRooms();

    const channel = supabase
      .channel("public:rooms:opened")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "rooms" },
        () => {
          fetchRooms();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleOpenForm = (bookTitle: string, roomId?: string) => {
    setSelectedBookTitle(bookTitle);
    setSelectedRoomId(roomId);
  };

  return (
    <section id="opened-rooms-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-white border-t border-black/5">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0071e3]/10 text-[#0066cc] border border-[#0071e3]/20">
          <ShieldCheck className="w-3.5 h-3.5" /> 대학로 현장 실제 개설 독서 모임
        </span>
        <h2 className="font-heading text-3xl sm:text-5xl font-semibold text-[#1d1d1f] tracking-tight">
          지금 모집 중인 <br className="sm:hidden" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066cc] via-[#0071e3] to-[#2997ff]">
            실제 개설 독서방
          </span>
        </h2>
        <p className="text-base sm:text-lg text-[#6e6e73] font-normal leading-relaxed break-keep">
          어드민 관리자가 확정 개설한 대학로 Work &amp; Share 오프라인 모임입니다. 마음에 드는 독서방을 선택하고 1호 파운딩 대기자로 참여하세요.
        </p>
      </div>

      {/* Grid of Opened Real Rooms */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
        {rooms.slice(0, 6).map((room) => (
          <div
            key={room.id}
            onClick={() => setActiveRoomDetail(room)}
            className="group relative bg-[#f5f5f7] border border-black/10 hover:border-[#0071e3]/50 rounded-3xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-2xl"
          >
            <div className="space-y-4">
              {/* Badge & Schedule */}
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                    room.is_custom_created
                      ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/30"
                      : "bg-white text-[#0066cc] border border-black/10 shadow-2xs"
                  }`}
                >
                  {room.is_custom_created ? <ShieldCheck className="w-3 h-3 text-emerald-600" /> : <Sparkles className="w-3 h-3 text-[#0066cc]" />}
                  {room.is_custom_created ? "👑 관리자 확정 개설" : "✨ AI 큐레이션 독서방"}
                </span>

                <span className="text-[11px] font-mono text-[#6e6e73] bg-white px-2 py-0.5 rounded-md border border-black/5">
                  {room.meeting_type === "online" ? "온라인" : "대학로 오프라인"}
                </span>
              </div>

              {/* Cover & Title */}
              <div className="flex gap-4 items-start pt-1">
                {/* eslint-disable-next-html-element-suppression */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={room.book_image_url || "https://image.aladin.co.kr/product/31562/22/coversum/k232832857_1.jpg"}
                  alt={room.title}
                  className="w-24 h-34 object-cover rounded-xl border border-black/10 shadow-md shrink-0 group-hover:scale-105 transition-transform duration-300"
                />

                <div className="space-y-1.5 flex-1 min-w-0">
                  <h3 className="font-heading text-lg font-semibold text-[#1d1d1f] group-hover:text-[#0066cc] transition-colors leading-snug line-clamp-2">
                    {room.title}
                  </h3>
                  {room.book_title && (
                    <p className="text-xs font-semibold text-[#0066cc] line-clamp-1">
                      📖 {room.book_title} {room.book_author ? `| ${room.book_author}` : ""}
                    </p>
                  )}
                  <p className="text-xs text-[#6e6e73] font-normal leading-relaxed line-clamp-2 pt-0.5">
                    {room.target_audience}
                  </p>
                </div>
              </div>

              {/* Spec Pills */}
              <div className="bg-white/80 border border-black/5 p-3 rounded-2xl space-y-1.5 text-xs text-[#6e6e73]">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#0066cc] shrink-0" />
                  <span className="font-medium text-[#1d1d1f]">{room.schedule_text || "매주 수요일 19:30 (개강)"}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-black/5">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#0066cc]" />
                    <span>{room.location || "대학로 Work & Share"}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#0066cc] font-semibold">
                    <Tag className="w-3 h-3 text-[#0066cc]" />
                    <span>{room.price_text || "파운딩 무료"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 mt-4 border-t border-black/10 flex items-center justify-between gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveRoomDetail(room);
                }}
                className="apple-button-secondary text-xs px-3 py-1.5 flex items-center gap-1"
              >
                <span>4주 로드맵</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenForm(room.title, room.id);
                }}
                className="apple-button-primary text-xs px-4 py-2 flex items-center gap-1 shadow-sm active:scale-95 transition-all"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>1호 대기자 신청</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Room Detail Modal */}
      <RoomDetailModal
        room={activeRoomDetail}
        onClose={() => setActiveRoomDetail(null)}
        onOpenLeadForm={(bookTitle, roomId) => handleOpenForm(bookTitle, roomId)}
      />

      {/* Lead Collection Form Modal */}
      <ResponsiveLeadForm
        isOpen={Boolean(selectedBookTitle)}
        onClose={() => {
          setSelectedBookTitle(null);
          setSelectedRoomId(undefined);
        }}
        defaultBookTitle={selectedBookTitle || undefined}
        defaultRoomId={selectedRoomId}
      />
    </section>
  );
}
