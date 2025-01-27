import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function RouteLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Page layout.tsx</CardTitle>
      </CardHeader>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
}
