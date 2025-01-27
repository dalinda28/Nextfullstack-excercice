import { Card } from "@/components/ui/card";
import Link from "next/link";

export default async function RoutePage() {
  const users = await fetch("https://jsonplaceholder.typicode.com/users");
  const usersData = (await users.json()) as { id: number; name: string }[];
  return (
    <Card className="p-6 flex">
      <ul className="flex-col list-disc list-inside">
        {usersData.map((user) => (
          <li key={user.id}>
            <Link
              className="hover:underline text-primary"
              href={`/exercises/m1-fundamentals/3.server-components/final/${user.id}`}
            >
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
