import { Card } from "@/components/ui/card";
import Link from "next/link";

export function LinkCard({ href, text }: { href: string; text: string }) {
  return (
    <li>
      <Link href={href}>
        <Card className="p-4 hover:bg-accent transition">
          <p>{text}</p>
        </Card>
      </Link>
    </li>
  );
}
