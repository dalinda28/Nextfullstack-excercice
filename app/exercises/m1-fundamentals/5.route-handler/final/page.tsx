"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RoutePage() {
  const [list, setList] = useState<{ id: number; name: string }[]>([]);
  const pathname = usePathname();

  const refreshItems = () => {
    fetch(pathname + "/api")
      .then((res) => res.json())
      .then(setList);
  };

  useEffect(() => {
    refreshItems();
  }, []);

  const deleteItem = async (id: number) => {
    const result = await fetch(`${pathname}/api/${id}`, {
      method: "DELETE",
    });
    const json = await result.json();
    setList(json);
  };

  const addItem = async (name: string) => {
    const result = await fetch(`${pathname}/api`, {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await result.json();
    setList(json);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Item List</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-2">
          {list.map((data) => (
            <li className="border flex items-center justify-between px-4 py-2">
              <span>{data.name}</span>
              <Button
                onClick={() => deleteItem(data.id)}
                size="sm"
                variant="ghost"
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const name = formData.get("name") as string;
            addItem(name);
            e.currentTarget.reset();
          }}
          className="flex items-center gap-2 mt-4"
        >
          <Input name="name" />
          <Button type="submit">Add</Button>
        </form>
      </CardContent>
    </Card>
  );
}
