"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

export default function NotFoundPage(props: {
  error: Error;
  reset: () => void;
}) {
  return (
    <Alert variant="destructive">
      <TriangleAlert size={16} />
      <div>
        <AlertTitle>Error.tsx</AlertTitle>
        <AlertDescription>
          Please refresh the page or try again later.
        </AlertDescription>
        <Button variant="outline" onClick={props.reset}>
          Reset
        </Button>
        <a
          href="/exercises/m1-fundamentals/1.routing/final"
          className={buttonVariants({ variant: "outline" })}
        >
          Remove error
        </a>
      </div>
    </Alert>
  );
}
