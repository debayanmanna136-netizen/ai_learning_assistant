"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles, FileText, CheckCircle2, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
      {/* Soft Academic Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[500px] w-[800px] rounded-full bg-gradient-to-tr from-indigo-100/60 via-emerald-50/40 to-slate-100/60 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Headline & CTA */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-3.5 py-1.5 text-xs font-semibold text-indigo-900 shadow-xs mb-6"
            >
              <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
              <span>Academic Intelligence Built for Deep Understanding</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 leading-[1.12]"
            >
              Master difficult concepts, not just <span className="italic text-indigo-900">memorize</span> them.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl"
            >
              Upload lecture notes, textbooks, or slides in PDF, DOCX, or PPTX. Scholaria synthesizes your study materials into rigorous summaries, interactive quizzes, flashcards, MCQs, concept analogies, and structured study plans.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/workspace"
                className="inline-flex items-center gap-2.5 rounded-xl bg-indigo-900 px-6 py-3.5 text-base font-medium text-white shadow-md shadow-indigo-900/20 transition-all hover:bg-indigo-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span>Upload Study Material</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-base font-medium text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-400"
              >
                Explore 7 AI Study Tools
              </a>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-200/80 pt-6 text-xs text-slate-600"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Faithful to Your Notes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>PDF, DOCX, PPTX & TXT</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>3 Difficulty Levels</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Study Workspace Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-200/60">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-900">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-slate-900">
                      Neurobiology_Lecture_04.pdf
                    </h3>
                    <p className="text-[11px] text-slate-500">14 pages • 4,820 words</p>
                  </div>
                </div>
                <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-medium text-indigo-800 border border-indigo-200">
                  Medium Rigor
                </span>
              </div>

              {/* Sample Concept Explainer Card Preview */}
              <div className="mt-5 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
                    Concept Analogy Demystifier
                  </span>
                  <Zap className="h-3.5 w-3.5 text-amber-500" />
                </div>
                <h4 className="font-serif-heading font-semibold text-slate-900 text-base">
                  Action Potential Propagation
                </h4>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  Think of an axon like a line of dominoes spaced perfectly along a table. Depolarization is the first domino falling—it triggers the next voltage-gated sodium channel without losing momentum.
                </p>
              </div>

              {/* Mini MCQ Interactive Preview */}
              <div className="mt-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Multiple Choice Self-Test
                </span>
                <p className="mt-1 text-xs font-medium text-slate-800">
                  Which ion influx initiates the rapid rising phase of an action potential?
                </p>
                <div className="mt-3 space-y-1.5">
                  <div className="flex items-center justify-between rounded-lg border border-emerald-300 bg-emerald-50/60 px-3 py-2 text-xs font-medium text-emerald-900">
                    <span>B. Voltage-gated Na⁺ channels open</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  </div>
                  <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50/40 px-3 py-2 text-xs text-slate-500">
                    <span>C. K⁺ efflux repolarization</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
