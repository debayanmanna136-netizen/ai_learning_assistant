"use client";

import React from "react";
import { SummaryOutput, DifficultyLevel } from "@/types/study";
import { ResourceCardHeader } from "./ResourceCardHeader";
import { BookOpen, CheckCircle2 } from "lucide-react";

export function SummaryCard({
  data,
  difficulty,
  onRegenerate,
}: {
  data: SummaryOutput;
  difficulty: DifficultyLevel;
  onRegenerate?: (diff: DifficultyLevel) => Promise<void>;
}) {
  const exportText = [
    `TITLE: ${data.title}`,
    `\n=== EXECUTIVE OVERVIEW ===\n${data.executiveOverview}`,
    `\n=== KEY THEMES ===`,
    ...data.keyThemes.map((t) => `• ${t.heading}: ${t.description}`),
    `\n=== ESSENTIAL TERMINOLOGY ===`,
    ...data.essentialTerminology.map((term) => `• ${term.term}: ${term.definition}`),
    `\n=== CRITICAL TAKEAWAYS ===`,
    ...data.takeaways.map((t) => `[✓] ${t}`),
  ].join("\n");

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs">
      <ResourceCardHeader
        title={data.title || "Executive Document Summary"}
        type="summary"
        difficulty={difficulty}
        exportText={exportText}
        onRegenerate={onRegenerate}
      />

      {/* Executive Overview */}
      <div className="mb-6">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-700 mb-2">
          Executive Overview
        </h4>
        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
          {data.executiveOverview}
        </p>
      </div>

      {/* Key Themes */}
      {data.keyThemes && data.keyThemes.length > 0 && (
        <div className="mb-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Core Themes & Structural Arguments
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.keyThemes.map((theme, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4"
              >
                <h5 className="font-semibold text-sm text-slate-900 mb-1">
                  {theme.heading}
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {theme.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Essential Terminology */}
      {data.essentialTerminology && data.essentialTerminology.length > 0 && (
        <div className="mb-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Essential Vocabulary & Terminology
          </h4>
          <div className="divide-y divide-slate-100 rounded-xl border border-slate-200/80 bg-white">
            {data.essentialTerminology.map((item, idx) => (
              <div key={idx} className="p-3.5 flex flex-col sm:flex-row sm:items-start gap-2">
                <span className="font-semibold text-xs text-indigo-900 min-w-36 shrink-0">
                  {item.term}
                </span>
                <span className="text-xs text-slate-600 leading-relaxed">
                  {item.definition}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Takeaways */}
      {data.takeaways && data.takeaways.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Key Takeaways
          </h4>
          <ul className="space-y-2">
            {data.takeaways.map((t, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
