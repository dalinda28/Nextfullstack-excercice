"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

export interface ListSearchProps {
  items: string[];
}

export const ListSearch = (props: ListSearchProps) => {
  const [search, setSearch] = useState("");
  const filteredItems = props.items.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );
  console.log("Render With Filter", { search });
  return (
    <div className="w-full">
      <Label>
        Search:
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />
      </Label>
      <ul className="flex flex-col divide-y divide-accent mt-8">
        {filteredItems.map((item) => (
          <li key={item} className="py-3">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
