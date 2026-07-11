import { parseOffice } from "officeparser";

export async function extractTextFromPptx(buffer: Buffer): Promise<string> {
  try {
    const text = await parseOffice(buffer);
    const cleaned = (typeof text === "string" ? text : String(text)).trim();
    if (!cleaned) {
      throw new Error(
        "The uploaded PowerPoint presentation contains no readable slides or text."
      );
    }
    return cleaned;
  } catch (err: any) {
    throw new Error(
      `Failed to parse PowerPoint document: ${
        err.message || "Corrupted presentation file"
      }`
    );
  }
}
