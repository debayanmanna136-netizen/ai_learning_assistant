import Groq from "groq-sdk";

export interface GroqCompletionOptions {
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
  maxTokens?: number;
  timeoutMs?: number;
  maxRetries?: number;
}

/**
 * Sanitizes and extracts valid JSON from raw LLM output strings
 */
export function extractJsonFromResponse(rawText: string): any {
  if (!rawText || typeof rawText !== "string") {
    throw new Error("Empty or invalid response from AI provider.");
  }

  // 1. Try direct parse
  try {
    return JSON.parse(rawText.trim());
  } catch {
    // Continue to regex cleaning
  }

  // 2. Extract JSON block inside ```json ... ``` or ``` ... ```
  const markdownMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (markdownMatch && markdownMatch[1]) {
    try {
      return JSON.parse(markdownMatch[1].trim());
    } catch {
      // Continue to bracket match
    }
  }

  // 3. Find outermost JSON object {...}
  const firstBrace = rawText.indexOf("{");
  const lastBrace = rawText.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const jsonSubstring = rawText.substring(firstBrace, lastBrace + 1);
    try {
      return JSON.parse(jsonSubstring);
    } catch (err) {
      throw new Error("Failed to parse structured JSON object from AI response.");
    }
  }

  throw new Error("AI output did not contain a valid structured JSON format.");
}

/**
 * Executes a Groq API chat completion request with retry logic and timeout handling
 */
export async function callGroqWithRetry<T = any>(
  options: GroqCompletionOptions
): Promise<T> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY is not set in environment variables (.env.local)."
    );
  }

  const groq = new Groq({ apiKey });
  const timeoutMs = options.timeoutMs ?? 45000; // default 45 seconds
  const maxRetries = options.maxRetries ?? 2;
  const temperature = options.temperature ?? 0.2;
  const maxTokens = options.maxTokens ?? 4096;

  let attempt = 0;
  let lastError: Error | null = null;

  while (attempt <= maxRetries) {
    attempt++;
    try {
      // Create a timeout promise
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => {
          reject(
            new Error(
              `Groq API request timed out after ${timeoutMs / 1000} seconds.`
            )
          );
        }, timeoutMs)
      );

      const completionPromise = groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: options.systemPrompt,
          },
          {
            role: "user",
            content: options.userPrompt,
          },
        ],
        temperature,
        max_tokens: maxTokens,
        response_format: { type: "json_object" },
      });

      const completion = await Promise.race([
        completionPromise,
        timeoutPromise,
      ]);

      const contentText = completion.choices[0]?.message?.content ?? "";
      const parsedJson = extractJsonFromResponse(contentText);
      return parsedJson as T;
    } catch (error: any) {
      lastError =
        error instanceof Error
          ? error
          : new Error("Unknown Groq API request error.");

      // If it's the last attempt or an auth error, do not retry
      if (
        attempt > maxRetries ||
        error?.status === 401 ||
        error?.status === 403
      ) {
        break;
      }

      // Exponential backoff
      const delayMs = attempt * 1200;
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  throw (
    lastError ??
    new Error("Failed to complete Groq API request after multiple retries.")
  );
}
