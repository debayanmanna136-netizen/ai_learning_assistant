export async function extractTextFromTxt(buffer: Buffer): Promise<string> {
  try {
    const text = buffer.toString("utf-8").trim();
    if (!text) {
      throw new Error("The uploaded text file is empty.");
    }
    return text;
  } catch (err: any) {
    throw new Error(
      `Failed to read text file: ${err.message || "Invalid UTF-8 encoding"}`
    );
  }
}
