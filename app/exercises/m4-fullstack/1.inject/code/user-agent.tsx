/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UserAgentDisplay() {
  // Utilise le Store
  const userAgent = undefined as any;

  if (!userAgent) {
    return <div>Loading user agent information...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Agent Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <span className="font-semibold">Browser:</span>{" "}
            {userAgent.browser.name} {userAgent.browser.version}
          </div>

          <div>
            <span className="font-semibold">OS:</span> {userAgent.os.name}{" "}
            {userAgent.os.version}
          </div>

          <div>
            <span className="font-semibold">Device:</span>{" "}
            {userAgent.device.type || "Desktop"}
            {userAgent.device.vendor &&
              ` (${userAgent.device.vendor}${
                userAgent.device.model ? ` ${userAgent.device.model}` : ""
              })`}
          </div>

          <div>
            <span className="font-semibold">Is Bot:</span>{" "}
            {userAgent.isBot ? "Yes" : "No"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
