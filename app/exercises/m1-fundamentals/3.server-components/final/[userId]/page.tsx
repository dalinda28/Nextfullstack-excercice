import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function UserPage({
  params,
}: {
  params: { userId: string };
}) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.userId}`
  );
  const userData = await response.json();

  if (response.status !== 200) {
    return notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{userData.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>Email: {userData.email}</CardDescription>
        <CardDescription>Phone: {userData.phone}</CardDescription>
        <CardDescription>Website: {userData.website}</CardDescription>
        <CardDescription>Company: {userData.company.name}</CardDescription>
        <CardDescription>
          Address: {userData.address.street}, {userData.address.city}
        </CardDescription>
      </CardContent>
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
