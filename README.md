# 🚀 Project Pilot

![Project Pilot Logo](public/next.svg)

Project Pilot is an AI‑native platform that helps developers build software **one phase at a time**. It provides planning tools, generates documentation and offers prompt packs tuned for AI coding assistants like ChatGPT Codex, Claude and Cursor.

Two key documents define the vision and minimum viable product:

- [ProjectPilot Codex Project Description](docs/ProjectPilot_Codex_ProjectDescription.md) – high level overview and philosophy
- [ProjectPilot MVP PRD](docs/ProjectPilot_Mvp_Prd.md) – requirements for the v0.1 MVP release

These docs shape development by clarifying the product vision and feature set.

## Features

- Phase‑based workflow: Planning → Logic → Testing → Deployment
- AI‑generated PRDs and prompt packs
- Built with Next.js and Supabase

## Getting Started

1. Clone this repository.
2. Install dependencies with `npm install`.
3. Create a `.env.local` file (see below) and fill in your keys.
4. Start the development server: `npm run dev`.

## Prerequisites

This project is expected to run on a Next.js + Supabase stack. To work with the code you should have:

- Node.js 18 or later
- pnpm or npm for installing dependencies
- Access to a Supabase project
- API keys for any integrated AI services (configured via environment variables in a `.env.local` file)
- A Clerk account and API keys for authentication


Create a `.env.local` file in the project root and add the following variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>

# API keys for AI providers
OPENAI_API_KEY=<your-openai-api-key>
ANTHROPIC_API_KEY=<your-anthropic-api-key>
# API key for your preferred AI service (used server-side only)
AI_API_KEY=<your-ai-api-key>
# Clerk authentication keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
CLERK_SECRET_KEY=<your-clerk-secret-key>
```

## Development

Install dependencies and start the local server:

```bash
npm install
npm run dev
```

The application uses the Next.js `pages/` directory. Reusable UI components live in `components/` and helper functions are in `lib/`.


## Using npm scripts

Before running `npm run dev`, `npm run lint`, or invoking the TypeScript compiler with `npx tsc`, make sure you have installed all project dependencies:

```bash
npm install
```

This step sets up the `node_modules` directory and ensures the development server, linters and TypeScript all function correctly.

## Project Structure

- `pages/` – Next.js pages
- `components/` – UI components
- `lib/` – API and utility functions
- `tests/` – Jest test suite

## Testing

Automated tests are not included yet. Once a Jest configuration is added, you will be able to run the suite with:

```bash
npm test
```
