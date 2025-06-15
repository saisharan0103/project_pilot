# Project Pilot

Project Pilot is an AI-native platform that helps developers build software incrementally. It guides users through a phase-by-phase workflow—Planning, Core Logic, Testing and Deployment—while generating documentation and prompt packs tuned for tools like ChatGPT Codex, Claude and Cursor.

The repository includes two key documents that describe the vision and minimal viable product (MVP):

- [`docs/ProjectPilot_Codex_ProjectDescription.md`](docs/ProjectPilot_Codex_ProjectDescription.md) – High level overview and philosophy of Project Pilot.
- [`docs/ProjectPilot_Mvp_Prd.md`](docs/ProjectPilot_Mvp_Prd.md) – Product requirements for the v0.1 MVP release.

These documents shape development by framing the product vision and clarifying the MVP feature set.

## Prerequisites

This project is expected to run on a Next.js + Supabase stack. To work with the code you should have:

- Node.js 18 or later
- pnpm or npm for installing dependencies
- Access to a Supabase project
- API keys for any integrated AI services (provided via environment variables)

After cloning, install dependencies and set up your environment variables in a local `.env` file before running the development server. See `.env.example` for the required variable names.

## Environment Variables

Create a `.env` file in the project root with the following variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
# API key for your preferred AI service (used server-side only)
AI_API_KEY=<your-ai-api-key>
```

## Development

Install dependencies and start the local server:

```bash
npm install
npm run dev
```

The application uses the Next.js `pages/` directory. Reusable UI components live in `components/` and helper functions are in `lib/`.

