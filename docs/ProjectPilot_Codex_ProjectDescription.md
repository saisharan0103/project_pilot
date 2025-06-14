# 🧠 Project Pilot: Codex Contextual Project Description

---

## 🧠 Project Summary

**Project Pilot** is a modular, AI-native product development platform built specifically for developers using tools like **ChatGPT Codex, Claude, Cursor, and GitHub Copilot**. It empowers users to build entire software projects **phase-by-phase** instead of attempting to generate full applications in a single prompt or session.

The system is engineered around a **"brick-by-brick" methodology** — breaking product development into clear, scoped phases (**Planning, Core Logic, Testing, Deployment**) to reduce hallucination, optimize token usage, and give developers better control over build quality.

---

## 💡 Core Philosophy

AI is most accurate and useful when operating within **tight scopes**.  
**Project Pilot** lets developers construct apps incrementally with scoped documentation, focused prompt packs, and guided checkpoints.

---

## 🧱 MVP Focus

The **MVP (v0.1)** is designed to validate the **Planning Phase**, which includes:

- Project metadata collection (Name, Description, Target AI Tool)
- AI-generated **PRD** (Product Requirements Document)
- Recommended **tech stack** (based on idea and tool)
- AI-optimized **prompt packs** (for Codex, Cursor, Claude, Copilot)
- **Export functionality** for all generated files:
  - `PRD.md`
  - `README.md`
  - `prompts.txt`

---

## ⚙️ Key Components

- **Phase-by-phase UI flow**: Project Tracker showing  
  `Planning → Core → Test → Deploy`

- **Codie v0.1**: Basic AI guidance that outputs scoped prompt packs

- **Project Generator**: Wizard-like input flow for defining project idea and tool

- **Download System**: Bundle all artifacts into a ZIP with properly formatted markdown and `.txt` files

---

## 🧑‍💻 Codex Usage Strategy

- Use this description as **top-level prompt context** for all generation tasks
- Inject only relevant **Phase + Prompt Pack** content below this in runtime
- Separate **Codex prompt pipelines** per phase (each using this file as base)

---

## 🔥 Positioning

> “Don’t drop the whole house on the AI. Lay one brick at a time.  
> **Project Pilot** is your cockpit for phased, AI-native builds.”
