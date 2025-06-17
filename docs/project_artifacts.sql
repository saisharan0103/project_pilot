-- SQL schema for project_artifacts table
-- This table stores generated planning artifacts for each project.
-- One row per project is maintained via a unique project_id.

CREATE TABLE IF NOT EXISTS project_artifacts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  prd text,
  tech_stack text,
  prompt_pack text,
  inserted_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT project_artifacts_project_id_key UNIQUE (project_id)
);
