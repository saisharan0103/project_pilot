import { supabase } from '../supabaseClient'

type ProjectData = {
  user_id: string
  name: string
  description: string
  ai_tool: string
}

export async function createProject(data: ProjectData) {
  const { data: project, error } = await supabase
    .from('projects')
    .insert([data])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return project
}
