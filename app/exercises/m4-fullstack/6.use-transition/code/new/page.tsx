import { CreateProjectForm } from "@/components/features/projects/create-project-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProjectsPage() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>New</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <CreateProjectForm />
        </CardContent>
      </Card>
    </div>
  );
}
