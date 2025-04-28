"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { parseAsBoolean, parseAsInteger, useQueryState } from "nuqs";

export const NuqsInputs = () => {
  const [name, setName] = useQueryState("name", {
    shallow: false,
    throttleMs: 1000,
  });
  const [age, setAge] = useQueryState(
    "age",
    parseAsInteger.withDefault(0).withOptions({
      shallow: false,
      throttleMs: 1000,
    })
  );
  const [isStudent, setIsStudent] = useQueryState(
    "isStudent",
    parseAsBoolean.withDefault(false).withOptions({
      shallow: false,
      throttleMs: 1000,
    })
  );

  console.log({ name, age, isStudent });

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
          onChange={(e) => setAge(Number(e.target.value))}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="student-mode"
          checked={isStudent}
          onCheckedChange={(checked: boolean) => setIsStudent(checked)}
        />
        <Label htmlFor="student-mode">Student mode</Label>
      </div>

      <Button
        variant="success"
        onClick={() => {
          setName(null);
          setAge(0);
          setIsStudent(false);
        }}
      >
        Reset all
      </Button>
    </div>
  );
};
