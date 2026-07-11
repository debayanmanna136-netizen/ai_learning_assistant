"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useStudySession } from "@/hooks/useStudySession";
import { SummaryCard } from "@/components/results/SummaryCard";
import { QuizCard } from "@/components/results/QuizCard";
import { FlashcardsCard } from "@/components/results/FlashcardsCard";
import { McqCard } from "@/components/results/McqCard";
import { InterviewCard } from "@/components/results/InterviewCard";
import { ConceptExplainerCard } from "@/components/results/ConceptExplainerCard";
import { StudyPlanCard } from "@/components/results/StudyPlanCard";
import { ResourceType, DifficultyLevel } from "@/types/study";
import {
  BookOpen,
  HelpCircle,
  Layers,
  CheckSquare,
  MessageSquare,
  Lightbulb,
  Calendar,
  ArrowLeft,
  Sparkles,
  Download,
  Loader2,
  FileText,
} from "lucide-react";
import { Alert } from "@/components/ui/Alert";

export default function StudyResultsPage() {
  const router = useRouter();
  const {
    document: studyDoc,
    resources,
    preferredDifficulty,
    generationStatus,
    generateResource,
  } = useStudySession();

  const [activeTab, setActiveTab] = useState<ResourceType | "all">("all");

  const resourceNavItems: {
    type: ResourceType;
    label: string;
    icon: React.ReactNode;
  }[] = [
    { type: "summary", label: "Summary", icon: <BookOpen className="h-4 w-4" /> },
    { type: "quiz", label: "Quiz", icon: <HelpCircle className="h-4 w-4" /> },
    { type: "flashcards", label: "Flashcards", icon: <Layers className="h-4 w-4" /> },
    { type: "mcqs", label: "MCQs", icon: <CheckSquare className="h-4 w-4" /> },
    { type: "interview", label: "Interview Prep", icon: <MessageSquare className="h-4 w-4" /> },
    { type: "concept_explainer", label: "Analogies", icon: <Lightbulb className="h-4 w-4" /> },
    { type: "study_plan", label: "Study Plan", icon: <Calendar className="h-4 w-4" /> },
  ];

  const handleExportFullSuite = () => {
    if (!studyDoc) return;
    const content = [
      `=== SCHOLARIA STUDY SUITE FOR: ${studyDoc.name} ===`,
      `Document Size: ${studyDoc.wordCount} words`,
      `Generated Resources: ${resources.length}`,
      `Date: ${new Date().toLocaleDateString()}`,
      `\n=======================================================\n`,
      ...resources.map((r) => {
        return `[RESOURCE: ${r.type.toUpperCase()}] (${r.difficulty} Rigor)\n` +
          JSON.stringify(r.content, null, 2) +
          `\n\n=======================================================\n`;
      }),
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url;
    a.download = `${studyDoc.name.replace(/\.[^/.]+$/, "")}_study_suite.txt`;
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!studyDoc) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <FileText className="h-12 w-12 text-slate-300 mb-3" />
          <h2 className="font-serif-heading text-2xl font-semibold text-slate-800">
            No Active Document Found
          </h2>
          <p className="mt-1 text-sm text-slate-500 max-w-sm">
            Please upload study material in the workspace to view or generate learning tools.
          </p>
          <button
            type="button"
            onClick={() => router.push("/workspace")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-900 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-800"
          >
            Go to Upload Workspace
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.push("/workspace")}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Workspace</span>
              </button>
              <div>
                <h1 className="font-serif-heading text-2xl font-semibold text-slate-900">
                  {studyDoc.name}
                </h1>
                <p className="text-xs text-slate-500">
                  {studyDoc.wordCount.toLocaleString()} words • {resources.length} generated tools
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {resources.length > 0 && (
                <button
                  type="button"
                  onClick={handleExportFullSuite}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-800 hover:bg-slate-50 transition-colors shadow-2xs"
                >
                  <Download className="h-3.5 w-3.5 text-slate-600" />
                  <span>Download Full Suite TXT</span>
                </button>
              )}
            </div>
          </div>

          {/* Filter & Generation Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4 mb-8">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors ${
                activeTab === "all"
                  ? "bg-slate-900 text-white"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              All Resources ({resources.length})
            </button>

            {resourceNavItems.map((item) => {
              const res = resources.find((r) => r.type === item.type);
              const isGen =
                generationStatus.isGenerating &&
                generationStatus.activeType === item.type;

              return (
                <button
                  key={item.type}
                  type="button"
                  onClick={async () => {
                    if (res) {
                      setActiveTab(item.type);
                    } else {
                      await generateResource(item.type);
                      setActiveTab(item.type);
                    }
                  }}
                  disabled={generationStatus.isGenerating}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                    activeTab === item.type
                      ? "bg-indigo-900 text-white shadow-xs"
                      : res
                      ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                      : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {isGen ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    item.icon
                  )}
                  <span>{item.label}</span>
                  {!res && !isGen && (
                    <span className="ml-1 text-[10px] text-indigo-600 font-bold">
                      + Generate
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Error Banner */}
          {generationStatus.error && (
            <div className="mb-6">
              <Alert variant="error" title="AI Generation Error">
                {generationStatus.error}
              </Alert>
            </div>
          )}

          {/* Generating Loading State */}
          {generationStatus.isGenerating && (
            <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-8 text-center mb-8">
              <Loader2 className="h-8 w-8 text-indigo-600 animate-spin mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 text-base">
                Synthesizing academic resource via Groq...
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Applying rigorous analytical structure tailored to your notes.
              </p>
            </div>
          )}

          {/* Empty State */}
          {resources.length === 0 && !generationStatus.isGenerating && (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <Sparkles className="h-10 w-10 text-indigo-600 mx-auto mb-3" />
              <h3 className="font-serif-heading text-xl font-semibold text-slate-900">
                No Learning Resources Generated Yet
              </h3>
              <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
                Select any study tool above (Summary, Quiz, Flashcards, MCQs, Interview Prep, Analogies, or Study Plan) to generate your interactive card.
              </p>
            </div>
          )}

          {/* Render Study Cards */}
          <div className="space-y-8">
            {resources
              .filter(
                (item) => activeTab === "all" || item.type === activeTab
              )
              .map((res) => {
                const handleRegen = async (diff: DifficultyLevel) => {
                  await generateResource(res.type, diff);
                };

                switch (res.type) {
                  case "summary":
                    return (
                      <SummaryCard
                        key={res.id}
                        data={res.content}
                        difficulty={res.difficulty}
                        onRegenerate={handleRegen}
                      />
                    );
                  case "quiz":
                    return (
                      <QuizCard
                        key={res.id}
                        data={res.content}
                        difficulty={res.difficulty}
                        onRegenerate={handleRegen}
                      />
                    );
                  case "flashcards":
                    return (
                      <FlashcardsCard
                        key={res.id}
                        data={res.content}
                        difficulty={res.difficulty}
                        onRegenerate={handleRegen}
                      />
                    );
                  case "mcqs":
                    return (
                      <McqCard
                        key={res.id}
                        data={res.content}
                        difficulty={res.difficulty}
                        onRegenerate={handleRegen}
                      />
                    );
                  case "interview":
                    return (
                      <InterviewCard
                        key={res.id}
                        data={res.content}
                        difficulty={res.difficulty}
                        onRegenerate={handleRegen}
                      />
                    );
                  case "concept_explainer":
                    return (
                      <ConceptExplainerCard
                        key={res.id}
                        data={res.content}
                        difficulty={res.difficulty}
                        onRegenerate={handleRegen}
                      />
                    );
                  case "study_plan":
                    return (
                      <StudyPlanCard
                        key={res.id}
                        data={res.content}
                        difficulty={res.difficulty}
                        onRegenerate={handleRegen}
                      />
                    );
                  default:
                    return null;
                }
              })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
