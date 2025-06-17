import { supabase } from './supabaseClient';

export interface NewProject {
  userId: string;
  name: string;
  description: string;
  aiTool: string;
}

export interface Project {
  id: string
  user_id: string
  name: string
  description: string
  ai_tool: string
}

export async function createProject(project: NewProject) {
  const { data, error } = await supabase
    .from('projects')
    .insert({
      user_id: project.userId,
      name: project.name,
      description: project.description,
      ai_tool: project.aiTool,
    })
    .select()
    .single();

  if (error) {
    console.error('createProject error:', error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function getProjectById(id: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('getProjectById error:', error.message)
    throw new Error(error.message)
  }

  return data as Project
}
