"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FileUploader } from "@/components/workspace/FileUploader";
import { DifficultySelector } from "@/components/workspace/DifficultySelector";
import { DocumentPreviewer } from "@/components/workspace/DocumentPreviewer";
import { ResourceSelector } from "@/components/workspace/ResourceSelector";
import { useStudySession } from "@/hooks/useStudySession";
import { Alert } from "@/components/ui/Alert";
import { Sparkles, GraduationCap } from "lucide-react";

export default function WorkspacePage() {
  const {
    document,
    setDocument,
    resources,
    preferredDifficulty,
    setPreferredDifficulty,
    generationStatus,
    generateResource,
  } = useStudySession();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-900 border border-indigo-200 mb-3">
              <Sparkles className="h-3.5 w-3.5 text-indigo-700" />
              <span>Academic Workspace</span>
            </div>
            <h1 className="font-serif-heading text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
              Study Document Manager
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
              Upload your textbook chapters, lecture slides, or study notes. Once parsed, select your target academic rigor and generate interactive learning tools.
            </p>
          </div>

          {/* Error Banner during Generation */}
          {generationStatus.error && (
            <div className="mb-6">
              <Alert variant="error" title="AI Generation Error">
                {generationStatus.error}
              </Alert>
            </div>
          )}

          {/* File Upload Section */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs">
              <FileUploader
                currentDocument={document}
                onDocumentExtracted={(doc) => setDocument(doc)}
              />
            </div>

            {document && (
              <>
                {/* Extracted Text Inspector */}
                <DocumentPreviewer document={document} />

                {/* Difficulty Rigor Calibrator */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs">
                  <DifficultySelector
                    currentLevel={preferredDifficulty}
                    onSelect={(level) => setPreferredDifficulty(level)}
                    disabled={generationStatus.isGenerating}
                  />
                </div>

                {/* AI Resource Generation Grid */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs">
                  <ResourceSelector
                    documentId={document.id}
                    resources={resources}
                    isGenerating={generationStatus.isGenerating}
                    activeType={generationStatus.activeType}
                    onGenerate={generateResource}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
