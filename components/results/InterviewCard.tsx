"use client";

import React, { useState } from "react";
import { InterviewOutput, DifficultyLevel } from "@/types/study";
import { ResourceCardHeader } from "./ResourceCardHeader";
import { MessageSquare, Eye, EyeOff, Target } from "lucide-react";

export function InterviewCard({
  data,
  difficulty,
  onRegenerate,
}: {
  data: InterviewOutput;
  difficulty: DifficultyLevel;
  onRegenerate?: (diff: DifficultyLevel) => Promise<void>;
}) {
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const exportText = [
    `INTERVIEW PREP GUIDE: ${data.title} (${difficulty} Rigor)`,
    ...data.questions.map(
      (q, idx) =>
        `\nQ${idx + 1} [${q.category}]: ${q.question}\nInterviewer Intent: ${
          q.interviewerIntent
        }\nExemplary Response:\n${q.exemplaryResponse}`
    ),
  ].join("\n");

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs">
      <ResourceCardHeader
        title={data.title || "Oral Exam & Interview Prep Guide"}
        type="interview"
        difficulty={difficulty}
        exportText={exportText}
        onRegenerate={onRegenerate}
      />

      <div className="space-y-4">
        {data.questions.map((item, idx) => {
          const isRevealed = !!revealedIds[item.id || String(idx)];

          return (
            <div
              key={idx}
              className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-5 transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="rounded-full bg-purple-100 border border-purple-200 px-2.5 py-0.5 text-[10px] font-semibold text-purple-800">
                      {item.category || "Core Concept"}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">
                      Question #{idx + 1}
                    </span>
                  </div>
                  <h4 className="font-serif-heading font-semibold text-base text-slate-900">
                    {item.question}
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() => toggleReveal(item.id || String(idx))}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shrink-0"
                >
                  {isRevealed ? (
                    <>
                      <EyeOff className="h-3.5 w-3.5" />
                      <span>Hide Response</span>
                    </>
                  ) : (
                    <>
                      <Eye className="h-3.5 w-3.5" />
                      <span>Model Response</span>
                    </>
                  )}
                </button>
              </div>

              {/* Interviewer Intent Box */}
              <div className="flex items-start gap-2.5 rounded-lg bg-white p-3 border border-slate-200/80 text-xs text-slate-600 mb-2">
                <Target className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800">
                    Interviewer Evaluation Intent:{" "}
                  </span>
                  <span>{item.interviewerIntent}</span>
                </div>
              </div>

              {/* Exemplary Response */}
              {isRevealed && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="rounded-xl bg-purple-50/40 border border-purple-200 p-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-purple-900 block mb-1.5">
                      Exemplary Model Response
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                      {item.exemplaryResponse}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
