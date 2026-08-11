"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, Calendar, MapPin, Users, BookOpen, ShieldCheck, Tag, ArrowRight, Search, CheckCircle2, Clock, Flame } from "lucide-react";
import { FALLBACK_VIRTUAL_ROOMS, VirtualRoom } from "@/lib/mockData";
import { supabase } from "@/lib/supabase/client";
import { RoomDetailModal } from "@/components/ui/DetailModals";
import { ResponsiveLeadForm } from "@/components/ui/ResponsiveLeadForm";

export function OpenedRoomsSection() {
  const [rooms, setRooms] = useState<VirtualRoom[]>([]);
  const [activeRoomDetail, setActiveRoomDetail] = useState<VirtualRoom | null>(null);
  const [selectedBookTitle, setSelectedBookTitle] = useState<string | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>(undefined);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusTab, setSelectedStatusTab] = useState<"all" | "recruiting" | "in_progress" | "completed">("all");

  const fetchRooms = async () => {
    try {
      const { data: roomsData, error } = await supabase
        .from("rooms")
        .select("*")
        .order("created_at", { ascending: false });

      if (roomsData && roomsData.length > 0 && !error) {
        const parsed = roomsData.map((r: any) => {
          const isCustom = r.is_custom_created === true || r.is_ai_generated === false;
          return {
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
            status: r.status || "recruiting",
            is_ai_generated: r.is_ai_generated ?? !isCustom,
            is_custom_created: isCustom,
            predicted_by: "관리자 확정 개설",
            vote_count: 80,
          };
        });

        // Filter ONLY admin custom created rooms for this section
        const customOnlyRooms = parsed.filter((r: VirtualRoom) => r.is_custom_created);
        
        if (customOnlyRooms.length > 0) {
          setRooms(customOnlyRooms);
        } else {
          setRooms(FALLBACK_VIRTUAL_ROOMS.filter((r) => r.is_custom_created));
        }
      } else {
        setRooms(FALLBACK_VIRTUAL_ROOMS.filter((r) => r.is_custom_created));
      }
    } catch (err) {
      console.warn("OpenedRoomsSection Supabase fetch error, fallback used:", err);
      setRooms(FALLBACK_VIRTUAL_ROOMS.filter((r) => r.is_custom_created));
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

  // Filtered Rooms Logic
  const filteredRooms = rooms.filter((r) => {
    // 1. Search Query Filter
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      (r.title && r.title.toLowerCase().includes(query)) ||
      (r.book_title && r.book_title.toLowerCase().includes(query)) ||
      (r.book_author && r.book_author.toLowerCase().includes(query));

    // 2. Status Tab Filter
    const roomStatus = r.status || "recruiting";
    const matchesStatus =
      selectedStatusTab === "all" ||
      (selectedStatusTab === "recruiting" && (roomStatus === "recruiting" || roomStatus === "open")) ||
      (selectedStatusTab === "in_progress" && roomStatus === "in_progress") ||
      (selectedStatusTab === "completed" && (roomStatus === "completed" || roomStatus === "closed"));

    return matchesSearch && matchesStatus;
  });

  return (
    <section id="opened-rooms-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-white border-t border-black/5">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0071e3]/10 text-[#0066cc] border border-[#0071e3]/20">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 대학로 현장 실제 개설 독서 모임
        </span>
        <h2 className="font-heading text-3xl sm:text-5xl font-semibold text-[#1d1d1f] tracking-tight">
          지금 모집 중인 <br className="sm:hidden" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066cc] via-[#0071e3] to-[#2997ff]">
            실제 개설 독서방 ({filteredRooms.length}개)
          </span>
        </h2>
        <p className="text-base sm:text-lg text-[#6e6e73] font-normal leading-relaxed break-keep">
          어드민 관리자가 직접 확정 개설한 대학로 Work &amp; Share 오프라인 모임입니다. 마음에 드는 독서방을 선택하고 1호 파운딩 대기자로 참여하세요.
        </p>
      </div>

      {/* 🔍 Search Bar & Status Filter Tabs Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-[#f5f5f7] p-3 sm:p-4 rounded-2xl border border-black/5">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-black/10 shadow-xs w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setSelectedStatusTab("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              selectedStatusTab === "all" ? "bg-[#0071e3] text-white shadow-xs" : "text-[#6e6e73] hover:text-[#1d1d1f]"
            }`}
          >
            전체 ({rooms.length})
          </button>
          <button
            onClick={() => setSelectedStatusTab("recruiting")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 whitespace-nowrap ${
              selectedStatusTab === "recruiting" ? "bg-[#0071e3] text-white shadow-xs" : "text-[#6e6e73] hover:text-[#1d1d1f]"
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-500" /> 모집중
          </button>
          <button
            onClick={() => setSelectedStatusTab("in_progress")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 whitespace-nowrap ${
              selectedStatusTab === "in_progress" ? "bg-[#0071e3] text-white shadow-xs" : "text-[#6e6e73] hover:text-[#1d1d1f]"
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-blue-500" /> 진행중
          </button>
          <button
            onClick={() => setSelectedStatusTab("completed")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 whitespace-nowrap ${
              selectedStatusTab === "completed" ? "bg-[#0071e3] text-white shadow-xs" : "text-[#6e6e73] hover:text-[#1d1d1f]"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-gray-500" /> 종료
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#86868b] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="도서명, 저자, 독서방 제목 검색..."
            className="w-full pl-9 pr-4 py-2 bg-white text-xs text-[#1d1d1f] rounded-xl border border-black/10 focus:outline-none focus:border-[#0071e3] transition-colors"
          />
        </div>
      </div>

      {/* Grid of Opened Real Rooms */}
      {filteredRooms.length === 0 ? (
        <div className="py-16 text-center bg-[#f5f5f7] rounded-3xl border border-black/5 text-sm text-[#6e6e73]">
          검색 및 필터 조건에 부합하는 독서 모임이 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {filteredRooms.map((room) => {
            const roomStatus = room.status || "recruiting";
            return (
              <div
                key={room.id}
                onClick={() => setActiveRoomDetail(room)}
                className="group relative bg-[#f5f5f7] border border-black/10 hover:border-[#0071e3]/50 rounded-3xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-2xl"
              >
                <div className="space-y-4">
                  {/* Badge & Schedule */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/30">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" /> 👑 관리자 확정 개설
                    </span>

                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md border ${
                        roomStatus === "in_progress"
                          ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                          : roomStatus === "completed" || roomStatus === "closed"
                          ? "bg-gray-500/10 text-gray-600 border-gray-500/20"
                          : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                      }`}
                    >
                      {roomStatus === "in_progress" ? "⚡ 진행중" : roomStatus === "completed" || roomStatus === "closed" ? "✅ 종료" : "🔥 모집중"}
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
                        {room.book_description || room.target_audience}
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
                    <span>상세 &amp; 로드맵</span>
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
                    <span>{roomStatus === "completed" ? "종료된 모임 (알림신청)" : "1호 대기자 신청"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

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
