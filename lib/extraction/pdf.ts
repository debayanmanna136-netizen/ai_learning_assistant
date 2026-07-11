import pdfParse from "pdf-parse";

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  try {
    const data = await pdfParse(buffer);
    const text = data.text?.trim() || "";
    if (!text) {
      throw new Error(
        "The uploaded PDF appears to be scanned or contains no extractable text layer."
      );
    }
    return text;
  } catch (err: any) {
    if (err.message?.includes("scanned")) {
      throw err;
    }
    throw new Error(
      `Failed to parse PDF document: ${err.message || "Corrupted PDF file"}`
    );
  }
}
