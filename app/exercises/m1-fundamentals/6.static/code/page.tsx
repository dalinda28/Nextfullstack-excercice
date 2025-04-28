import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default async function RoutePage() {
  const posts = [];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Item List</CardTitle>
      </CardHeader>
      <CardContent>{posts.length}</CardContent>
    </Card>
  );
}
