import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X } from "lucide-react";

export default async function RoutePage() {
  return (
    <Alert>
      <X className="size-4" />
      <AlertTitle>Unauthorized</AlertTitle>
      <AlertDescription>Please login.</AlertDescription>
    </Alert>
  );
}
