import { LinkCard } from "@/components/navigation/link-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function RoutePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>M1 - Fundamentals - Routing</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-2 lg:gap-4">
          <LinkCard
            href="/exercises/m1-fundamentals/routing/code"
            text="Exercise"
          />
          <LinkCard
            href="/exercises/m1-fundamentals/routing/final"
            text="Solution"
          />
        </ul>
      </CardContent>
    </Card>
  );
}
