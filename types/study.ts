export type DifficultyLevel = "Easy" | "Medium" | "Hard";

export type ResourceType =
  | "summary"
  | "quiz"
  | "flashcards"
  | "mcqs"
  | "interview"
  | "concept_explainer"
  | "study_plan";

// 1. Summary Output
export interface SummaryOutput {
  title: string;
  executiveOverview: string;
  keyThemes: {
    heading: string;
    description: string;
  }[];
  essentialTerminology: {
    term: string;
    definition: string;
  }[];
  takeaways: string[];
}

// 2. Quiz Output (Short Answer / Open Ended self-testing)
export interface QuizQuestion {
  id: string;
  question: string;
  hint?: string;
  idealAnswer: string;
  keyPointsToInclude: string[];
}

export interface QuizOutput {
  title: string;
  difficulty: DifficultyLevel;
  questions: QuizQuestion[];
}

// 3. Flashcards Output
export interface FlashcardItem {
  id: string;
  front: string;
  back: string;
  category?: string;
}

export interface FlashcardsOutput {
  title: string;
  difficulty: DifficultyLevel;
  cards: FlashcardItem[];
}

// 4. Multiple Choice Questions Output
export interface McqOption {
  label: "A" | "B" | "C" | "D";
  text: string;
}

export interface McqQuestion {
  id: string;
  question: string;
  options: McqOption[];
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
}

export interface McqOutput {
  title: string;
  difficulty: DifficultyLevel;
  questions: McqQuestion[];
}

// 5. Interview Questions Output
export interface InterviewQuestion {
  id: string;
  category: string;
  question: string;
  interviewerIntent: string;
  exemplaryResponse: string;
}

export interface InterviewOutput {
  title: string;
  difficulty: DifficultyLevel;
  questions: InterviewQuestion[];
}

// 6. Explanation of Difficult Concepts Output
export interface ConceptExplanationItem {
  id: string;
  conceptName: string;
  academicDefinition: string;
  intuitiveAnalogy: string;
  stepByStepBreakdown: string[];
  commonMisconceptions: string;
}

export interface ConceptExplainerOutput {
  title: string;
  difficulty: DifficultyLevel;
  concepts: ConceptExplanationItem[];
}

// 7. Study Plan Output
export interface StudyPlanDay {
  dayNumber: number;
  focusArea: string;
  objectives: string[];
  suggestedActivities: string[];
  timeAllocationMinutes: number;
}

export interface StudyPlanOutput {
  title: string;
  difficulty: DifficultyLevel;
  overview: string;
  totalDays: number;
  dailyPlan: StudyPlanDay[];
  reviewChecklist: string[];
}

export type GeneratedContent =
  | SummaryOutput
  | QuizOutput
  | FlashcardsOutput
  | McqOutput
  | InterviewOutput
  | ConceptExplainerOutput
  | StudyPlanOutput
  | any;

export interface StoredResource {
  id: string;
  documentId: string;
  type: ResourceType;
  difficulty: DifficultyLevel;
  createdAt: string;
  content: GeneratedContent;
}
