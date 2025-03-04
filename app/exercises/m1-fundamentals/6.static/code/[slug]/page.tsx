import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts } from "../utils";

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function RoutePage(props: {
  params: Promise<{ slug: string }>;
}) {
  await new Promise((n) => setTimeout(n, 1000));
  const params = await props.params;
  const posts = await getPosts();
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{post?.content}</p>
      </CardContent>
      <CardFooter>
        <Link
          className={buttonVariants({ size: "lg" })}
          href="/exercises/m1-fundamentals/6.static/code"
        >
          Back
        </Link>
      </CardFooter>
    </Card>
  );
}
