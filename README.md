# Scholaria — AI-Powered Academic Study Assistant 🎓

Scholaria is a production-grade educational web application built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and the **Groq Cloud API (`llama-3.3-70b-versatile`)**.

It transforms academic documents (**PDFs, Word `.docx`, PowerPoint `.pptx`, and `.txt`**) into interactive study suites in seconds.

---

## ✨ Features

- 📑 **Multi-Format Extraction & Study Bundles**: Upload single files or combine multiple documents into a unified Study Pack (`pdf-parse`, `mammoth`, `officeparser`).
- ⚡ **7 Interactive Learning Tools**:
  1. Executive Summaries (Key themes & terminology definitions)
  2. 3D Active-Recall Flashcards
  3. Graded Multiple Choice Questions (MCQs) with pedagogical explanations
  4. Concept Demystification Guide (Everyday analogies)
  5. STAR-Method Interview & Viva Prep
  6. Multi-Day Actionable Study Plans
- 🎚️ **Dynamic Rigor Control**: Adjust between **Easy, Medium, and Hard** academic difficulty on the fly.

---

## 🚀 Getting Started Locally

### 1. Clone the repository & install dependencies
```bash
git clone https://github.com/debayanmanna136-netizen/ai_learning_assistant.git
cd ai_learning_assistant
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` and insert your free Groq API key:
```bash
cp .env.example .env.local
```

Inside `.env.local`:
```env
GROQ_API_KEY=gsk_your_groq_api_key_here
```
*(Get a free API key at [https://console.groq.com/keys](https://console.groq.com/keys))*

### 3. Start the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience Scholaria!

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + Framer Motion + Lucide Icons
- **AI Inference**: Groq API (`llama-3.3-70b-versatile`) with structured JSON mode (`response_format: { type: "json_object" }`)
- **Document Parsers**: `pdf-parse`, `mammoth`, `officeparser`

## 📄 License
MIT
