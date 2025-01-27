import { LinkCard } from "@/components/navigation/link-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NAVIGATION } from "./navigation.const";

export default function ExercisesPage() {
  return (
    <div className="flex flex-col gap-4 lg:gap-12">
      {NAVIGATION.map((section) => (
        <Card key={section.path}>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2 lg:gap-4">
              {section.items.map((item) => (
                <LinkCard
                  key={item.path}
                  href={`/exercises/${section.path}/${item.path}`}
                  text={item.title}
                />
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
