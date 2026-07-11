import React from "react";
import { Upload, Sliders, GraduationCap } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: <Upload className="h-6 w-6 text-indigo-700" />,
      title: "Upload Your Notes & Slides",
      description:
        "Drop any PDF textbook chapter, Word lecture summary, PowerPoint slide deck, or text notes into the workspace. Instant extraction parses clean text while discarding visual noise.",
    },
    {
      step: "02",
      icon: <Sliders className="h-6 w-6 text-indigo-700" />,
      title: "Select AI Study Tools & Rigor",
      description:
        "Choose your target difficulty level (Easy, Medium, Hard) and pick which learning resources you need—from active-recall flashcards to concept analogies.",
    },
    {
      step: "03",
      icon: <GraduationCap className="h-6 w-6 text-indigo-700" />,
      title: "Study Smarter & Export",
      description:
        "Interact with flip cards, answer MCQs with instant pedagogical feedback, regenerate at different difficulty tiers, or download as formatted text for offline review.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
            Systematic Workflow
          </span>
          <h2 className="mt-2 font-serif-heading text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
            How Scholaria transforms static notes into active learning
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl border border-slate-200/80 bg-slate-50/50 p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-slate-200 shadow-2xs">
                    {item.icon}
                  </div>
                  <span className="font-serif-heading text-2xl font-bold text-slate-300">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-serif-heading text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
