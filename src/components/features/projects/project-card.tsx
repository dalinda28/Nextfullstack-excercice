import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  currentUrl: string;
}

export function ProjectCard({
  id,
  name,
  description,
  currentUrl,
}: ProjectCardProps) {
  return (
    <Link href={`${currentUrl}/projects/${id}`} className="flex-1">
      <Card className="border-l-4 border-l-muted rounded-l-none hover:bg-muted/50 transition-colors">
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
