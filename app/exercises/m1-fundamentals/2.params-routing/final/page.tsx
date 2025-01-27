import { Card } from "@/components/ui/card";
import Link from "next/link";
import { PAGES } from "../data.const";

export default async function RoutePage() {
  return (
    <Card className="p-6 flex">
      <ul className="flex-col list-disc list-inside">
        {PAGES.map((page) => (
          <li key={page.slug}>
            <Link
              className="hover:underline text-primary"
              href={`/exercises/m1-fundamentals/2.params-routing/final/${page.slug}`}
            >
              {page.slug}
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
