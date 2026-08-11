"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Sparkles, BookOpen, Bot, Star, Flame, Loader2 } from "lucide-react";
import { submitLeadAction } from "@/app/actions/submitLead";
import confetti from "canvas-confetti";
import { toast } from "sonner";

interface BookData {
  title: string;
  author: string;
  cover: string;
  description: string;
  publisher?: string;
  link?: string;
}

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  toolInvocation?: {
    toolName: string;
    result: BookData;
  };
}

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "안녕하세요! 대학로 Questionity AI 마케터입니다. 🔮\n오늘 하루 어떤 기분이신가요? MBTI나 관심 있는 감정을 알려주시면 딱 맞는 책을 타로처럼 뽑아드릴게요!",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasIdlePrompted, setHasIdlePrompted] = useState(false);

  const [inlineFormBookTitle, setInlineFormBookTitle] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmittingInline, setIsSubmittingInline] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Proactive Trigger 2: 5s idle prompt after chat opened
  useEffect(() => {
    if (isOpen && !hasIdlePrompted && messages.length === 1) {
      const idleTimer = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: "idle-prompt",
            role: "assistant",
            content: "아참, 지금 알라딘 경제경영 베스트셀러 1위가 뭔지 아시나요? 👀 궁금하시면 아래에 '알려줘' 또는 '베스트셀러'라고 입력해 보세요!",
          },
        ]);
        setHasIdlePrompted(true);
      }, 5000);
      return () => clearTimeout(idleTimer);
    }
  }, [isOpen, hasIdlePrompted, messages.length]);

  // Auto scroll down
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      role: "user",
      content: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          role: "assistant",
          content: data.content,
          toolInvocation: data.toolInvocation,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          role: "assistant",
          content: "죄송해요, 잠시 연결이 원활하지 않습니다. 다시 말씀해 주시겠어요?",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInlineFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      toast.error("이름, 연락처, 이메일을 모두 입력해 주세요.");
      return;
    }

    setIsSubmittingInline(true);
    try {
      const res = await submitLeadAction({
        name,
        phone,
        email,
        book_title: inlineFormBookTitle || "챗봇 맞춤 도서",
      });

      if (res.success) {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
        toast.success("1호 파운딩 대기자로 등록되었습니다! 🎊");
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now()),
            role: "assistant",
            content: `🎉 축하합니다! 《${inlineFormBookTitle}》 모임의 1호 대기자 등록이 완료되었습니다. 대학로 오프라인 룸이 개설되는 즉시 입력하신 연락처로 초대권을 보내드립니다!`,
          },
        ]);
        setInlineFormBookTitle(null);
      } else {
        toast.error("등록 중 실패했습니다.");
      }
    } catch (err) {
      toast.error("제출 에러가 발생했습니다.");
    } finally {
      setIsSubmittingInline(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-4 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center"
          aria-label="Proactive AI Chatbot 열기"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white" />
          <MessageSquare className="w-6 h-6" />
          <div className="absolute right-16 bg-[#1d1d1f] text-white text-xs font-medium px-3 py-1.5 rounded-xl border border-black/10 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            🔮 AI 도서 타로 &amp; 파운딩 챗봇
          </div>
        </button>
      )}

      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[580px] bg-white/95 border border-black/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-[#f5f5f7] border-b border-black/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0071e3] text-white font-bold text-xs flex items-center justify-center font-heading shadow-xs">
                Q
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#1d1d1f] flex items-center gap-1.5 font-heading">
                  Questionity AI 타로 챗봇
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </h3>
                <p className="text-[11px] text-[#6e6e73]">알라딘 API &amp; Vercel AI 연동</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#86868b] hover:text-[#1d1d1f] p-1.5 rounded-full hover:bg-black/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#0071e3] text-white font-medium rounded-tr-none shadow-xs"
                      : "bg-[#f5f5f7] border border-black/5 text-[#1d1d1f] rounded-tl-none shadow-xs"
                  }`}
                >
                  {msg.content}
                </div>

                {msg.toolInvocation && (
                  <div className="mt-3 w-full max-w-[90%] bg-[#f5f5f7] border border-black/10 rounded-2xl p-4 space-y-3 shadow-md text-left">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0066cc] font-heading">
                      <Sparkles className="w-3.5 h-3.5 text-[#0066cc]" />
                      {msg.toolInvocation.toolName === "getRealtimeBestseller"
                        ? "알라딘 경제경영 베스트셀러 1위"
                        : msg.toolInvocation.toolName === "searchBookTarot"
                        ? "오늘의 책 타로 카드"
                        : "검색 도서 정보"}
                    </div>

                    <div className="flex gap-3">
                      {msg.toolInvocation.result.cover && (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={msg.toolInvocation.result.cover}
                          alt={msg.toolInvocation.result.title}
                          className="w-16 h-24 object-cover rounded-lg border border-black/10 shrink-0 shadow-xs"
                        />
                      )}
                      <div className="space-y-1">
                        <h4 className="font-heading font-semibold text-[#1d1d1f] text-xs sm:text-sm line-clamp-1">
                          {msg.toolInvocation.result.title}
                        </h4>
                        <p className="text-[11px] text-[#0066cc] font-medium">{msg.toolInvocation.result.author}</p>
                        <p className="text-[11px] text-[#6e6e73] line-clamp-2 leading-tight">
                          {msg.toolInvocation.result.description}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setInlineFormBookTitle(msg.toolInvocation!.result.title)}
                      className="apple-button-primary w-full py-2 text-xs flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>이 책으로 1호 대기자 신청</span>
                    </button>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-[#6e6e73] text-xs">
                <Loader2 className="w-4 h-4 animate-spin text-[#0066cc]" />
                <span>AI가 맞춤 알라딘 도서를 찾고 있습니다...</span>
              </div>
            )}

            {inlineFormBookTitle && (
              <form
                onSubmit={handleInlineFormSubmit}
                className="bg-[#f5f5f7] border border-[#0071e3]/30 rounded-2xl p-4 space-y-3 animate-in fade-in duration-200 text-left"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-semibold text-[#0066cc] text-xs flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-[#0071e3]" /> 《{inlineFormBookTitle}》 1호 대기 등록
                  </h4>
                  <button
                    type="button"
                    onClick={() => setInlineFormBookTitle(null)}
                    className="text-[#86868b] hover:text-[#1d1d1f]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="성함"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-black/10 rounded-xl px-3 py-1.5 text-xs text-[#1d1d1f] placeholder-slate-400 focus:outline-none focus:border-[#0071e3]"
                  required
                />
                <input
                  type="tel"
                  placeholder="연락처 (010-1234-5678)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-black/10 rounded-xl px-3 py-1.5 text-xs text-[#1d1d1f] placeholder-slate-400 focus:outline-none focus:border-[#0071e3]"
                  required
                />
                <input
                  type="email"
                  placeholder="이메일 주소"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-black/10 rounded-xl px-3 py-1.5 text-xs text-[#1d1d1f] placeholder-slate-400 focus:outline-none focus:border-[#0071e3]"
                  required
                />

                <button
                  type="submit"
                  disabled={isSubmittingInline}
                  className="apple-button-primary w-full py-2 text-xs flex items-center justify-center gap-1 shadow-sm"
                >
                  {isSubmittingInline ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "파운딩 대기자 제출"}
                </button>
              </form>
            )}
          </div>

          {/* Quick Action Chips */}
          <div className="px-4 py-2 border-t border-black/5 bg-[#f5f5f7] flex gap-2 overflow-x-auto text-[11px] shrink-0">
            <button
              onClick={() => handleSendMessage("오늘 조금 우울한데 INFP에 딱 맞는 책 추천해줘")}
              className="px-2.5 py-1 rounded-full bg-white border border-black/10 text-[#6e6e73] hover:text-[#0066cc] hover:border-[#0071e3]/30 whitespace-nowrap transition-colors"
            >
              🔮 INFP 타로 책 뽑기
            </button>
            <button
              onClick={() => handleSendMessage("알라딘 베스트셀러 알려줘")}
              className="px-2.5 py-1 rounded-full bg-white border border-black/10 text-[#6e6e73] hover:text-[#0066cc] hover:border-[#0071e3]/30 whitespace-nowrap transition-colors"
            >
              🔥 1위 베스트셀러
            </button>
            <button
              onClick={() => handleSendMessage("도둑맞은 집중력 모임 만들고 싶어")}
              className="px-2.5 py-1 rounded-full bg-white border border-black/10 text-[#6e6e73] hover:text-[#0066cc] hover:border-[#0071e3]/30 whitespace-nowrap transition-colors"
            >
              📚 독서방 개설 신청
            </button>
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-black/10 flex items-center gap-2">
            <input
              type="text"
              placeholder="MBTI, 기분, 관심 책 제목을 입력하세요..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 bg-[#f5f5f7] border border-black/10 rounded-xl px-3 py-2 text-xs text-[#1d1d1f] placeholder-slate-400 focus:outline-none focus:border-[#0071e3] transition-colors"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isLoading}
              className="p-2 rounded-xl bg-[#0071e3] text-white hover:bg-[#0077ed] disabled:opacity-40 transition-colors shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
