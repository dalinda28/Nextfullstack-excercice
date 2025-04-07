import { Input } from "@/components/ui/input";

export function SearchInput() {
  // 🦁 Utilise useQueryState pour le searchParams
  // 💡 Utilise shallow et throttleMs

  return (
    <Input
      type="search"
      placeholder="Search..."
      // 🦁 Utilise les valeurs de retours de la query
      className="w-full"
    />
  );
}
