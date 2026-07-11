import React from "react";
import { GraduationCap, Sparkles, BookOpen, FileText } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white py-12 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-900 text-white">
              <GraduationCap className="h-4 w-4" />
            </div>
            <div>
              <span className="font-serif-heading font-semibold text-slate-900">
                Scholaria
              </span>
              <p className="text-xs text-slate-500">
                AI Learning Assistant powered by Groq & Next.js 15
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Overview
            </Link>
            <Link href="/workspace" className="hover:text-slate-900 transition-colors">
              Workspace
            </Link>
            <span className="text-slate-300">|</span>
            <span className="text-xs text-slate-500 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
              Academic AI Engine v1.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
