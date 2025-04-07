"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useQueryState } from "nuqs";

export const NuqsInputs = () => {
  const [name, setName] = useQueryState("name");
  const [age, setAge] = useQueryState("age", { defaultValue: "0" });
  const [isStudent, setIsStudent] = useQueryState("isStudent", {
    defaultValue: "false",
  });

  return (
    <div className="space-y-8">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          value={name ?? ""}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="age">Age</Label>
        <Input
          type="number"
          id="age"
          value={age ?? "0"}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="student-mode"
          checked={isStudent === "true"}
          onCheckedChange={(checked: boolean) =>
            setIsStudent(checked ? "true" : "false")
          }
        />
        <Label htmlFor="student-mode">Student mode</Label>
      </div>

      <Button
        variant="outline"
        onClick={() => {
          setName(null);
          setAge("0");
          setIsStudent("false");
        }}
      >
        Reset all
      </Button>
    </div>
  );
};
