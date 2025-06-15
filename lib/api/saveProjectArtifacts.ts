import { supabase } from '../supabaseClient'

export interface SaveProjectArtifactsPayload {
  projectId: string
  prd: string
  techStack: string
  promptPack: string
}

export async function saveProjectArtifacts({
  projectId,
  prd,
  techStack,
  promptPack,
}: SaveProjectArtifactsPayload) {
  const { data, error } = await supabase
    .from('project_artifacts')
    .upsert(
      { project_id: projectId, prd, tech_stack: techStack, prompt_pack: promptPack },
      { onConflict: 'project_id' },
    )
    .select()
    .single()

  if (error) {
    console.error('saveProjectArtifacts error:', error.message)
    throw new Error(error.message)
  }

  return data
}
