"use client";

import React, { useState } from "react";
import { FlashcardsOutput, DifficultyLevel } from "@/types/study";
import { ResourceCardHeader } from "./ResourceCardHeader";
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Layers,
  List,
} from "lucide-react";
import { motion } from "framer-motion";

export function FlashcardsCard({
  data,
  difficulty,
  onRegenerate,
}: {
  data: FlashcardsOutput;
  difficulty: DifficultyLevel;
  onRegenerate?: (diff: DifficultyLevel) => Promise<void>;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<"deck" | "list">("deck");

  const cards = data.cards || [];
  const total = cards.length;
  const currentCard = cards[currentIndex] || {
    front: "No cards available",
    back: "Try regenerating this resource.",
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const exportText = [
    `FLASHCARDS TITLE: ${data.title} (${difficulty} Rigor)`,
    ...cards.map(
      (c, idx) =>
        `\nCard ${idx + 1} [${c.category || "General"}]:\n  FRONT: ${c.front}\n  BACK: ${c.back}`
    ),
  ].join("\n");

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs">
      <ResourceCardHeader
        title={data.title || "Spaced Repetition Flashcards"}
        type="flashcards"
        difficulty={difficulty}
        exportText={exportText}
        onRegenerate={onRegenerate}
      />

      {/* Mode Toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Card {total > 0 ? currentIndex + 1 : 0} of {total}
          </span>
          {currentCard.category && (
            <span className="rounded-full bg-indigo-50 border border-indigo-200 px-2 py-0.5 text-[10px] font-medium text-indigo-800">
              {currentCard.category}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setViewMode(viewMode === "deck" ? "list" : "deck")}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          {viewMode === "deck" ? (
            <>
              <List className="h-3.5 w-3.5" /> View List
            </>
          ) : (
            <>
              <Layers className="h-3.5 w-3.5" /> Interactive Deck
            </>
          )}
        </button>
      </div>

      {viewMode === "deck" ? (
        <div className="flex flex-col items-center">
          {/* Interactive Flip Card */}
          <motion.div
            onClick={() => setIsFlipped(!isFlipped)}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.45 }}
            className="w-full min-h-[260px] cursor-pointer rounded-2xl border-2 border-indigo-200 bg-gradient-to-br from-white to-indigo-50/30 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between text-center relative"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="w-full flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-slate-400"
              style={{ backfaceVisibility: "hidden" }}
            >
              <span>{isFlipped ? "Answer (Back)" : "Prompt (Front)"}</span>
              <span className="flex items-center gap-1 text-indigo-600">
                <RotateCw className="h-3.5 w-3.5" /> Click to Flip
              </span>
            </div>

            <div
              className="my-auto py-6"
              style={{
                backfaceVisibility: "hidden",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              <p className="font-serif-heading text-lg sm:text-xl font-semibold text-slate-900 leading-relaxed max-w-xl mx-auto">
                {isFlipped ? currentCard.back : currentCard.front}
              </p>
            </div>

            <div
              className="text-[11px] text-slate-400"
              style={{
                backfaceVisibility: "hidden",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {isFlipped ? "Flip back to prompt" : "Flip to reveal model answer"}
            </div>
          </motion.div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4 w-full">
            <button
              type="button"
              onClick={handlePrev}
              disabled={total <= 1}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous Card</span>
            </button>

            <button
              type="button"
              onClick={() => setIsFlipped(!isFlipped)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-900 px-5 py-2.5 text-xs font-medium text-white shadow-xs hover:bg-indigo-800 transition-colors"
            >
              <RotateCw className="h-3.5 w-3.5" />
              <span>Flip Card</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={total <= 1}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 transition-colors"
            >
              <span>Next Card</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Table View */
        <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
          {cards.map((card, idx) => (
            <div key={idx} className="p-4 bg-white hover:bg-slate-50/60 transition-colors">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-indigo-700">
                  Card #{idx + 1}
                </span>
                {card.category && (
                  <span className="text-[10px] uppercase font-medium text-slate-500">
                    {card.category}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <span className="text-[10px] font-semibold uppercase text-slate-400 block mb-1">
                    Front (Prompt)
                  </span>
                  <p className="text-xs font-medium text-slate-900">
                    {card.front}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase text-slate-400 block mb-1">
                    Back (Explanation)
                  </span>
                  <p className="text-xs text-slate-700">
                    {card.back}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
