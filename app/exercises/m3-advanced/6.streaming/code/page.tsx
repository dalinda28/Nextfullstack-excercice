import { CreateProjectForm } from "@/components/features/projects/create-project-form";
import { ProjectCard } from "@/components/features/projects/project-card";
import { LoadingButton } from "@/components/form/loading-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRequiredUser } from "@/lib/auth-session";
import { getCurrentExerciseUrl } from "@/lib/current-exercises-url";
import { prisma } from "@/lib/prisma";
import { format, isSameDay, startOfDay, subDays } from "date-fns";
import { AlertCircle, ClipboardList } from "lucide-react";
import { revalidatePath } from "next/cache";
import { ProjectChartCard } from "./project-chart-card";
import { ProjectWithDate } from "./types";

function getDaysLabels(numberOfDays: number): string[] {
  const days = [];
  const today = new Date();

  for (let i = numberOfDays - 1; i >= 0; i--) {
    const date = subDays(today, i);
    days.push(format(date, "dd MMM"));
  }

  return days;
}

function getProjectDataByDay(
  projects: { createdAt: Date }[],
  numberOfDays: number
): ProjectWithDate[] {
  const days = getDaysLabels(numberOfDays);
  const today = new Date();

  const dailyData = days.map((day, index) => {
    const date = subDays(today, numberOfDays - 1 - index);
    const startDay = startOfDay(date);

    const projectsInDay = projects.filter((project) =>
      isSameDay(project.createdAt, startDay)
    );

    return {
      day,
      count: projectsInDay.length,
    };
  });

  return dailyData;
}

function calculateTrendPercentage(data: ProjectWithDate[]): number {
  if (data.length < 2) return 0;

  // Compare last 5 days with previous 5 days
  const recentDays = data.slice(-5);
  const previousDays = data.slice(-10, -5);

  const recentSum = recentDays.reduce((sum, day) => sum + day.count, 0);
  const previousSum = previousDays.reduce((sum, day) => sum + day.count, 0);

  if (previousSum === 0) return recentSum > 0 ? 100 : 0;

  const percentage = ((recentSum - previousSum) / previousSum) * 100;
  return Math.round(percentage);
}

async function getProjectData(userId: string, numberOfDays: number) {
  // ℹ️ Cette méthode peut prendre beaucoup de temps à charger.
  // 🦁 Créons un nouveau composant qui s'occupe d'afficher et de récupérer les données qu'on va pouvoir <Suspense />

  // Simulation d'une application de production qui a besoin de temps pour charger les données.
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const allProjects = await prisma.project.findMany({
    where: {
      userId: userId,
      createdAt: {
        gte: subDays(new Date(), numberOfDays),
      },
    },
  });

  const projectData = getProjectDataByDay(allProjects, numberOfDays);
  const trendPercentage = calculateTrendPercentage(projectData);

  const today = new Date();
  const startDate = subDays(today, numberOfDays - 1);
  const dateRange = {
    start: startOfDay(startDate),
    end: today,
  };

  return {
    projectData,
    trendPercentage,
    dateRange,
  };
}

export default async function ProjectsPage() {
  const user = await getRequiredUser();

  const currentUrl = await getCurrentExerciseUrl();

  const projects = await prisma.project.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  const { projectData, trendPercentage, dateRange } = await getProjectData(
    user.id,
    10
  );

  return (
    <div className="space-y-6">
      <ProjectChartCard
        projectData={projectData}
        trendPercentage={trendPercentage}
        dateRange={dateRange}
      />

      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            <CardTitle>My Projects </CardTitle>
          </div>
          <CardDescription>Manage your projects and tasks</CardDescription>
        </CardHeader>
        <CardContent>
          {projects.length > 0 ? (
            <div className="grid gap-4">
              {projects.map((project) => (
                <div key={project.id} className="flex items-center gap-2">
                  <ProjectCard
                    id={project.id}
                    name={project.name}
                    description={project.description}
                    currentUrl={currentUrl}
                  />
                  <form>
                    <LoadingButton
                      formAction={async () => {
                        "use server";

                        await prisma.project.delete({
                          where: { id: project.id, userId: user.id },
                        });

                        revalidatePath(`${currentUrl}`);
                      }}
                      type="submit"
                      variant="destructive"
                    >
                      X
                    </LoadingButton>
                  </form>
                </div>
              ))}
            </div>
          ) : (
            <Alert className="bg-muted/50">
              <AlertCircle className="size-4" />
              <AlertTitle>No projects found</AlertTitle>
              <AlertDescription>
                You don't have any projects yet. Create your first project
                below.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Create Project</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateProjectForm />
        </CardContent>
      </Card>
    </div>
  );
}
