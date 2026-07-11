"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  Download,
  RefreshCw,
  Loader2,
  Sparkles,
} from "lucide-react";
import { DifficultyLevel, ResourceType } from "@/types/study";
import { DifficultyBadge } from "@/components/ui/DifficultyBadge";

export interface ResourceCardHeaderProps {
  title: string;
  type: ResourceType;
  difficulty: DifficultyLevel;
  exportText: string;
  isRegenerating?: boolean;
  onRegenerate?: (difficulty: DifficultyLevel) => Promise<void>;
}

export function ResourceCardHeader({
  title,
  type,
  difficulty,
  exportText,
  isRegenerating = false,
  onRegenerate,
}: ResourceCardHeaderProps) {
  const [copied, setCopied] = useState(false);
  const [showRegenMenu, setShowRegenMenu] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exportText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy to clipboard:", e);
    }
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([exportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, "_")}_${difficulty.toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
      <div className="flex items-center gap-3">
        <h3 className="font-serif-heading text-lg font-semibold text-slate-900">
          {title}
        </h3>
        <DifficultyBadge level={difficulty} />
      </div>

      <div className="flex items-center gap-2">
        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          title="Copy formatted text"
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-emerald-700">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-slate-500" />
              <span>Copy</span>
            </>
          )}
        </button>

        {/* Download TXT Button */}
        <button
          type="button"
          onClick={handleDownloadTxt}
          title="Download as plain text file"
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <Download className="h-3.5 w-3.5 text-slate-500" />
          <span>Download TXT</span>
        </button>

        {/* Regenerate Dropdown */}
        {onRegenerate && (
          <div className="relative">
            <button
              type="button"
              disabled={isRegenerating}
              onClick={() => setShowRegenMenu(!showRegenMenu)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800 transition-colors disabled:opacity-60"
            >
              {isRegenerating ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Regenerating...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Regenerate</span>
                </>
              )}
            </button>

            {showRegenMenu && !isRegenerating && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg z-20">
                {(["Easy", "Medium", "Hard"] as DifficultyLevel[]).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={async () => {
                      setShowRegenMenu(false);
                      await onRegenerate(level);
                    }}
                    className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 text-left"
                  >
                    <span>{level} Rigor</span>
                    {level === difficulty && (
                      <Check className="h-3 w-3 text-indigo-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
