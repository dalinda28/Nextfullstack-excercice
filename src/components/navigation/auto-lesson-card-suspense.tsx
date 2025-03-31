import { Suspense } from "react";
import { NavigationItem } from "../../../app/exercises/navigation.const";
import { AutoNavigationCard } from "./auto-lesson-card";

export const AutoNavigationCardSuspense = ({
  navigation,
}: {
  navigation: NavigationItem[];
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AutoNavigationCard navigation={navigation} />
    </Suspense>
  );
};
