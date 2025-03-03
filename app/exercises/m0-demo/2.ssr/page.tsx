import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SSRClientComponentDemo } from "./client-component";

export default async function RoutePage() {
  console.log("🔴🔴🔴 Server Component");

  // Environement variable
  // Query database
  // Secret

  return (
    <Card>
      <CardHeader>
        <CardTitle>Server Component</CardTitle>
      </CardHeader>
      <CardContent>
        <SSRClientComponentDemo />
      </CardContent>
    </Card>
  );
}
