import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { EventType } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";

interface EventsTableProps {
  relationsIds: string[];
}

export async function EventsTable({ relationsIds }: EventsTableProps) {
  const events = await prisma.event.findMany({
    where: {
      OR: [{ relationId: { in: relationsIds } }],
      type: {
        in: [
          EventType.PROJECT_UPDATED,
          EventType.TASK_UPDATED,
          EventType.TASK_DELETED,
          EventType.TASK_CREATED,
          EventType.PROJECT_CREATED,
          EventType.PROJECT_DELETED,
        ],
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const renderChanges = (
    prev: Record<string, unknown>,
    newData: Record<string, unknown>
  ) => {
    const changes: string[] = [];

    Object.keys(newData).forEach((key) => {
      if (JSON.stringify(prev[key]) !== JSON.stringify(newData[key])) {
        // Skip internal fields
        if (key === "id" || key === "userId" || key === "projectId") return;

        const oldValue = prev[key]
          ? JSON.stringify(prev[key]).replace(/"/g, "")
          : "none";
        const newValue = newData[key]
          ? JSON.stringify(newData[key]).replace(/"/g, "")
          : "none";

        changes.push(`Changed ${key} from "${oldValue}" to "${newValue}"`);
      }
    });

    return changes.length ? (
      <ul className="list-disc pl-5 space-y-1">
        {changes.map((change, i) => (
          <li key={i} className="text-sm">
            {change}
          </li>
        ))}
      </ul>
    ) : (
      <span className="text-muted-foreground">No visible changes</span>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Update History</CardTitle>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <p className="text-muted-foreground">
            No update events found for this project.
          </p>
        ) : (
          <div className="space-y-4">
            {events.map((event) => {
              const data = event.data as {
                prev: Record<string, unknown>;
                new: Record<string, unknown>;
              };
              const eventType = event.type.replace("_", " ");

              return (
                <div key={event.id} className="border rounded-md p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{eventType}</h3>
                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(event.createdAt, {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <div>{renderChanges(data.prev, data.new)}</div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
