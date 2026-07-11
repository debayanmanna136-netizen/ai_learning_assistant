"use client";

import React, { useState, useRef } from "react";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  FileCode,
  Loader2,
  PlusCircle,
  Layers,
} from "lucide-react";
import { ExtractedDocument } from "@/types/document";
import { Alert } from "@/components/ui/Alert";

export interface FileUploaderProps {
  currentDocument: ExtractedDocument | null;
  onDocumentExtracted: (doc: ExtractedDocument | null) => void;
}

export function FileUploader({
  currentDocument,
  onDocumentExtracted,
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatusText, setUploadStatusText] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addFileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = async (
    files: File[],
    appendMode: boolean = false
  ) => {
    setErrorMessage(null);

    if (files.length === 0) return;

    const allowedExts = ["pdf", "docx", "pptx", "ppt", "txt"];
    for (const file of files) {
      const ext = file.name.split(".").pop()?.toLowerCase() || "";
      if (!allowedExts.includes(ext)) {
        setErrorMessage(
          `Unsupported file format "${file.name}". Please upload PDF, DOCX, PPT/PPTX, or TXT files.`
        );
        return;
      }
      if (file.size > 15 * 1024 * 1024) {
        setErrorMessage(
          `File "${file.name}" (${(file.size / (1024 * 1024)).toFixed(
            1
          )} MB) exceeds the 15 MB limit.`
        );
        return;
      }
    }

    setIsUploading(true);

    try {
      const extractedDocs: ExtractedDocument[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadStatusText(
          files.length > 1
            ? `Extracting file ${i + 1} of ${files.length}: ${file.name}...`
            : `Extracting academic text from ${file.name}...`
        );

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/extract", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok || !data.success || !data.document) {
          throw new Error(
            data.error || `Failed to extract text from ${file.name}.`
          );
        }

        extractedDocs.push(data.document);
      }

      // If appending to existing document, include it as the first item
      const allDocs: ExtractedDocument[] =
        appendMode && currentDocument
          ? [currentDocument, ...extractedDocs]
          : extractedDocs;

      if (allDocs.length === 1) {
        onDocumentExtracted({
          ...allDocs[0],
          filesCount: 1,
          fileNames: [allDocs[0].name],
        });
      } else {
        // Combine multiple documents into a unified Study Bundle
        const fileNames = allDocs.flatMap(
          (d) => d.fileNames || [d.name]
        );
        const combinedText = allDocs
          .map(
            (d, idx) =>
              `=== DOCUMENT ${idx + 1}: ${d.name} ===\n\n${d.extractedText.trim()}`
          )
          .join("\n\n----------------------------------------\n\n");

        const totalWords = allDocs.reduce(
          (sum, d) => sum + (d.wordCount || 0),
          0
        );
        const totalChars = allDocs.reduce(
          (sum, d) => sum + (d.charCount || 0),
          0
        );
        const totalSize = allDocs.reduce((sum, d) => sum + (d.size || 0), 0);

        const bundleName =
          fileNames.length === 2
            ? `${fileNames[0]} & ${fileNames[1]}`
            : `${fileNames[0]} + ${fileNames.length - 1} more study files`;

        const combinedBundle: ExtractedDocument = {
          id: `bundle_${Date.now()}`,
          name: bundleName,
          size: totalSize,
          extension: "pdf", // default generic badge
          uploadedAt: new Date().toISOString(),
          extractedText: combinedText,
          wordCount: totalWords,
          charCount: totalChars,
          filesCount: fileNames.length,
          fileNames,
        };

        onDocumentExtracted(combinedBundle);
      }
    } catch (error: any) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while processing the files."
      );
    } finally {
      setIsUploading(false);
      setUploadStatusText("");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      processFiles(droppedFiles, false);
    }
  };

  return (
    <div className="w-full">
      {errorMessage && (
        <div className="mb-4">
          <Alert variant="error" title="Upload Failed">
            {errorMessage}
          </Alert>
        </div>
      )}

      {!currentDocument ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition-all cursor-pointer ${
            isDragging
              ? "border-indigo-600 bg-indigo-50/70"
              : "border-slate-300 bg-slate-50/50 hover:border-indigo-400 hover:bg-slate-50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.docx,.pptx,.ppt,.txt"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                processFiles(Array.from(e.target.files), false);
              }
            }}
            className="hidden"
          />

          {isUploading ? (
            <div className="flex flex-col items-center gap-3 py-4">
              <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
              <p className="font-semibold text-slate-800 text-sm">
                {uploadStatusText || "Extracting academic text from documents..."}
              </p>
            </div>
          ) : (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-200/80 mb-4">
                <UploadCloud className="h-7 w-7 text-indigo-700" />
              </div>
              <h3 className="font-serif-heading text-lg font-semibold text-slate-900">
                Drag & drop one or more study files here
              </h3>
              <p className="mt-1 text-xs text-slate-500 max-w-sm">
                Select multiple PDFs, Word (.docx), PowerPoint (.pptx), or Text files to combine into a unified Study Pack
              </p>
              <button
                type="button"
                className="mt-5 rounded-xl bg-indigo-900 px-4 py-2 text-xs font-medium text-white shadow-xs hover:bg-indigo-800 transition-colors"
              >
                Browse Files (Multi-Select Supported)
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50/30 p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-900 text-white shrink-0">
                {(currentDocument.filesCount || 1) > 1 ? (
                  <Layers className="h-6 w-6" />
                ) : (
                  <FileText className="h-6 w-6" />
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-slate-900 truncate text-sm">
                    {currentDocument.name}
                  </h4>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-800">
                    <CheckCircle2 className="h-3 w-3" />{" "}
                    {(currentDocument.filesCount || 1) > 1
                      ? `${currentDocument.filesCount} Files Combined`
                      : "Ready"}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                  <span>
                    {(currentDocument.size / 1024).toFixed(0)} KB
                  </span>
                  <span>•</span>
                  <span>{currentDocument.wordCount.toLocaleString()} words</span>
                  {(currentDocument.filesCount || 1) > 1 &&
                    currentDocument.fileNames && (
                      <>
                        <span>•</span>
                        <span className="truncate max-w-[200px] text-slate-600">
                          {currentDocument.fileNames.join(", ")}
                        </span>
                      </>
                    )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => addFileInputRef.current?.click()}
                disabled={isUploading}
                className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-300 bg-indigo-50 px-3.5 py-2 text-xs font-semibold text-indigo-900 hover:bg-indigo-100 transition-colors"
              >
                <PlusCircle className="h-3.5 w-3.5 text-indigo-700" />
                <span>+ Add File to Pack</span>
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5 text-slate-500" />
                <span>Replace</span>
              </button>
            </div>
          </div>

          {isUploading && (
            <div className="mt-3 flex items-center gap-2 text-xs text-indigo-700 font-medium">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>{uploadStatusText}</span>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.docx,.pptx,.ppt,.txt"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                processFiles(Array.from(e.target.files), false);
              }
            }}
            className="hidden"
          />
          <input
            ref={addFileInputRef}
            type="file"
            multiple
            accept=".pdf,.docx,.pptx,.ppt,.txt"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                processFiles(Array.from(e.target.files), true);
              }
            }}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}
