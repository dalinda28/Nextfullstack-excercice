"use client";

import { Input } from "@/components/ui/input";
import { parseAsString, useQueryState } from "nuqs";

export function SearchInput() {
  const [query, setQuery] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({
      shallow: false,
      clearOnDefault: true,
      throttleMs: 1000,
    })
  );

  return (
    <Input
      type="search"
      placeholder="Search..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full"
    />
  );
}
