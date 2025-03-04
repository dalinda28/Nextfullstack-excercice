import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ProjectModal(props: {
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
    return notFound();
  }

  return (
    <div>
      <DialogHeader>
        <DialogTitle>{project.name}</DialogTitle>
        <p className="text-muted-foreground">{project.description}</p>
      </DialogHeader>

      <div className="mt-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Détails du projet</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Créé par</p>
              <p>{project.user.name || project.user.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date de création</p>
              <p>{new Date(project.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">
            Tâches ({project.tasks.length})
          </h2>
          {project.tasks.length === 0 ? (
            <p className="text-muted-foreground">Aucune tâche pour ce projet</p>
          ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {project.tasks.map((task) => (
                <Card key={task.id} className="overflow-hidden">
                  <CardHeader className="p-3 pb-1">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">{task.title}</CardTitle>
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
                  <CardContent className="p-3 pt-0">
                    <p className="text-muted-foreground">{task.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
