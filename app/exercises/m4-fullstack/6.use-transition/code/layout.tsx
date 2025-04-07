"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { getCurrentExerciseUrlClient } from "@/lib/current-exercices-url-client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export default function ProjectsPage(props: PropsWithChildren) {
  return (
    <div className="flex gap-4">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Navigation</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <ul className="flex flex-col gap-2">
            <Route href="/">Projects</Route>
            <Route href="/new">New Project</Route>
          </ul>
        </CardContent>
      </Card>
      <div className="flex-2">{props.children}</div>
    </div>
  );
}

const Route = ({ href, children }: PropsWithChildren<{ href: string }>) => {
  const router = useRouter();
  // 🦁 Ajoute useTransition
  const currentUrl = getCurrentExerciseUrlClient();
  const isPending = false;

  return (
    <li className="w-full">
      <button
        onClick={() => {
          // 🦁 Utilise startTransition pour faire le push
          router.push(currentUrl + href);
        }}
        className={cn(
          "border w-full rounded-md hover:bg-accent justify-between px-4 py-2 cursor-pointer flex items-center gap-2",
          {
            "animate-pulse": isPending,
          }
        )}
      >
        {children}
        {isPending && <Loader size={12} />}
      </button>
    </li>
  );
};
