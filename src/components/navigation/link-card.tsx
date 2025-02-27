import { Card } from "@/components/ui/card";
import Link from "next/link";
import { PropsWithChildren } from "react";

export function LinkCard({
  href,
  children,
}: PropsWithChildren<{ href: string }>) {
  return (
    <Link href={href}>
      <Card className="p-4 hover:bg-accent transition">{children}</Card>
    </Link>
  );
}
