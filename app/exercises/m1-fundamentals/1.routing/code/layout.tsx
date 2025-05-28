import { PropsWithChildren } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Layout(props: PropsWithChildren) { 
  return (
    <Card>
      <CardHeader>
        <CardTitle>Page layout.tsx</CardTitle>
      </CardHeader>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
}