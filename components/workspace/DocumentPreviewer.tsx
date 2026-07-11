"use client";

import React, { useState } from "react";
import { ExtractedDocument } from "@/types/document";
import { Eye, EyeOff, FileText } from "lucide-react";

export function DocumentPreviewer({ document }: { document: ExtractedDocument }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-2xs overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-slate-50/80 hover:bg-slate-100/80 transition-colors text-left"
      >
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <FileText className="h-4 w-4 text-indigo-700" />
          <span>Inspect Extracted Text Layer</span>
          <span className="text-xs font-normal text-slate-500">
            ({document.wordCount.toLocaleString()} words)
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-slate-600">
          {isOpen ? (
            <>
              <EyeOff className="h-3.5 w-3.5" /> Hide Text
            </>
          ) : (
            <>
              <Eye className="h-3.5 w-3.5" /> View Text
            </>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="p-5 border-t border-slate-200">
          <div className="max-h-72 overflow-y-auto rounded-xl bg-slate-50 p-4 font-mono text-xs text-slate-700 leading-relaxed whitespace-pre-wrap border border-slate-200/60">
            {document.extractedText}
          </div>
        </div>
      )}
    </div>
  );
}
