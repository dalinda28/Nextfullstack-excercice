import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { PAGES } from "../../data.const";

export default async function RoutePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = PAGES.find((page) => page.slug === params.slug);

  if (!page) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{page.slug}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{page.description}</p>
      </CardContent>
      <CardFooter>
        <Link
          className={buttonVariants({ size: "lg", variant: "outline" })}
          href={page.url}
        >
          Visit
        </Link>
      </CardFooter>
    </Card>
  );
}
