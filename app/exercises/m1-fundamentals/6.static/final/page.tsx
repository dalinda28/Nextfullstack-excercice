import { LinkCard } from "@/components/navigation/link-card";
import { getItems } from "./utils";

export const dynamic = "force-static";

export default async function RoutePage() {
  const items = await getItems();

  return (
    <div>
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <LinkCard
            key={item.slug}
            href={`/exercises/m1-fundamentals/6.static/final/${item.slug}`}
          >
            {item.title}
          </LinkCard>
        ))}
      </ul>
    </div>
  );
}
