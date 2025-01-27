import { LinkCard } from "@/components/navigation/link-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NAVIGATION } from "../navigation.const";

export default async function RoutePage() {
  const section = NAVIGATION.find(
    (section) => section.path === "m1-fundamentals"
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{section?.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-2 lg:gap-4">
          {section?.items.map((item) => (
            <LinkCard
              key={item.path}
              href={`/exercises/${section.path}/${item.path}`}
              text={item.title}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
