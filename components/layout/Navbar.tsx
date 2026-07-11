"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Sparkles, UploadCloud, GraduationCap } from "lucide-react";
import React from "react";

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/" },
    { name: "Upload Workspace", href: "/workspace" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-900 text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif-heading text-lg font-semibold tracking-tight text-slate-900">
              Scholaria
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-indigo-700">
              AI Learning Assistant
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-2.5 py-1 text-xs font-medium text-emerald-800">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Groq Llama-3.3 Active
          </div>

          <Link
            href="/workspace"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <UploadCloud className="h-4 w-4" />
            <span>Open Workspace</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
