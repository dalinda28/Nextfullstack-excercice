import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { getPosts } from "./utils";

export default async function RoutePage() {
  const posts = await getPosts();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Item List</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                className="text-indigo-500 hover:underline"
                href={`/exercises/m1-fundamentals/6.static/code/${post.slug}`}
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
