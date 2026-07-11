import { NextRequest, NextResponse } from "next/server";
import { callGroqWithRetry } from "@/lib/groq/client";
import { buildStudyPrompt } from "@/lib/groq/prompts";
import { DifficultyLevel, ResourceType } from "@/types/study";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      resourceType,
      documentTitle = "Untitled Study Document",
      sourceText,
      difficulty = "Medium",
    } = body as {
      resourceType?: ResourceType;
      documentTitle?: string;
      sourceText?: string;
      difficulty?: DifficultyLevel;
    };

    if (!resourceType) {
      return NextResponse.json(
        { success: false, error: "Missing required parameter: resourceType." },
        { status: 400 }
      );
    }

    if (!sourceText || typeof sourceText !== "string" || sourceText.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No source text provided. Please upload a document with readable text before generating resources.",
        },
        { status: 400 }
      );
    }

    // Check API Key
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error:
            "GROQ_API_KEY is missing in environment variables. Please check your .env.local file.",
        },
        { status: 500 }
      );
    }

    const { systemPrompt, userPrompt } = buildStudyPrompt(
      resourceType,
      documentTitle,
      sourceText,
      difficulty
    );

    const generatedData = await callGroqWithRetry({
      systemPrompt,
      userPrompt,
      temperature: resourceType === "summary" ? 0.15 : 0.25,
      maxTokens: 4096,
      timeoutMs: 45000,
      maxRetries: 2,
    });

    return NextResponse.json({
      success: true,
      data: generatedData,
    });
  } catch (error: any) {
    console.error("Error in /api/generate:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred during AI resource generation.";

    // Determine friendly HTTP status
    let status = 500;
    if (errorMessage.includes("timed out")) {
      status = 504;
    } else if (
      errorMessage.includes("GROQ_API_KEY is not set") ||
      errorMessage.includes("GROQ_API_KEY is missing")
    ) {
      status = 503;
    } else if (errorMessage.includes("401") || errorMessage.includes("Invalid API Key")) {
      status = 401;
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status }
    );
  }
}
