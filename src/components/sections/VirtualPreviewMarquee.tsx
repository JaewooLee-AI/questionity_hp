"use client";

import React, { useEffect, useState } from "react";
import { Marquee } from "@/components/ui/Marquee";
import { FALLBACK_VIRTUAL_ROOMS, FALLBACK_VIRTUAL_REVIEWS, VirtualRoom, VirtualReview } from "@/lib/mockData";
import { supabase } from "@/lib/supabase/client";

export function VirtualPreviewMarquee() {
  const [rooms, setRooms] = useState<VirtualRoom[]>(FALLBACK_VIRTUAL_ROOMS);
  const [reviews, setReviews] = useState<VirtualReview[]>(FALLBACK_VIRTUAL_REVIEWS);

  const fetchRoomsAndReviews = async () => {
    try {
      // 1. Fetch rooms from Supabase 'rooms' table according to admin guide schema
      const { data: roomsData, error: roomsError } = await supabase
        .from("rooms")
        .select("id, title, book_title, book_author, book_description, book_image_url, publisher, target_audience, curriculum_json, meeting_type, location, schedule_text, price_text, max_capacity, created_at, is_ai_generated, is_custom_created")
        .order("created_at", { ascending: false });

      const roomsMap: Record<string, any> = {};

      if (roomsData && roomsData.length > 0 && !roomsError) {
        const parsedRooms = roomsData.map((r: any) => {
          roomsMap[r.id] = r;
          return {
            id: r.id,
            title: r.title,
            book_title: r.book_title || r.title,
            book_author: r.book_author || "저자 미상",
            book_description: r.book_description || r.target_audience || "질문이 이끄는 4주 독서 커뮤니티",
            description: r.book_description ? `${r.book_description.slice(0, 100)}...` : r.target_audience,
            book_image_url: r.book_image_url || "https://image.aladin.co.kr/product/31562/22/coversum/k232832857_1.jpg",
            publisher: r.publisher || "알라딘 협력 출판사",
            target_audience: r.target_audience || "지적 호기심을 지닌 파운딩 멤버",
            curriculum_json: r.curriculum_json,
            meeting_type: r.meeting_type || "offline",
            location: r.location || "대학로 Work & Share 라운지",
            schedule_text: r.schedule_text || "매주 수요일 19:30 (선착순 개강)",
            price_text: r.price_text || "파운딩 0원 (무료)",
            max_capacity: r.max_capacity || 12,
            is_ai_generated: r.is_ai_generated ?? true,
            is_custom_created: r.is_custom_created ?? false,
            predicted_by: r.is_custom_created ? "관리자 직접 개설" : "AI 큐레이션",
            vote_count: 50,
          };
        });
        setRooms(parsedRooms);
      }

      // 2. Fetch reviews from Supabase 'reviews' table according to admin guide schema
      const { data: reviewsData, error: reviewsError } = await supabase
        .from("reviews")
        .select("id, room_id, fake_user_persona, content, created_at")
        .order("created_at", { ascending: false });

      if (reviewsData && reviewsData.length > 0 && !reviewsError) {
        setReviews(
          reviewsData.map((rev: any) => {
            const matchedRoom = roomsMap[rev.room_id];
            return {
              id: rev.id,
              room_id: rev.room_id,
              book_title: matchedRoom?.book_title || matchedRoom?.title || "추천 필독서",
              author: matchedRoom?.book_author || "추천 저자",
              content: rev.content || "이 책은 삶의 방향과 본질에 대한 명확한 통찰을 전해줍니다.",
              fake_user_persona: rev.fake_user_persona || "AI 예측 멤버",
              rating: 5.0,
            };
          })
        );
      }
    } catch (err) {
      console.warn("Supabase fetch using fallback data:", err);
    }
  };

  useEffect(() => {
    fetchRoomsAndReviews();

    // ⚡ Supabase Realtime WebSocket Subscription for instant sync with Admin Dashboard
    const roomsChannel = supabase
      .channel("public:rooms")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "rooms" },
        (payload) => {
          console.log("⚡ Supabase rooms DB change detected:", payload);
          fetchRoomsAndReviews();
        }
      )
      .subscribe();

    const reviewsChannel = supabase
      .channel("public:reviews")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reviews" },
        (payload) => {
          console.log("⚡ Supabase reviews DB change detected:", payload);
          fetchRoomsAndReviews();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(roomsChannel);
      supabase.removeChannel(reviewsChannel);
    };
  }, []);

  return (
    <section id="preview-section" className="py-24 bg-white border-t border-black/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-12">
        <span className="text-[#0066cc] text-xs font-mono font-semibold tracking-widest uppercase block">
          REAL-TIME OPENED CATALOG
        </span>
        <h2 className="font-heading text-3xl sm:text-5xl font-semibold text-[#1d1d1f] tracking-tight">
          대학로 개설 독서방 &amp; <br className="sm:hidden" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066cc] via-[#0071e3] to-[#2997ff]">
            실제 모임 기대평 탐색
          </span>
        </h2>
        <p className="text-base sm:text-lg text-[#6e6e73] font-normal max-w-2xl mx-auto break-keep">
          Questionity 관리자 파이프라인에서 개설된 실제 독서 모임과 멤버들의 기대평입니다. 
          도서 표지를 클릭하여 4주 커리큘럼 및 모임 상세 정보를 살펴보고 파운딩 1호 대기자로 등록해 주세요.
        </p>
      </div>

      <Marquee rooms={rooms} reviews={reviews} />
    </section>
  );
}
