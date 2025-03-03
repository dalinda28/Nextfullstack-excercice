import { LinkCard } from "@/components/navigation/link-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getNavigations } from "../navigation.const";

export default async function RoutePage() {
  const navigation = await getNavigations();
  const section = navigation.find((section) => section.path === "m0-demo");

  if (!section) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{section.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-2 lg:gap-4">
          {section.items?.map((item) => (
            <LinkCard
              key={item.path}
              href={`/exercises/${section.path}/${item.path}`}
            >
              {item.title}
            </LinkCard>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
