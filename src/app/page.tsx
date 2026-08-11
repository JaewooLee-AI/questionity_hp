import { Hero } from "@/components/sections/Hero";
import { SpaceBento } from "@/components/sections/SpaceBento";
import { VirtualPreviewMarquee } from "@/components/sections/VirtualPreviewMarquee";
import { FloatingChat } from "@/components/chat/FloatingChat";

export default function Home() {
  return (
    <div className="relative">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Work & Share Bento Grid Section */}
      <SpaceBento />

      {/* 3. AI Virtual Preview Marquee Section */}
      <VirtualPreviewMarquee />

      {/* 4. Proactive AI Chatbot Widget */}
      <FloatingChat />
    </div>
  );
}
