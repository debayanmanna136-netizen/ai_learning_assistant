export type SupportedFileExtension = "pdf" | "docx" | "pptx" | "ppt" | "txt";

export interface DocumentMetadata {
  id: string;
  name: string;
  size: number;
  extension: SupportedFileExtension;
  uploadedAt: string;
}

export interface ExtractedDocument extends DocumentMetadata {
  extractedText: string;
  wordCount: number;
  charCount: number;
  filesCount?: number;
  fileNames?: string[];
}

export interface ExtractionResponse {
  success: boolean;
  document?: ExtractedDocument;
  error?: string;
}
