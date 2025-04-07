import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NuqsInputs } from "./nuqs-inputs";

export default async function NuqsPage(props: {
  searchParams: Promise<{ name?: string; age?: string; isStudent?: string }>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Current URL Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="rounded-lg bg-muted p-4">
            {JSON.stringify(searchParams, null, 2)}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>NuQS Demo</CardTitle>
        </CardHeader>
        <CardContent>
          <NuqsInputs />
        </CardContent>
      </Card>
    </div>
  );
}
