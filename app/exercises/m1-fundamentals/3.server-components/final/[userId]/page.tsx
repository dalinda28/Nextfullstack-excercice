import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function RoutePage(props: {
  params: Promise<{ userId: string }>;
}) {
  const params = await props.params;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.userId}`
  );

  if (response.status !== 200) {
    notFound();
  }

  const user = await response.json();

  return (
    <Card className="p-6 flex flex-col space-y-4">
      <h2 className="text-xl font-bold">{user.name}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">Personal Info</h3>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
        </div>
        <div>
          <h3 className="font-semibold">Address</h3>
          <p>
            {user.address.street}, {user.address.suite}
          </p>
          <p>
            {user.address.city}, {user.address.zipcode}
          </p>
          <p>
            Geo: {user.address.geo.lat}, {user.address.geo.lng}
          </p>
        </div>
      </div>
      <div>
        <h3 className="font-semibold">Company</h3>
        <p>Name: {user.company.name}</p>
        <p>Catch Phrase: {user.company.catchPhrase}</p>
        <p>BS: {user.company.bs}</p>
      </div>
      <Link
        className={buttonVariants({ size: "lg" })}
        href="/exercises/m1-fundamentals/3.server-components/code"
      >
        Back
      </Link>
    </Card>
  );
}
