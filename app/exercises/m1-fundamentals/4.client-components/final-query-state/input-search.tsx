"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export const InputSearch = (props: { defaultState: string }) => {
  const [search, setSearch] = useState(props.defaultState);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Label>
      Search:
      <Input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          router.push(pathname + `?q=${e.target.value}`);
        }}
        placeholder="Search"
      />
    </Label>
  );
};
