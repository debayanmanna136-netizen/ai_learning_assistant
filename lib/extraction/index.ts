import { SupportedFileExtension } from "@/types/document";
import { extractTextFromPdf } from "./pdf";
import { extractTextFromDocx } from "./docx";
import { extractTextFromPptx } from "./pptx";
import { extractTextFromTxt } from "./text";

export async function extractDocumentText(
  buffer: Buffer,
  extension: SupportedFileExtension
): Promise<{ text: string; wordCount: number; charCount: number }> {
  let rawText = "";

  switch (extension) {
    case "pdf":
      rawText = await extractTextFromPdf(buffer);
      break;
    case "docx":
      rawText = await extractTextFromDocx(buffer);
      break;
    case "pptx":
    case "ppt":
      rawText = await extractTextFromPptx(buffer);
      break;
    case "txt":
      rawText = await extractTextFromTxt(buffer);
      break;
    default:
      throw new Error(`Unsupported file extension: ${extension}`);
  }

  // Clean extra consecutive blank lines / whitespace while preserving structure
  const sanitizedText = rawText
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const charCount = sanitizedText.length;
  const wordCount = sanitizedText.split(/\s+/).filter(Boolean).length;

  return {
    text: sanitizedText,
    wordCount,
    charCount,
  };
}
