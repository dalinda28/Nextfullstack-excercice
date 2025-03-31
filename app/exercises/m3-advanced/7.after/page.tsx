import { AutoNavigationCardSuspense } from "@/components/navigation/auto-lesson-card-suspense";
import { getNavigations } from "@app/exercises/navigation.const";

export default async function RoutePage() {
  return <AutoNavigationCardSuspense navigation={await getNavigations()} />;
}
