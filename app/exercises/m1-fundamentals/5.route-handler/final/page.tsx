"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RoutePage() {
  const [items, setItems] = useState<{ name: string; id: number }[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    async function fetchData() {
      const response = await fetch(`${pathname}/api`);
      const data = await response.json();
      setItems(data);
    }

    fetchData();
  }, [pathname]);

  async function addItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const itemName = formData.get("itemName") as string;

    if (!itemName.trim()) {
      return;
    }

    const response = await fetch(`${pathname}/api`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: itemName }),
    });
    const newItem = await response.json();
    setItems((prevItems) => [...prevItems, newItem]);
    form.reset();
  }

  async function deleteItem(id: number) {
    await fetch(`${pathname}/api`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Item List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-2 border rounded-md"
            >
              <span>{item.name}</span>
              <Button variant="outline" onClick={() => deleteItem(item.id)}>
                Delete
              </Button>
            </div>
          ))}
          <form className="flex items-center space-x-2 mt-4" onSubmit={addItem}>
            <Input
              type="text"
              name="itemName"
              placeholder="Enter item name"
              className="border p-2 rounded-md flex-1"
            />
            <Button type="submit">Add Item</Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
