"use client";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const SSRClientComponentDemo = () => {
  const [count, setCount] = useState(0);

  console.log("🟢🟢🟢 SSRClientComponentDemo");

  return (
    <Alert>
      <AlertTitle>Client Component</AlertTitle>
      <div className="mt-2">
        <p>Count: {count}</p>
        <Button onClick={() => setCount(count + 1)}>Increment</Button>
      </div>
    </Alert>
  );
};
