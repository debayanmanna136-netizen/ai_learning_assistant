"use client";

import { useState, useEffect, useCallback } from "react";
import { ExtractedDocument } from "@/types/document";
import {
  DifficultyLevel,
  GeneratedContent,
  ResourceType,
  StoredResource,
} from "@/types/study";

const STORAGE_KEY_DOC = "scholaria_active_doc_v1";
const STORAGE_KEY_RESOURCES = "scholaria_resources_v1";
const STORAGE_KEY_DIFFICULTY = "scholaria_preferred_difficulty_v1";

export interface GenerationStatus {
  isGenerating: boolean;
  activeType: ResourceType | null;
  error: string | null;
}

export function useStudySession() {
  const [document, setDocumentState] = useState<ExtractedDocument | null>(null);
  const [resources, setResourcesState] = useState<StoredResource[]>([]);
  const [preferredDifficulty, setPreferredDifficultyState] =
    useState<DifficultyLevel>("Medium");
  const [generationStatus, setGenerationStatus] = useState<GenerationStatus>({
    isGenerating: false,
    activeType: null,
    error: null,
  });
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedDoc = localStorage.getItem(STORAGE_KEY_DOC);
      const savedResources = localStorage.getItem(STORAGE_KEY_RESOURCES);
      const savedDifficulty = localStorage.getItem(STORAGE_KEY_DIFFICULTY);

      if (savedDoc) {
        setDocumentState(JSON.parse(savedDoc));
      }
      if (savedResources) {
        setResourcesState(JSON.parse(savedResources));
      }
      if (
        savedDifficulty === "Easy" ||
        savedDifficulty === "Medium" ||
        savedDifficulty === "Hard"
      ) {
        setPreferredDifficultyState(savedDifficulty);
      }
    } catch (e) {
      console.error("Failed to load session from storage:", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save changes to localStorage
  const setDocument = useCallback((doc: ExtractedDocument | null) => {
    setDocumentState(doc);
    if (doc) {
      localStorage.setItem(STORAGE_KEY_DOC, JSON.stringify(doc));
    } else {
      localStorage.removeItem(STORAGE_KEY_DOC);
      localStorage.removeItem(STORAGE_KEY_RESOURCES);
      setResourcesState([]);
    }
  }, []);

  const setPreferredDifficulty = useCallback((diff: DifficultyLevel) => {
    setPreferredDifficultyState(diff);
    localStorage.setItem(STORAGE_KEY_DIFFICULTY, diff);
  }, []);

  const addResource = useCallback(
    (
      type: ResourceType,
      difficulty: DifficultyLevel,
      content: GeneratedContent
    ) => {
      setResourcesState((prev) => {
        // Replace existing of same type if present
        const filtered = prev.filter((r) => r.type !== type);
        const next: StoredResource[] = [
          ...filtered,
          {
            id: `res_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            documentId: document?.id || "unknown",
            type,
            difficulty,
            createdAt: new Date().toISOString(),
            content,
          },
        ];
        localStorage.setItem(STORAGE_KEY_RESOURCES, JSON.stringify(next));
        return next;
      });
    },
    [document?.id]
  );

  const removeResource = useCallback((type: ResourceType) => {
    setResourcesState((prev) => {
      const next = prev.filter((r) => r.type !== type);
      localStorage.setItem(STORAGE_KEY_RESOURCES, JSON.stringify(next));
      return next;
    });
  }, []);

  const generateResource = useCallback(
    async (type: ResourceType, difficultyOverride?: DifficultyLevel) => {
      if (!document || !document.extractedText) {
        setGenerationStatus({
          isGenerating: false,
          activeType: null,
          error: "Please upload a valid document before generating resources.",
        });
        return false;
      }

      const difficulty = difficultyOverride || preferredDifficulty;

      setGenerationStatus({
        isGenerating: true,
        activeType: type,
        error: null,
      });

      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resourceType: type,
            documentTitle: document.name,
            sourceText: document.extractedText,
            difficulty,
          }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || "Failed to generate learning resource.");
        }

        addResource(type, difficulty, data.data);
        setGenerationStatus({
          isGenerating: false,
          activeType: null,
          error: null,
        });
        return true;
      } catch (error: any) {
        const message =
          error instanceof Error ? error.message : "Unexpected error during generation.";
        setGenerationStatus({
          isGenerating: false,
          activeType: null,
          error: message,
        });
        return false;
      }
    },
    [document, preferredDifficulty, addResource]
  );

  return {
    document,
    setDocument,
    resources,
    preferredDifficulty,
    setPreferredDifficulty,
    generationStatus,
    generateResource,
    removeResource,
    isInitialized,
  };
}
