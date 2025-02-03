import { Card } from "@/components/ui/card";
import { VEGETABLES } from "../data.const";
import { ListSearch } from "./fruits-finder";

export default function RoutePage() {
  return (
    <Card className="p-6 flex">
      <ListSearch items={VEGETABLES} />
    </Card>
  );
}
