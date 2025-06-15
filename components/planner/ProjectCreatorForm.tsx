import React, { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select } from "../ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { createProject } from "../../lib/projects";

export function ProjectCreatorForm() {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [aiTool, setAiTool] = useState("Claude");
  const { user } = useUser();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    try {
      const project = await createProject({
        userId: user.id,
        name: projectName,
        description: projectDescription,
        aiTool,
      });

      if (project && project.id) {
        router.push(`/projects/${project.id}`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Start a New Project</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="projectName" className="mb-2 block text-sm font-medium">
                Project Name
              </label>
              <Input
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="projectDescription" className="mb-2 block text-sm font-medium">
                Project Description
              </label>
              <Textarea
                id="projectDescription"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="aiTool" className="mb-2 block text-sm font-medium">
                AI Tool
              </label>
              <Select id="aiTool" value={aiTool} onChange={(e) => setAiTool(e.target.value)}>
                <option value="Claude">Claude</option>
                <option value="Copilot">Copilot</option>
                <option value="Cursor">Cursor</option>
                <option value="OpenAI">OpenAI</option>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Create
          </button>
        </CardFooter>
      </form>
    </Card>
  );
}
