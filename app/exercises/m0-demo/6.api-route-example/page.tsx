"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { ProjectSelect } from "./project-select";

export default function Page() {
  const [projectId, setProjectId] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Select Example</CardTitle>
      </CardHeader>
      <CardContent>
        <ProjectSelect
          selectedProjectId={projectId}
          onProjectChange={setProjectId}
        />
        {projectId && (
          <p className="mt-4 text-sm text-muted-foreground">
            Selected project ID: {projectId}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
