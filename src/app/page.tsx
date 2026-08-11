import { Hero } from "@/components/sections/Hero";
import { OpenedRoomsSection } from "@/components/sections/OpenedRoomsSection";
import { SpaceBento } from "@/components/sections/SpaceBento";
import { VirtualPreviewMarquee } from "@/components/sections/VirtualPreviewMarquee";
import { FloatingChat } from "@/components/chat/FloatingChat";

export default function Home() {
  return (
    <div className="relative">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Real Opened Rooms Section (🔥 대학로 실제 개설 독서 모임 메인 뷰) */}
      <OpenedRoomsSection />

      {/* 3. Work & Share Bento Grid Section */}
      <SpaceBento />

      {/* 4. AI Virtual Preview Marquee Section */}
      <VirtualPreviewMarquee />

      {/* 5. Proactive AI Chatbot Widget */}
      <FloatingChat />
    </div>
  );
}
