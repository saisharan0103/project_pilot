import { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select } from "../ui/select";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { createProject } from "@/lib/api/createProject";

export default function ProjectCreatorForm() {
  const { user } = useUser();
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedTool, setSelectedTool] = useState("Claude");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    try {
      const project = await createProject({
        user_id: user.id,
        name: projectName,
        description: projectDescription,
        ai_tool: selectedTool,
      });
      console.log(project);
      router.push(`/project/${project.id}`);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="projectName">
              Project Name
            </label>
            <Input
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="projectDescription">
              Description
            </label>
            <Textarea
              id="projectDescription"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="aiTool">
              AI Tool
            </label>
            <Select
              id="aiTool"
              value={selectedTool}
              onChange={(e) => setSelectedTool(e.target.value)}
            >
              <option value="Claude">Claude</option>
              <option value="Cursor">Cursor</option>
              <option value="Copilot">Copilot</option>
              <option value="OpenAI">OpenAI</option>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Create Project
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
