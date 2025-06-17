import { useEffect, useState } from "react";
import { getProjectById } from "@/lib/projects";
import { saveProjectArtifacts } from "@/lib/api/saveProjectArtifacts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";

type Project = {
  name: string;
  description: string;
  ai_tool: string;
};

async function generatePlanning(project: Project) {
  const res = await fetch("/api/generate-planning", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      projectName: project.name,
      projectDescription: project.description,
      aiTool: project.ai_tool,
    }),
  });
  if (!res.ok) {
    throw new Error("Failed to generate planning");
  }
  return (await res.json()) as {
    prd?: string;
    techStack?: string;
    promptPack?: string;
    text?: string;
  };
}

export default function PlanningGenerator({
  projectId,
}: {
  projectId: string;
}) {
  const [project, setProject] = useState<Project | null>(null);
  const [prd, setPrd] = useState("");
  const [techStack, setTechStack] = useState("");
  const [promptPack, setPromptPack] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      if (!projectId) return;
      try {
        const data = await getProjectById(projectId);
        setProject(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProject();
  }, [projectId]);

  useEffect(() => {
    async function generate() {
      if (!project) return;
      setLoading(true);
      try {
        const data = await generatePlanning(project);
        setPrd(data.prd || data.text || "");
        setTechStack(data.techStack || "");
        setPromptPack(data.promptPack || "");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    generate();
  }, [project]);

  function handleSave() {
    saveProjectArtifacts({
      projectId,
      prd,
      techStack,
      promptPack,
    }).catch((err) => console.error(err));
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Product Requirements Document</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-32 w-full" />
          ) : (
            <Textarea
              value={prd}
              onChange={(e) => setPrd(e.target.value)}
              className="min-h-[160px]"
            />
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tech Stack</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Input
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
            />
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prompt Pack</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-28 w-full" />
          ) : (
            <Textarea
              value={promptPack}
              onChange={(e) => setPromptPack(e.target.value)}
              className="min-h-[140px]"
            />
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>

      <div className="text-right">
        <Button>Download ZIP</Button>
      </div>
    </div>
  );
}
