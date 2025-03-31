import { ProjectCard } from "@/components/features/projects/project-card";
import { getCurrentExerciseUrl } from "@/lib/current-exercises-url";
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
  const currentUrl = await getCurrentExerciseUrl();

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Liste des projets</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} currentUrl={currentUrl} />
        ))}

        <Link href={`/exercises/m3-advanced/2.intercepting/code/not-found-id`}>
          Not found
        </Link>
      </div>
    </div>
  );
}
