import { getCurrentExerciseUrl } from "@/lib/current-exercises-url";
import Link from "next/link";

export default async function AllRoutes() {
  const currentUrl = await getCurrentExerciseUrl();
  return (
    <div className="flex flex-col gap-2">
      <Link
        href={`${currentUrl}/users/test/1/2/2`}
      >{`${currentUrl}/users/test/1/2/2`}</Link>
      <Link
        href={`${currentUrl}/nimportee/quel/url`}
      >{`${currentUrl}/nimportee/quel/url`}</Link>
      <Link
        href={`${currentUrl}/je/sais/pas/quoi/faire?a=1`}
      >{`${currentUrl}/je/sais/pas/quoi/faire?a=1`}</Link>
    </div>
  );
}
