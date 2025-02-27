import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Rabbit } from "lucide-react";

export default function NotFound() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <Rabbit size={32} />
        <CardTitle>Sorry, page not found 🥲</CardTitle>
      </CardHeader>
    </Card>
  );
}
