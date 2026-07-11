import mammoth from "mammoth";

export async function extractTextFromDocx(buffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    const text = result.value?.trim() || "";
    if (!text) {
      throw new Error("The uploaded DOCX file contains no extractable text.");
    }
    return text;
  } catch (err: any) {
    throw new Error(
      `Failed to parse DOCX document: ${err.message || "Corrupted DOCX file"}`
    );
  }
}
