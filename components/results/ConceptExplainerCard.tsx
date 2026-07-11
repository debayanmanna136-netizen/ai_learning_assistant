"use client";

import React from "react";
import { ConceptExplainerOutput, DifficultyLevel } from "@/types/study";
import { ResourceCardHeader } from "./ResourceCardHeader";
import { Lightbulb, AlertTriangle, ArrowRight, Sparkles } from "lucide-react";

export function ConceptExplainerCard({
  data,
  difficulty,
  onRegenerate,
}: {
  data: ConceptExplainerOutput;
  difficulty: DifficultyLevel;
  onRegenerate?: (diff: DifficultyLevel) => Promise<void>;
}) {
  const exportText = [
    `DIFFICULT CONCEPT DEMYSTIFIER: ${data.title} (${difficulty} Rigor)`,
    ...data.concepts.map(
      (c, idx) =>
        `\n=== CONCEPT ${idx + 1}: ${c.conceptName} ===\n` +
        `Academic Definition: ${c.academicDefinition}\n` +
        `Intuitive Analogy: ${c.intuitiveAnalogy}\n` +
        `Step-by-Step Breakdown:\n` +
        (c.stepByStepBreakdown || []).map((step) => `  -> ${step}`).join("\n") +
        `\nCommon Misconceptions: ${c.commonMisconceptions}`
    ),
  ].join("\n");

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs">
      <ResourceCardHeader
        title={data.title || "Difficult Concept Demystifier"}
        type="concept_explainer"
        difficulty={difficulty}
        exportText={exportText}
        onRegenerate={onRegenerate}
      />

      <div className="space-y-6">
        {data.concepts.map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-slate-200/80 bg-slate-50/40 p-5 sm:p-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-800 text-xs font-bold">
                #{idx + 1}
              </span>
              <h4 className="font-serif-heading text-xl font-semibold text-slate-900">
                {item.conceptName}
              </h4>
            </div>

            {/* Academic Definition */}
            <div className="mt-3 text-xs text-slate-600 bg-white p-3.5 rounded-xl border border-slate-200/80">
              <span className="font-semibold text-slate-900 block mb-1">
                Formal Academic Definition:
              </span>
              <p className="leading-relaxed">{item.academicDefinition}</p>
            </div>

            {/* Intuitive Analogy */}
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/70 p-4">
              <div className="flex items-center gap-2 mb-1.5">
                <Lightbulb className="h-4 w-4 text-amber-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Intuitive Real-World Analogy
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                {item.intuitiveAnalogy}
              </p>
            </div>

            {/* Step by step */}
            {item.stepByStepBreakdown && item.stepByStepBreakdown.length > 0 && (
              <div className="mt-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-2">
                  Step-by-Step Mechanism Breakdown
                </span>
                <div className="space-y-2">
                  {item.stepByStepBreakdown.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-100"
                    >
                      <ArrowRight className="h-3.5 w-3.5 text-indigo-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Common Misconceptions */}
            {item.commonMisconceptions && (
              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50/60 p-3.5 text-xs text-red-950">
                <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block mb-0.5">
                    Common Pitfall & Misconception:
                  </span>
                  <p className="leading-relaxed">{item.commonMisconceptions}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
