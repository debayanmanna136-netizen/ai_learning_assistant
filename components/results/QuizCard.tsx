"use client";

import React, { useState } from "react";
import { QuizOutput, DifficultyLevel } from "@/types/study";
import { ResourceCardHeader } from "./ResourceCardHeader";
import { HelpCircle, Eye, EyeOff, Lightbulb, CheckCircle2 } from "lucide-react";

export function QuizCard({
  data,
  difficulty,
  onRegenerate,
}: {
  data: QuizOutput;
  difficulty: DifficultyLevel;
  onRegenerate?: (diff: DifficultyLevel) => Promise<void>;
}) {
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const exportText = [
    `QUIZ TITLE: ${data.title} (${difficulty} Rigor)`,
    ...data.questions.map(
      (q, idx) =>
        `\nQ${idx + 1}: ${q.question}\nHint: ${q.hint || "N/A"}\nModel Answer: ${q.idealAnswer}\nKey Points:\n` +
        (q.keyPointsToInclude || []).map((p) => `  - ${p}`).join("\n")
    ),
  ].join("\n");

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs">
      <ResourceCardHeader
        title={data.title || "Academic Self-Test Quiz"}
        type="quiz"
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
              className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-indigo-700 mb-1">
                    Question {idx + 1}
                  </span>
                  <p className="font-semibold text-sm text-slate-900 leading-relaxed">
                    {item.question}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleReveal(item.id || String(idx))}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shrink-0"
                >
                  {isRevealed ? (
                    <>
                      <EyeOff className="h-3.5 w-3.5" />
                      <span>Hide Answer</span>
                    </>
                  ) : (
                    <>
                      <Eye className="h-3.5 w-3.5" />
                      <span>Reveal Answer</span>
                    </>
                  )}
                </button>
              </div>

              {item.hint && !isRevealed && (
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 bg-white/70 rounded-lg p-2.5 border border-slate-100">
                  <Lightbulb className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                  <span>
                    <strong>Hint:</strong> {item.hint}
                  </span>
                </div>
              )}

              {isRevealed && (
                <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-3">
                  <div className="rounded-lg bg-emerald-50/70 border border-emerald-200 p-3.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                      Exemplary Model Answer
                    </span>
                    <p className="text-xs text-emerald-950 leading-relaxed">
                      {item.idealAnswer}
                    </p>
                  </div>

                  {item.keyPointsToInclude && item.keyPointsToInclude.length > 0 && (
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                        Key Points Required for Full Credit
                      </span>
                      <ul className="space-y-1">
                        {item.keyPointsToInclude.map((point, pIdx) => (
                          <li
                            key={pIdx}
                            className="flex items-center gap-2 text-xs text-slate-700"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
