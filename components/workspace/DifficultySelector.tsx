"use client";

import React from "react";
import { DifficultyLevel } from "@/types/study";
import { Check, ShieldAlert, ShieldCheck, Zap } from "lucide-react";

export interface DifficultySelectorProps {
  currentLevel: DifficultyLevel;
  onSelect: (level: DifficultyLevel) => void;
  disabled?: boolean;
}

export function DifficultySelector({
  currentLevel,
  onSelect,
  disabled = false,
}: DifficultySelectorProps) {
  const levels: {
    level: DifficultyLevel;
    title: string;
    description: string;
    icon: React.ReactNode;
    activeBorder: string;
    activeBg: string;
  }[] = [
    {
      level: "Easy",
      title: "Easy / Foundational",
      description:
        "Direct factual recall, baseline definitions, and straightforward everyday analogies.",
      icon: <ShieldCheck className="h-4 w-4 text-emerald-600" />,
      activeBorder: "border-emerald-600 ring-2 ring-emerald-500/20",
      activeBg: "bg-emerald-50/50",
    },
    {
      level: "Medium",
      title: "Medium / Academic",
      description:
        "Analytical comparisons, cause-and-effect synthesis, and practical university assessments.",
      icon: <Zap className="h-4 w-4 text-indigo-600" />,
      activeBorder: "border-indigo-600 ring-2 ring-indigo-500/20",
      activeBg: "bg-indigo-50/50",
    },
    {
      level: "Hard",
      title: "Hard / Rigorous",
      description:
        "Deep critical evaluation, challenging distractors, edge cases, and principal-level probes.",
      icon: <ShieldAlert className="h-4 w-4 text-amber-600" />,
      activeBorder: "border-amber-600 ring-2 ring-amber-500/20",
      activeBg: "bg-amber-50/50",
    },
  ];

  return (
    <div className="w-full">
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
        Academic Difficulty & Rigor
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {levels.map((item) => {
          const isSelected = currentLevel === item.level;
          return (
            <button
              key={item.level}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(item.level)}
              className={`relative flex flex-col items-start text-left rounded-xl border p-4 transition-all ${
                isSelected
                  ? `${item.activeBorder} ${item.activeBg}`
                  : "border-slate-200 bg-white hover:border-slate-300"
              } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <div className="flex items-center justify-between w-full mb-1.5">
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="font-semibold text-sm text-slate-900">
                    {item.title}
                  </span>
                </div>
                {isSelected && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white">
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
