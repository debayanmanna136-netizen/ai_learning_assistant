import { NextRequest, NextResponse } from "next/server";
import { extractDocumentText } from "@/lib/extraction";
import { ExtractedDocument, SupportedFileExtension } from "@/types/document";

const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: "No file was uploaded. Please select a valid document.",
        },
        { status: 400 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "The uploaded file is empty (0 bytes).",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        {
          success: false,
          error: `File size exceeds the maximum allowed limit of 15 MB (${(
            file.size /
            (1024 * 1024)
          ).toFixed(1)} MB uploaded).`,
        },
        { status: 400 }
      );
    }

    // Determine extension
    const fileName = file.name || "document.txt";
    const extensionMatch = fileName.toLowerCase().match(/\.([a-z0-9]+)$/);
    const extRaw = extensionMatch ? extensionMatch[1] : "";

    const allowedExtensions: SupportedFileExtension[] = [
      "pdf",
      "docx",
      "pptx",
      "ppt",
      "txt",
    ];

    if (!allowedExtensions.includes(extRaw as SupportedFileExtension)) {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported format ".${extRaw}". Please upload a PDF, DOCX, PPT/PPTX, or TXT file.`,
        },
        { status: 400 }
      );
    }

    const ext = extRaw as SupportedFileExtension;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { text, wordCount, charCount } = await extractDocumentText(buffer, ext);

    const document: ExtractedDocument = {
      id: `doc_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      name: fileName,
      size: file.size,
      extension: ext,
      uploadedAt: new Date().toISOString(),
      extractedText: text,
      wordCount,
      charCount,
    };

    return NextResponse.json({
      success: true,
      document,
    });
  } catch (error: any) {
    console.error("Error in /api/extract:", error);
    const message =
      error instanceof Error ? error.message : "Failed to extract document text.";
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
