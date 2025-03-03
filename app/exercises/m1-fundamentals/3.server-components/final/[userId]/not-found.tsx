"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Rabbit } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function NotFound() {
  const params = useParams();
  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <Rabbit size={32} />
        <CardTitle>The user with id "{params.userId}" doesn't existe</CardTitle>
        <Link
          className={buttonVariants({ size: "lg" })}
          href="/exercises/m1-fundamentals/3.server-components/code"
        >
          Back
        </Link>
      </CardHeader>
    </Card>
  );
}
