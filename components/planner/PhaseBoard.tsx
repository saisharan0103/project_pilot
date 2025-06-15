import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { DocumentTextIcon, CodeIcon, BeakerIcon, RocketIcon } from "../ui/icons";

const phases = [
  {
    id: "planning",
    title: "Planning",
    description:
      "Define requirements and generate PRD, tech stack and prompt pack.",
    icon: DocumentTextIcon,
    status: "Active",
  },
  {
    id: "logic",
    title: "Logic",
    description: "Build core application logic.",
    icon: CodeIcon,
    status: "Locked",
  },
  {
    id: "test",
    title: "Test",
    description: "Write tests and ensure quality.",
    icon: BeakerIcon,
    status: "Locked",
  },
  {
    id: "deploy",
    title: "Deploy",
    description: "Ship the product to users.",
    icon: RocketIcon,
    status: "Locked",
  },
];

export default function PhaseBoard() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {phases.map((phase) => {
        const Icon = phase.icon;
        const isActive = phase.id === "planning";
        return (
          <Card
            key={phase.id}
            className={isActive ? "border-primary" : "opacity-75 cursor-not-allowed"}
          >
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Icon className="h-5 w-5" />
                <CardTitle>{phase.title}</CardTitle>
              </div>
              <Badge
                className={
                  isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-600"
                }
              >
                {phase.status}
              </Badge>
            </CardHeader>
            {isActive && (
              <CardContent>
                <p className="text-sm text-gray-600">{phase.description}</p>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}
