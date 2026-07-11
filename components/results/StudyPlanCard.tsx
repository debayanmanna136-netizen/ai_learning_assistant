"use client";

import React, { useState } from "react";
import { StudyPlanOutput, DifficultyLevel } from "@/types/study";
import { ResourceCardHeader } from "./ResourceCardHeader";
import {
  Calendar,
  Clock,
  CheckSquare,
  CheckCircle2,
  ListTodo,
} from "lucide-react";

export function StudyPlanCard({
  data,
  difficulty,
  onRegenerate,
}: {
  data: StudyPlanOutput;
  difficulty: DifficultyLevel;
  onRegenerate?: (diff: DifficultyLevel) => Promise<void>;
}) {
  const [completedChecklist, setCompletedChecklist] = useState<
    Record<number, boolean>
  >({});

  const toggleCheck = (idx: number) => {
    setCompletedChecklist((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const exportText = [
    `STUDY PLAN TITLE: ${data.title} (${difficulty} Rigor)`,
    `Overview: ${data.overview}`,
    `Total Schedule: ${data.totalDays} Days`,
    `\n=== DAILY TIMETABLE ===`,
    ...data.dailyPlan.map(
      (day) =>
        `\nDay ${day.dayNumber}: ${day.focusArea} (${day.timeAllocationMinutes} min)\n` +
        `  Objectives:\n` +
        day.objectives.map((o) => `    • ${o}`).join("\n") +
        `\n  Activities:\n` +
        day.suggestedActivities.map((a) => `    [ ] ${a}`).join("\n")
    ),
    `\n=== FINAL REVIEW CHECKLIST ===`,
    ...(data.reviewChecklist || []).map((c) => `[ ] ${c}`),
  ].join("\n");

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs">
      <ResourceCardHeader
        title={data.title || "Structured Study Timeline & Plan"}
        type="study_plan"
        difficulty={difficulty}
        exportText={exportText}
        onRegenerate={onRegenerate}
      />

      {/* Overview Banner */}
      <div className="mb-6 rounded-xl border border-teal-200 bg-teal-50/50 p-4">
        <div className="flex items-center gap-2 mb-1">
          <Calendar className="h-4 w-4 text-teal-700" />
          <span className="text-xs font-bold uppercase tracking-wider text-teal-900">
            {data.totalDays}-Day Mastery Schedule
          </span>
        </div>
        <p className="text-xs sm:text-sm text-teal-950 leading-relaxed">
          {data.overview}
        </p>
      </div>

      {/* Daily Plan */}
      <div className="space-y-4 mb-8">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Day-by-Day Study Roadmap
        </h4>

        {data.dailyPlan.map((day, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-slate-200/80 bg-slate-50/40 p-4 sm:p-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/70 pb-3 mb-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-900 text-white text-xs font-bold">
                  D{day.dayNumber}
                </span>
                <h5 className="font-serif-heading font-semibold text-slate-900 text-base">
                  {day.focusArea}
                </h5>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 self-start sm:self-auto">
                <Clock className="h-3.5 w-3.5 text-indigo-600" />
                <span>{day.timeAllocationMinutes} min session</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-[11px] font-semibold uppercase text-slate-500 block mb-2">
                  Session Objectives
                </span>
                <ul className="space-y-1.5">
                  {day.objectives.map((obj, oIdx) => (
                    <li
                      key={oIdx}
                      className="flex items-start gap-2 text-xs text-slate-700"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 shrink-0 mt-1.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-[11px] font-semibold uppercase text-slate-500 block mb-2">
                  Suggested Learning Activities
                </span>
                <ul className="space-y-1.5">
                  {day.suggestedActivities.map((act, aIdx) => (
                    <li
                      key={aIdx}
                      className="flex items-start gap-2 text-xs text-slate-700"
                    >
                      <ListTodo className="h-3.5 w-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Review Checklist */}
      {data.reviewChecklist && data.reviewChecklist.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Final Exam Readiness Self-Audit Checklist
          </h4>
          <div className="space-y-2">
            {data.reviewChecklist.map((item, idx) => {
              const isChecked = !!completedChecklist[idx];
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleCheck(idx)}
                  className={`w-full flex items-center justify-between rounded-xl border p-3.5 text-left text-xs sm:text-sm transition-all cursor-pointer ${
                    isChecked
                      ? "border-emerald-300 bg-emerald-50/60 text-emerald-950 line-through"
                      : "border-slate-200 bg-white hover:border-slate-300 text-slate-800"
                  }`}
                >
                  <span>{item}</span>
                  <CheckCircle2
                    className={`h-4 w-4 shrink-0 ${
                      isChecked ? "text-emerald-600" : "text-slate-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
