import { LinkCard } from "@/components/navigation/link-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExercisesPage() {
  return (
    <div className="flex flex-col gap-4 lg:gap-12">
      <Card>
        <CardHeader>
          <CardTitle>M1 - Fundamentals</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-2 lg:gap-4">
            <LinkCard
              href="/exercises/m1-fundamentals/routing"
              text="Routing"
            />
            <LinkCard
              href="/exercises/m1-fundamentals/routing"
              text="Routing with params"
            />
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
