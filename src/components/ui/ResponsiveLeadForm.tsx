"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { Loader2, Sparkles, X, BookOpen, User, Phone, Mail } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { submitLeadAction } from "@/app/actions/submitLead";

const formSchema = z.object({
  name: z.string().min(2, "이름은 최소 2자 이상 입력해 주세요."),
  phone: z.string().regex(/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/, "올바른 휴대폰 번호를 입력해 주세요. (예: 010-1234-5678)"),
  email: z.string().email("올바른 이메일 주소를 입력해 주세요."),
  category: z.string().optional(),
  book_title: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ResponsiveLeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  defaultBookTitle?: string;
}

export function ResponsiveLeadForm({ isOpen, onClose, defaultBookTitle }: ResponsiveLeadFormProps) {
  const isMobile = useIsMobile();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      book_title: defaultBookTitle || "",
      category: "인문/소설/에세이",
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const res = await submitLeadAction(values);
      if (res.success) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        toast.success("파운딩 멤버 1호 대기자로 등록되었습니다! 🎉", {
          description: "대학로 Questionity 오픈 일정 및 특별 혜택을 입력해주신 연락처로 우선 안내드립니다.",
        });
        reset();
        onClose();
      } else {
        toast.error("등록 중 오류가 발생했습니다.", {
          description: res.error || "잠시 후 다시 시도해 주세요.",
        });
      }
    } catch (err) {
      toast.error("제출 중 네트워크 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formContent = (
    <div className="space-y-4 text-left">
      <div className="text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0071e3]/10 text-[#0066cc] border border-[#0071e3]/20 mb-2">
          <Sparkles className="w-3.5 h-3.5" /> 파운딩 멤버 100인 모집
        </div>
        <h3 className="font-heading text-xl sm:text-2xl font-semibold text-[#1d1d1f] tracking-tight">
          {defaultBookTitle ? `[${defaultBookTitle}] 개설 대기 등록` : "Questionity 파운딩 멤버 신청"}
        </h3>
        <p className="text-sm text-[#6e6e73] mt-1 font-normal">
          {defaultBookTitle
            ? "원하시는 독서 모임의 첫 번째 파운딩 대기자가 되어주세요."
            : "대학로 대표 커뮤니티의 혜택과 시크릿 이벤트를 가장 먼저 만나보세요."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 pt-2">
        {defaultBookTitle && (
          <div>
            <label className="block text-xs font-medium text-[#1d1d1f] mb-1">신청 모임 도서</label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-2.5 h-4 w-4 text-[#86868b]" />
              <input
                type="text"
                readOnly
                {...register("book_title")}
                className="w-full bg-[#f5f5f7] border border-black/10 rounded-xl pl-9 pr-4 py-2 text-sm text-[#1d1d1f] focus:outline-none"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-[#1d1d1f] mb-1">성함 *</label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-4 w-4 text-[#86868b]" />
            <input
              type="text"
              placeholder="홍길동"
              {...register("name")}
              className="w-full bg-[#f5f5f7] border border-black/10 rounded-xl pl-9 pr-4 py-2 text-sm text-[#1d1d1f] placeholder-slate-400 focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition-colors"
            />
          </div>
          {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-[#1d1d1f] mb-1">연락처 *</label>
          <div className="relative">
            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-[#86868b]" />
            <input
              type="tel"
              placeholder="010-1234-5678"
              {...register("phone")}
              className="w-full bg-[#f5f5f7] border border-black/10 rounded-xl pl-9 pr-4 py-2 text-sm text-[#1d1d1f] placeholder-slate-400 focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition-colors"
            />
          </div>
          {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-[#1d1d1f] mb-1">이메일 주소 *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-[#86868b]" />
            <input
              type="email"
              placeholder="your@email.com"
              {...register("email")}
              className="w-full bg-[#f5f5f7] border border-black/10 rounded-xl pl-9 pr-4 py-2 text-sm text-[#1d1d1f] placeholder-slate-400 focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition-colors"
            />
          </div>
          {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-[#1d1d1f] mb-1">관심 도서 분야</label>
          <select
            {...register("category")}
            className="w-full bg-[#f5f5f7] border border-black/10 rounded-xl px-3 py-2 text-sm text-[#1d1d1f] focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition-colors"
          >
            <option value="인문/소설/에세이">인문 / 소설 / 에세이</option>
            <option value="경영/트렌드/IT">경영 / 트렌드 / IT</option>
            <option value="연극/예술/기호학">연극 / 예술 / 기호학 (대학로 특화)</option>
            <option value="MBTI/심리/치유">MBTI / 심리 / 치유 독서</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="apple-button-primary w-full mt-3 py-3 px-4 text-sm font-semibold shadow-lg flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> 제출 중...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" /> 파운딩 멤버 대기자 신청 완료
            </>
          )}
        </button>
      </form>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-lg bg-white border border-black/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden ${
          isMobile ? "fixed bottom-0 left-0 right-0 rounded-b-none rounded-t-3xl max-w-full animate-in slide-in-from-bottom duration-300" : ""
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#86868b] hover:text-[#1d1d1f] p-2 rounded-full hover:bg-black/5 transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>
        {formContent}
      </div>
    </div>
  );
}
