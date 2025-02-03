import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { VEGETABLES } from "../data.const";

export default function RoutePage() {
  return (
    <Card className="p-6 flex">
      <div className="w-full">
        <Label>
          Search:
          <Input placeholder="Search" />
        </Label>
        <ul className="flex flex-col divide-y divide-accent mt-8">
          {VEGETABLES.map((item) => (
            <li key={item} className="py-3">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
