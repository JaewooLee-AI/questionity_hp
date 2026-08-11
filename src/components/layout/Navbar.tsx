"use client";

import React, { useState, useEffect } from "react";
import { ExternalLink, Sparkles, Calendar } from "lucide-react";
import { ResponsiveLeadForm } from "@/components/ui/ResponsiveLeadForm";

export function Navbar() {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);

  const WORK_AND_SHARE_URL = process.env.WORK_AND_SHARE_URL || "https://worknshare.readdy.co/";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 apple-navbar transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Apple Style Brand Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-lg bg-[#0071e3] flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-105 transition-transform font-heading">
                Q
              </div>
              <span className="font-heading font-semibold text-base tracking-tight text-[#1d1d1f] flex items-center gap-1.5">
                Questionity
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-full bg-[#0071e3]/10 text-[#0066cc] border border-[#0071e3]/20 font-normal">
                  Daehangno
                </span>
              </span>
            </a>

            {/* Apple Style Right Action Buttons */}
            <div className="flex items-center gap-3 sm:gap-4">
              <a
                href={WORK_AND_SHARE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-[#6e6e73] hover:text-[#1d1d1f] transition-colors py-1.5 px-3 rounded-full hover:bg-black/5"
              >
                <span>Work &amp; Share 공간</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#0066cc]" />
              </a>

              <button
                onClick={() => setIsLeadFormOpen(true)}
                className="apple-button-primary px-4 py-1.5 text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>파운딩 멤버 신청</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <ResponsiveLeadForm isOpen={isLeadFormOpen} onClose={() => setIsLeadFormOpen(false)} />
    </>
  );
}
