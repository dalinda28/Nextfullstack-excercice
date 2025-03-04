import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function ProjectDetailPage(props: {
  params: Promise<{ projectId: string }>;
}) {
  const params = await props.params;
  const project = await prisma.project.findUnique({
    where: {
      id: params.projectId,
    },
    include: {
      user: true,
      tasks: true,
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link
          href="/exercises/m3-advanced/2.intercepting/code"
          className={buttonVariants({ variant: "outline" })}
        >
          ← Retour aux projets
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Détails du projet</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Créé par</p>
                <p>{project.user.name || project.user.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Date de création
                </p>
                <p>{new Date(project.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">
              Tâches ({project.tasks.length})
            </h2>
            {project.tasks.length === 0 ? (
              <p className="text-muted-foreground">
                Aucune tâche pour ce projet
              </p>
            ) : (
              <div className="space-y-4">
                {project.tasks.map((task) => (
                  <Card key={task.id} className="overflow-hidden">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">
                          {task.title}
                        </CardTitle>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            task.status === "COMPLETED"
                              ? "bg-green-100 text-green-800"
                              : task.status === "IN_PROGRESS"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-muted-foreground">
                        {task.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
