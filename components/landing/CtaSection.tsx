import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-25">
        <div className="h-[400px] w-[700px] rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-400 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium text-indigo-200 mb-6 backdrop-blur-xs">
          <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
          <span>Ready to Study Smarter?</span>
        </div>

        <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight max-w-3xl mx-auto leading-tight">
          Turn your next exam preparation into an interactive mastery experience
        </h2>

        <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Upload any PDF, DOCX, PPTX, or TXT document and generate your tailored study suite in seconds.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/workspace"
            className="inline-flex items-center gap-2.5 rounded-xl bg-white px-8 py-4 text-base font-semibold text-slate-900 shadow-lg transition-all hover:bg-slate-100 hover:scale-105"
          >
            <span>Open Study Workspace</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
