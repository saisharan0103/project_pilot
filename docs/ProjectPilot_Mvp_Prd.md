# 🛠️ Product Requirement Document (PRD) — Project Pilot MVP v0.1

---

## 🔥 Product Name
 
**Project Pilot — MVP v0.1**

---

## 🔄 Version

**0.1 (MVP Build)**

---

## 🌟 Status

**In Progress — Targeting Internal Launch in 2 Weeks**

---

## ⚖️ Owner

**Sai Sharan (Product + Engineering Lead)**

---

## 💡 Product Vision

Empower AI developers to build complete software projects phase-by-phase using structured documentation, scoped prompt packs, and guided checkpoints — eliminating chaos, hallucination, and context overload.

**Project Pilot is not a PDF factory.**  
It's a launch cockpit for AI-native development, offering phased blueprints, build guidance, and prompt generation for tools like Cursor, Claude, and Copilot.

---

## 🎯 Goals (MVP)

- Allow users to define a software project.
- Generate Phase 1 deliverables:
  - PRD
  - Tech Stack suggestion
  - Prompt Pack tailored to AI tool
- Allow users to mark phase complete and export outputs.
- Validate phase-by-phase approach with early adopters.

---

## 💮 Key Features (MVP Scope)

### 1. User Authentication

- Clerk Auth (Google Sign-in)
- User dashboard to manage multiple projects

### 2. Project Creator

- **Input**: Name, Description, AI Tool selection
- Store project metadata in **Supabase**

### 3. Phase 1 Generator

- AI-generated **PRD**
- AI-suggested **Tech Stack** (based on idea + tool)
- **Prompt Pack** (for Claude, Cursor, or OpenAI)
- All fields **editable inline** before export

### 4. Export Docs

- Export all artifacts as **ZIP**:
  - `README.md`
  - `PRD.md`
  - `prompts.txt`
  - `project.json` (future use)

### 5. Phase Tracker UI

- View: **Planning → Logic → Test → Deploy**
- For MVP: only **Planning** is active; others are placeholders

---

## 🧠 Stack

- **Frontend**: Next.js, Tailwind, TypeScript, shadcn/ui  
- **Backend**: Supabase (DB) + Edge Functions  
- **AI**: OpenAI GPT-4 / Gemini 1.5 for generation  
- **Auth**: Clerk  
- **Deploy**: Vercel  

---

## 🧼 Out of Scope (MVP)

- GitHub integration  
- Linear export  
- Phase gating logic/testing automation  
- Live IDE sync  
- One-click deployment  
- **Codie** full assistant mode (v0 will use static prompt packs)  

---

## ✨ Success Criteria

A user can:

- Create a new project  
- Receive a usable PRD, prompt pack, and stack rec  
- Export the above as ZIP  
- Understand the phased roadmap UI  
