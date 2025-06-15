import { supabase } from './supabaseClient';

export interface NewProject {
  userId: string;
  name: string;
  description: string;
  aiTool: string;
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
