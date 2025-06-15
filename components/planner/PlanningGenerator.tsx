import { useState } from 'react'
import { saveProjectArtifacts } from '../../lib/api/saveProjectArtifacts'

interface PlanningGeneratorProps {
  projectId: string
}

export default function PlanningGenerator({ projectId }: PlanningGeneratorProps) {
  const [prd, setPrd] = useState('')
  const [techStack, setTechStack] = useState('')
  const [promptPack, setPromptPack] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSave() {
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
      <button
        onClick={handleSave}
        disabled={saving}
        className="rounded bg-blue-600 text-white px-4 py-2"
      >
        {saving ? 'Saving...' : 'Save'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
