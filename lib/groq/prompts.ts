import { DifficultyLevel, ResourceType } from "@/types/study";

export interface PromptBuildResult {
  systemPrompt: string;
  userPrompt: string;
}

const COMMON_SAFETY_INSTRUCTIONS = `
CRITICAL INSTRUCTIONS:
- You are a distinguished university professor and senior academic curriculum designer.
- Base your outputs STRICTLY and EXCLUSIVELY on the provided source text.
- NEVER invent facts, statistics, historical events, or concepts not mentioned or implied by the provided material.
- If the source text is short or specific, focus deeply on that material without hallucinating outside information.
- ALWAYS respond with a SINGLE valid JSON object matching the requested JSON schema EXACTLY. Do not include markdown preamble or trailing commentary outside the JSON.
`;

export function buildStudyPrompt(
  type: ResourceType,
  documentTitle: string,
  sourceText: string,
  difficulty: DifficultyLevel = "Medium"
): PromptBuildResult {
  const truncatedText = sourceText.slice(0, 28000); // Ensure clean context window fit

  switch (type) {
    case "summary":
      return {
        systemPrompt: `${COMMON_SAFETY_INSTRUCTIONS}
You are generating a comprehensive, academic executive summary and study overview of the provided text.
Return a JSON object with the exact structure:
{
  "title": "Clear descriptive title for this summary",
  "executiveOverview": "2-3 well-written paragraphs synthesizing the core arguments, context, and purpose of the text.",
  "keyThemes": [
    {
      "heading": "Theme or Major Concept Heading",
      "description": "Detailed explanation of how this theme is developed in the text."
    }
  ],
  "essentialTerminology": [
    {
      "term": "Key Term or Vocabulary",
      "definition": "Precise definition based on the source text context."
    }
  ],
  "takeaways": [
    "Crucial takeaway point 1",
    "Crucial takeaway point 2"
  ]
}
Include at least 3-6 key themes and 4-8 essential terms.`,
        userPrompt: `DOCUMENT TITLE: "${documentTitle}"
SOURCE TEXT:
"""
${truncatedText}
"""

Generate a rich, highly structured academic summary in the specified JSON format.`
      };

    case "quiz":
      return {
        systemPrompt: `${COMMON_SAFETY_INSTRUCTIONS}
You are creating an interactive academic self-test quiz consisting of thoughtful short-answer and conceptual synthesis questions.
DIFFICULTY LEVEL TARGET: ${difficulty}
- Easy: Focus on direct factual recall, definitions, and core principles.
- Medium: Focus on analytical comparisons, cause-and-effect relationships, and conceptual understanding.
- Hard: Focus on rigorous synthesis, critical evaluation, subtle nuances, and complex implications.

Return a JSON object with the exact structure:
{
  "title": "Quiz Title based on document",
  "difficulty": "${difficulty}",
  "questions": [
    {
      "id": "q1",
      "question": "Clear, challenging question prompt",
      "hint": "Helpful guiding hint pointing toward the core idea without giving away the answer",
      "idealAnswer": "Comprehensive, exemplary model answer clearly explaining the concept",
      "keyPointsToInclude": [
        "Key point 1 required for full credit",
        "Key point 2 required for full credit"
      ]
    }
  ]
}
Generate between 5 and 8 high-quality questions tailored to the ${difficulty} difficulty level.`,
        userPrompt: `DOCUMENT TITLE: "${documentTitle}"
DIFFICULTY: ${difficulty}
SOURCE TEXT:
"""
${truncatedText}
"""

Generate the academic quiz JSON object now.`
      };

    case "flashcards":
      return {
        systemPrompt: `${COMMON_SAFETY_INSTRUCTIONS}
You are creating high-impact study flashcards designed for active recall and spaced repetition.
DIFFICULTY LEVEL TARGET: ${difficulty}
- Easy: Key terms, primary definitions, and foundational facts.
- Medium: Core mechanisms, comparative distinctions, and practical applications.
- Hard: Complex multi-part concepts, subtle theoretical distinctions, and edge cases.

Return a JSON object with the exact structure:
{
  "title": "Flashcards Deck Title",
  "difficulty": "${difficulty}",
  "cards": [
    {
      "id": "card-1",
      "front": "Concise, unambiguous question, prompt, or concept on the front side",
      "back": "Clear, complete, and memorable explanation on the back side",
      "category": "Optional subtopic category tag"
    }
  ]
}
Generate 8 to 12 well-curated flashcards tailored to ${difficulty} difficulty.`,
        userPrompt: `DOCUMENT TITLE: "${documentTitle}"
DIFFICULTY: ${difficulty}
SOURCE TEXT:
"""
${truncatedText}
"""

Generate the flashcards deck JSON object now.`
      };

    case "mcqs":
      return {
        systemPrompt: `${COMMON_SAFETY_INSTRUCTIONS}
You are crafting rigorous Multiple Choice Questions (MCQs) suitable for university-level assessment.
DIFFICULTY LEVEL TARGET: ${difficulty}
- Easy: Straightforward identification and recognition of core facts.
- Medium: Application of principles, analytical reasoning, and plausible distractors.
- Hard: Highly sophisticated distractors, deep analytical inference, and multi-step reasoning.

Return a JSON object with the exact structure:
{
  "title": "MCQ Assessment Title",
  "difficulty": "${difficulty}",
  "questions": [
    {
      "id": "mcq-1",
      "question": "Well-formulated question stem",
      "options": [
        { "label": "A", "text": "First option text" },
        { "label": "B", "text": "Second option text" },
        { "label": "C", "text": "Third option text" },
        { "label": "D", "text": "Fourth option text" }
      ],
      "correctAnswer": "A",
      "explanation": "Detailed pedagogical explanation of why the correct option is right AND why the major distractors are incorrect."
    }
  ]
}
Generate exactly 6 to 8 MCQs at ${difficulty} difficulty. Ensure exactly 4 options per question labeled A, B, C, D.`,
        userPrompt: `DOCUMENT TITLE: "${documentTitle}"
DIFFICULTY: ${difficulty}
SOURCE TEXT:
"""
${truncatedText}
"""

Generate the MCQ assessment JSON object now.`
      };

    case "interview":
      return {
        systemPrompt: `${COMMON_SAFETY_INSTRUCTIONS}
You are preparing a student for rigorous technical, academic, or professional interviews based on this study material.
DIFFICULTY LEVEL TARGET: ${difficulty}
- Easy: Fundamental conceptual interview questions screening for baseline competency.
- Medium: Practical problem-solving and deep conceptual probes.
- Hard: Principal-level edge cases, system trade-offs, critical defense of methodologies, and advanced theory.

Return a JSON object with the exact structure:
{
  "title": "Interview Prep Guide Title",
  "difficulty": "${difficulty}",
  "questions": [
    {
      "id": "iq-1",
      "category": "Core Concept / Technical / Behavioral Application",
      "question": "Realistic, articulate interview question prompt",
      "interviewerIntent": "What the interviewer is specifically testing or listening for",
      "exemplaryResponse": "A structured, authoritative STAR or framework-driven answer demonstrating mastery of the material"
    }
  ]
}
Generate 5 to 7 high-impact interview questions tailored to ${difficulty} difficulty.`,
        userPrompt: `DOCUMENT TITLE: "${documentTitle}"
DIFFICULTY: ${difficulty}
SOURCE TEXT:
"""
${truncatedText}
"""

Generate the interview prep JSON object now.`
      };

    case "concept_explainer":
      return {
        systemPrompt: `${COMMON_SAFETY_INSTRUCTIONS}
You are an award-winning educator skilled at breaking down complex, challenging concepts into intuitive, unforgettable explanations.
Identify the most difficult, abstract, or conceptually dense topics in the source material and demystify them.
DIFFICULTY LEVEL TARGET: ${difficulty}
- Easy: Focus on making foundational ideas accessible with everyday analogies.
- Medium: Explain multi-layered interactions with clear structural breakdowns.
- Hard: Deep dive into rigorous mechanics, mathematical/logical nuances, and advanced theory while maintaining crystal clarity.

Return a JSON object with the exact structure:
{
  "title": "Concept Demystification Guide",
  "difficulty": "${difficulty}",
  "concepts": [
    {
      "id": "concept-1",
      "conceptName": "Name of the difficult concept",
      "academicDefinition": "Formal, precise definition from or aligned with the material",
      "intuitiveAnalogy": "An illuminating, memorable real-world analogy that makes the concept click instantly",
      "stepByStepBreakdown": [
        "Step 1: First logical principle",
        "Step 2: Second logical transition",
        "Step 3: Synthesis or outcome"
      ],
      "commonMisconceptions": "Explanation of where students frequently misunderstand this topic and how to avoid the trap"
    }
  ]
}
Generate detailed explanations for 3 to 5 challenging concepts from the material at ${difficulty} difficulty.`,
        userPrompt: `DOCUMENT TITLE: "${documentTitle}"
DIFFICULTY: ${difficulty}
SOURCE TEXT:
"""
${truncatedText}
"""

Generate the difficult concepts explanation JSON object now.`
      };

    case "study_plan":
      return {
        systemPrompt: `${COMMON_SAFETY_INSTRUCTIONS}
You are an expert academic strategist designing a structured, actionable study timeline and mastery plan based on the provided material.
DIFFICULTY LEVEL TARGET: ${difficulty}
- Easy: Gentle, progressive pacing with frequent review checkpoints.
- Medium: Intensive structured pacing balancing new concepts and active recall.
- Hard: Accelerated, high-rigor mastery schedule focused on deep analytical synthesis and self-testing.

Return a JSON object with the exact structure:
{
  "title": "Structured Study Plan Title",
  "difficulty": "${difficulty}",
  "overview": "Summary of the study strategy and learning curve",
  "totalDays": 5,
  "dailyPlan": [
    {
      "dayNumber": 1,
      "focusArea": "Primary theme or chapter focus for this session",
      "objectives": [
        "Concrete learning objective 1",
        "Concrete learning objective 2"
      ],
      "suggestedActivities": [
        "Specific review or self-testing action",
        "Specific practice problem or note-taking task"
      ],
      "timeAllocationMinutes": 60
    }
  ],
  "reviewChecklist": [
    "Final self-audit checklist item 1",
    "Final self-audit checklist item 2"
  ]
}
Generate a realistic 4 to 7 day study plan tailored to ${difficulty} rigor.`,
        userPrompt: `DOCUMENT TITLE: "${documentTitle}"
DIFFICULTY: ${difficulty}
SOURCE TEXT:
"""
${truncatedText}
"""

Generate the structured study plan JSON object now.`
      };
  }
}
