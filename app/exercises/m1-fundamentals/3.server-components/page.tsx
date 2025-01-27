import { LinkCard } from "@/components/navigation/link-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NAVIGATION } from "../../navigation.const";

export default async function RoutePage() {
  const section = NAVIGATION.find(
    (section) => section.path === "m1-fundamentals"
  );
  const lesson = section?.items.find(
    (item) => item.path === "3.server-components"
  );

  if (!section || !lesson) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>M1 - Fundamentals - Routing</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-2 lg:gap-4">
          <LinkCard
            key={lesson.path}
            text="Code"
            href={`/exercises/${section.path}/${lesson.path}/code`}
          />
          <LinkCard
            key={lesson.path}
            text="Solution"
            href={`/exercises/${section.path}/${lesson.path}/final`}
          />
        </ul>
      </CardContent>
    </Card>
  );
}
