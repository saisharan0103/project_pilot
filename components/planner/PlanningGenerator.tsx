import { useEffect, useState } from "react";
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

async function generateContent(prompt: string) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || "";
}

export default function PlanningGenerator({ project }: { project: Project }) {
  const [prd, setPrd] = useState("");
  const [techStack, setTechStack] = useState("");
  const [promptPack, setPromptPack] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function generate() {
      if (!project) return;
      setLoading(true);
      try {
        const base = `Project Name: ${project.name}\nDescription: ${project.description}`;
        setPrd(
          await generateContent(
            `${base}\nGenerate a short Product Requirements Document.`
          )
        );
        setTechStack(
          await generateContent(
            `${base}\nRecommend a concise tech stack for this project.`
          )
        );
        setPromptPack(
          await generateContent(
            `${base}\nCreate a prompt pack for the ${project.ai_tool} AI tool.`
          )
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    generate();
  }, [project]);

  function handleSave(section: "prd" | "stack" | "prompts") {
    // TODO: connect to Supabase
    console.log("save", section);
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
          <Button onClick={() => handleSave("prd")}>Save Changes</Button>
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
          <Button onClick={() => handleSave("stack")}>Save Changes</Button>
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
          <Button onClick={() => handleSave("prompts")}>Save Changes</Button>
        </CardFooter>
      </Card>

      <div className="text-right">
        <Button>Download ZIP</Button>
      </div>
    </div>
  );
}
