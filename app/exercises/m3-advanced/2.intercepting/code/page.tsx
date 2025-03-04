import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    include: {
      user: true,
      tasks: true,
    },
  });

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Liste des projets</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Link
            href={`/exercises/m3-advanced/2.intercepting/code/${project.id}`}
            key={project.id}
            className="block group"
          >
            <Card className="group-hover:bg-accent transition">
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Par {project.user.name || project.user.email}
                </span>
                <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {project.tasks.length} tâches
                </span>
              </CardFooter>
            </Card>
          </Link>
        ))}

        <Link href={`/exercises/m3-advanced/2.intercepting/code/not-found-id`}>
          Not found
        </Link>
      </div>
    </div>
  );
}
