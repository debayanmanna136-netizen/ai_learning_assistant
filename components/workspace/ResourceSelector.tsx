"use client";

import React from "react";
import {
  BookOpen,
  HelpCircle,
  Layers,
  CheckSquare,
  MessageSquare,
  Lightbulb,
  Calendar,
  Sparkles,
  Loader2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { ResourceType, StoredResource } from "@/types/study";
import { useRouter } from "next/navigation";

export interface ResourceSelectorProps {
  documentId: string;
  resources: StoredResource[];
  isGenerating: boolean;
  activeType: ResourceType | null;
  onGenerate: (type: ResourceType) => Promise<boolean>;
}

export function ResourceSelector({
  documentId,
  resources,
  isGenerating,
  activeType,
  onGenerate,
}: ResourceSelectorProps) {
  const router = useRouter();

  const studyTools: {
    type: ResourceType;
    title: string;
    description: string;
    icon: React.ReactNode;
  }[] = [
    {
      type: "summary",
      title: "Executive Summary",
      description:
        "Comprehensive synthesis of major arguments, key terminology, and overarching themes.",
      icon: <BookOpen className="h-5 w-5 text-indigo-700" />,
    },
    {
      type: "quiz",
      title: "Academic Quiz",
      description:
        "Open-ended conceptual self-testing prompts calibrated to your selected rigor.",
      icon: <HelpCircle className="h-5 w-5 text-emerald-700" />,
    },
    {
      type: "flashcards",
      title: "Flashcards Deck",
      description:
        "Interactive front/back cards optimized for rapid spaced repetition and active recall.",
      icon: <Layers className="h-5 w-5 text-amber-700" />,
    },
    {
      type: "mcqs",
      title: "Multiple Choice (MCQs)",
      description:
        "Rigorous 4-option questions with detailed pedagogical explanations for correct/incorrect answers.",
      icon: <CheckSquare className="h-5 w-5 text-indigo-700" />,
    },
    {
      type: "interview",
      title: "Interview Prep Guide",
      description:
        "High-impact technical and conceptual oral exam questions with model STAR responses.",
      icon: <MessageSquare className="h-5 w-5 text-purple-700" />,
    },
    {
      type: "concept_explainer",
      title: "Difficult Concept Demystifier",
      description:
        "Breaks down complex, abstract mechanisms using intuitive everyday analogies.",
      icon: <Lightbulb className="h-5 w-5 text-amber-600" />,
    },
    {
      type: "study_plan",
      title: "Structured Study Plan",
      description:
        "Actionable day-by-day study schedule with specific learning objectives and review milestones.",
      icon: <Calendar className="h-5 w-5 text-teal-700" />,
    },
  ];

  const hasAnyGenerated = resources.length > 0;

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-serif-heading text-xl font-semibold text-slate-900">
            Select AI Learning Resources to Generate
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Each resource uses a specialized prompt tailored to its academic objective.
          </p>
        </div>

        {hasAnyGenerated && (
          <button
            type="button"
            onClick={() => router.push(`/study/${documentId}`)}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-800 transition-all"
          >
            <span>Open Results Suite ({resources.length})</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {studyTools.map((tool) => {
          const isCurrentGenerating = isGenerating && activeType === tool.type;
          const existing = resources.find((r) => r.type === tool.type);

          return (
            <div
              key={tool.type}
              className={`flex flex-col justify-between rounded-2xl border p-5 transition-all ${
                existing
                  ? "border-emerald-200 bg-emerald-50/20"
                  : "border-slate-200 bg-white hover:border-slate-300 shadow-2xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                    {tool.icon}
                  </div>
                  {existing ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="h-3 w-3" /> Ready ({existing.difficulty})
                    </span>
                  ) : null}
                </div>

                <h4 className="font-serif-heading font-semibold text-slate-900 text-base">
                  {tool.title}
                </h4>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  disabled={isGenerating}
                  onClick={async () => {
                    const ok = await onGenerate(tool.type);
                    if (ok) {
                      router.push(`/study/${documentId}`);
                    }
                  }}
                  className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium transition-all ${
                    existing
                      ? "bg-slate-100 text-slate-800 hover:bg-slate-200"
                      : "bg-indigo-900 text-white hover:bg-indigo-800 shadow-xs"
                  } ${isGenerating ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  {isCurrentGenerating ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : existing ? (
                    <>
                      <Sparkles className="h-3.5 w-3.5 text-indigo-700" />
                      <span>Regenerate</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Generate Now</span>
                    </>
                  )}
                </button>

                {existing && (
                  <button
                    type="button"
                    onClick={() => router.push(`/study/${documentId}`)}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    View
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
