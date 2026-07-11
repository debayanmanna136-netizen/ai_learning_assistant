import React from "react";
import {
  BookOpen,
  HelpCircle,
  Layers,
  CheckSquare,
  MessageSquare,
  Lightbulb,
  Calendar,
} from "lucide-react";
import { Card } from "@/components/ui/Card";

export function FeaturesGrid() {
  const features = [
    {
      icon: <BookOpen className="h-6 w-6 text-indigo-700" />,
      title: "Executive Summaries",
      description:
        "Comprehensive structural syntheses highlighting major arguments, essential terminology, and executive takeaways without hallucinating external facts.",
      badge: "Core Synthesis",
    },
    {
      icon: <HelpCircle className="h-6 w-6 text-emerald-700" />,
      title: "Rigorous Academic Quizzes",
      description:
        "Open-ended conceptual self-testing prompts designed to test recall and critical evaluation across Easy, Medium, and Hard rigor.",
      badge: "Difficulty Adjusted",
    },
    {
      icon: <Layers className="h-6 w-6 text-amber-700" />,
      title: "Active-Recall Flashcards",
      description:
        "Interactive flip-cards optimized for spaced repetition, isolating crucial vocabulary, mathematical formulas, and foundational mechanisms.",
      badge: "Interactive Deck",
    },
    {
      icon: <CheckSquare className="h-6 w-6 text-indigo-700" />,
      title: "University-Level MCQs",
      description:
        "Multiple choice assessments featuring pedagogical explanations of correct answers and rigorous distractors.",
      badge: "Instant Feedback",
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-purple-700" />,
      title: "Interview & Oral Exam Prep",
      description:
        "Challenging technical and conceptual interview questions paired with ideal STAR responses and interviewer evaluation criteria.",
      badge: "Career Ready",
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-amber-600" />,
      title: "Difficult Concept Explanations",
      description:
        "Breaks down the hardest, most abstract topics in your notes using memorable real-world analogies and step-by-step logic.",
      badge: "Demystifier",
    },
    {
      icon: <Calendar className="h-6 w-6 text-teal-700" />,
      title: "Structured Study Plans",
      description:
        "Actionable day-by-day study schedules with targeted review milestones and self-audit checklists tailored to your exam timeline.",
      badge: "Roadmap",
    },
  ];

  return (
    <section id="features" className="py-20 bg-slate-50/70 border-y border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
            Dedicated Pedagogical Prompts
          </span>
          <h2 className="mt-2 font-serif-heading text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
            Seven specialized study tools built for academic mastery
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Unlike generic chatbots that hallucinate or provide superficial answers, Scholaria uses dedicated prompt architectures for each study output, remaining faithful to your source material.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <Card
              key={idx}
              className="p-6 flex flex-col justify-between hover:border-indigo-200 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                    {item.icon}
                  </div>
                  <span className="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[11px] font-medium text-slate-700">
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-serif-heading text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
