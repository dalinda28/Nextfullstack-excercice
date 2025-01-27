import { buttonVariants } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function RoutePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User not found</CardTitle>
      </CardHeader>
      <CardFooter>
        <Link
          href={`/exercises/m1-fundamentals/3.server-components/final`}
          className={buttonVariants({ variant: "outline" })}
        >
          Back
        </Link>
      </CardFooter>
    </Card>
  );
}
