/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default async function RoutePage() {
  const users = await fetch("https://jsonplaceholder.typicode.com/users").then(
    (res) => res.json()
  );

  return (
    <Card className="p-6 flex">
      <ul className="list-disc list-inside">
        {users.map((user: any) => (
          <li>
            <Link
              href={`/exercises/m1-fundamentals/3.server-components/final/${user.id}`}
              className="text-indigo-500 hover:underline"
            >
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
