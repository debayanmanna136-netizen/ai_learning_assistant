"use client";

import React, { useState } from "react";
import { McqOutput, DifficultyLevel } from "@/types/study";
import { ResourceCardHeader } from "./ResourceCardHeader";
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export function McqCard({
  data,
  difficulty,
  onRegenerate,
}: {
  data: McqOutput;
  difficulty: DifficultyLevel;
  onRegenerate?: (diff: DifficultyLevel) => Promise<void>;
}) {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, "A" | "B" | "C" | "D">
  >({});

  const handleSelect = (qIndex: number, label: "A" | "B" | "C" | "D") => {
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: label }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
  };

  const questions = data.questions || [];
  const answeredCount = Object.keys(selectedAnswers).length;

  // Calculate score
  let correctCount = 0;
  questions.forEach((q, idx) => {
    if (selectedAnswers[idx] === q.correctAnswer) {
      correctCount++;
    }
  });

  const exportText = [
    `MCQ ASSESSMENT TITLE: ${data.title} (${difficulty} Rigor)`,
    ...questions.map(
      (q, idx) =>
        `\nQ${idx + 1}: ${q.question}\n` +
        q.options.map((opt) => `  [${opt.label}] ${opt.text}`).join("\n") +
        `\nCorrect Answer: ${q.correctAnswer}\nExplanation: ${q.explanation}`
    ),
  ].join("\n");

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs">
      <ResourceCardHeader
        title={data.title || "Multiple Choice Assessment"}
        type="mcqs"
        difficulty={difficulty}
        exportText={exportText}
        onRegenerate={onRegenerate}
      />

      {/* Assessment Progress Header */}
      <div className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200/80 p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-900 text-white font-semibold text-sm">
            {correctCount}/{questions.length}
          </div>
          <div>
            <span className="font-semibold text-sm text-slate-900">
              {answeredCount === 0
                ? "Select an answer to test your recall"
                : `Score: ${correctCount} correct out of ${answeredCount} answered`}
            </span>
            <p className="text-xs text-slate-500">
              Instant feedback reveals pedagogical explanations
            </p>
          </div>
        </div>

        {answeredCount > 0 && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Test</span>
          </button>
        )}
      </div>

      <div className="space-y-6">
        {questions.map((q, idx) => {
          const selected = selectedAnswers[idx];
          const isAnswered = !!selected;
          const isCorrect = selected === q.correctAnswer;

          return (
            <div
              key={idx}
              className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-2xs"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-indigo-700 mb-1">
                    Question {idx + 1}
                  </span>
                  <p className="font-semibold text-sm text-slate-900 leading-relaxed">
                    {q.question}
                  </p>
                </div>

                {isAnswered && (
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium shrink-0 ${
                      isCorrect
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" /> Correct
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3.5 w-3.5" /> Incorrect
                      </>
                    )}
                  </span>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2">
                {q.options.map((opt) => {
                  const isThisSelected = selected === opt.label;
                  const isThisCorrectAnswer = q.correctAnswer === opt.label;

                  let optionStyle =
                    "border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-100/60 text-slate-800";

                  if (isAnswered) {
                    if (isThisCorrectAnswer) {
                      optionStyle =
                        "border-emerald-500 bg-emerald-50/80 text-emerald-950 font-medium";
                    } else if (isThisSelected && !isThisCorrectAnswer) {
                      optionStyle =
                        "border-red-400 bg-red-50/80 text-red-900";
                    } else {
                      optionStyle = "border-slate-200 bg-white opacity-60 text-slate-500";
                    }
                  }

                  return (
                    <button
                      key={opt.label}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleSelect(idx, opt.label)}
                      className={`w-full flex items-center justify-between rounded-xl border p-3.5 text-left text-xs sm:text-sm transition-all ${optionStyle} ${
                        !isAnswered ? "cursor-pointer" : "cursor-default"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-700 shrink-0">
                          {opt.label}
                        </span>
                        <span>{opt.text}</span>
                      </div>

                      {isAnswered && isThisCorrectAnswer && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      )}
                      {isAnswered && isThisSelected && !isThisCorrectAnswer && (
                        <XCircle className="h-4 w-4 text-red-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {isAnswered && (
                <div className="mt-4 rounded-xl border border-indigo-200 bg-indigo-50/40 p-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-800 block mb-1">
                    Pedagogical Explanation
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
