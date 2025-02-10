import Link from "next/link";
import { getItemBySlug, getItems } from "../utils";

export async function generateStaticParams() {
  const posts = await getItems();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const dynamic = "force-static";

export default async function ItemPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const item = await getItemBySlug(slug);

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{item.title}</h1>
      <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
        {item.content}
      </p>
      <Link
        href="/exercises/m1-fundamentals/6.static/final"
        className="text-blue-500 hover:underline"
      >
        Back
      </Link>
    </div>
  );
}
