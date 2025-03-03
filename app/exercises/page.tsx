import { AutoNavigationCard } from "@/components/navigation/auto-lesson-card";
import { getNavigations } from "./navigation.const";

export default async function RoutePage() {
  return <AutoNavigationCard navigation={await getNavigations()} />;
}
