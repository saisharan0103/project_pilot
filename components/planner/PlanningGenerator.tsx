import { useEffect, useState } from 'react'
import { saveProjectArtifacts } from '../../lib/api/saveProjectArtifacts'
import { getProjectById, Project } from '../../lib/projects'

interface PlanningGeneratorProps {
  projectId?: string
}

export default function PlanningGenerator({ projectId }: PlanningGeneratorProps) {
  const [prd, setPrd] = useState('')
  const [techStack, setTechStack] = useState('')
  const [promptPack, setPromptPack] = useState('')
  const [saving, setSaving] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    if (!projectId) return
    ;(async () => {
      try {
        const p = await getProjectById(projectId)
        setProject(p)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [projectId])

  async function handleSave() {
    if (!projectId) return
    setSaving(true)
    setError(null)
    try {
      // Save project artifacts to Supabase
      await saveProjectArtifacts({
        projectId,
        prd,
        techStack,
        promptPack,
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleGenerate() {
    if (!project) return
    setGenerating(true)
    setError(null)
    try {
      const response = await fetch('/api/generate-planning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: project.name,
          projectDescription: project.description,
          aiTool: project.ai_tool,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate')
      }

      setPrd(data.prd || data.text || '')
      setTechStack(data.techStack || '')
      setPromptPack(data.promptPack || '')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      <textarea
        value={prd}
        onChange={(e) => setPrd(e.target.value)}
        placeholder="PRD"
        className="w-full border rounded p-2"
      />
      <textarea
        value={techStack}
        onChange={(e) => setTechStack(e.target.value)}
        placeholder="Tech Stack"
        className="w-full border rounded p-2"
      />
      <textarea
        value={promptPack}
        onChange={(e) => setPromptPack(e.target.value)}
        placeholder="Prompt Pack"
        className="w-full border rounded p-2"
      />
      {project && (
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="rounded bg-green-600 text-white px-4 py-2"
        >
          {generating ? 'Generating...' : 'Generate with AI'}
        </button>
      )}
      <button
        onClick={handleSave}
        disabled={saving || !projectId}
        className="rounded bg-blue-600 text-white px-4 py-2"
      >
        {saving ? 'Saving...' : 'Save'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
