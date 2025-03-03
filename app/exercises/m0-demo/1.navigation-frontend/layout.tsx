"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

export default function RouterDemo(props: PropsWithChildren) {
  const router = useRouter();
  const currentPathname = usePathname();

  const basePath = "/exercises/m0-demo/1.navigation-frontend";

  const [history, setHistory] = useState<string[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
  // Flag to track if we're navigating programmatically
  const isNavigatingRef = useRef(false);

  // Initialize history on component mount
  useEffect(() => {
    // Initial path
    setHistory([window.location.pathname]);
    setCurrentHistoryIndex(0);
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      // Only update if not triggered by our own navigation methods
      if (!isNavigatingRef.current) {
        const currentPath = window.location.pathname;

        // Find the path in our history
        const index = history.indexOf(currentPath);

        if (index !== -1) {
          // Path exists in history, just update the index
          setCurrentHistoryIndex(index);
        } else {
          // This is a new path not in our history
          // This should rarely happen with proper handling
          console.log("Warning: Path not found in history during popstate");
        }
      }

      // Reset the flag
      isNavigatingRef.current = false;
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [history]);

  // Navigation methods
  const handlePush = (path: string) => {
    router.push(path);

    // Update history - add new entry
    const newHistory = [...history.slice(0, currentHistoryIndex + 1), path];
    setHistory(newHistory);
    setCurrentHistoryIndex(newHistory.length - 1);
  };

  const handleReplace = (path: string) => {
    router.replace(path);

    // Update history - replace current entry
    const newHistory = [...history];
    newHistory[currentHistoryIndex] = path;
    setHistory(newHistory);
    // Current index stays the same
  };

  const handleBack = () => {
    if (currentHistoryIndex > 0) {
      // Set flag before navigation
      isNavigatingRef.current = true;

      router.back();

      // Update our internal state to match browser behavior
      setCurrentHistoryIndex((prev) => prev - 1);
    }
  };

  const handleForward = () => {
    if (currentHistoryIndex < history.length - 1) {
      // Set flag before navigation
      isNavigatingRef.current = true;

      router.forward();

      // Update our internal state to match browser behavior
      setCurrentHistoryIndex((prev) => prev + 1);
    }
  };

  const handleRefresh = () => {
    router.refresh();
    // No change to history or index
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Next.js Navigation Demo</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input value={currentPathname} />
          <Alert>
            <AlertTitle>Current Children</AlertTitle>
            <AlertDescription>{props.children}</AlertDescription>
          </Alert>

          <div className="flex flex-wrap gap-4">
            <Card className="p-4">
              <h3 className="font-bold">Push (Adds to history)</h3>
              <p className="text-sm text-gray-500 mb-2">
                Adds a new entry to the history stack
              </p>
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={() => handlePush(`${basePath}/`)}
                  variant={
                    currentPathname === `${basePath}/` ? "default" : "outline"
                  }
                >
                  Home
                </Button>
                <Button
                  onClick={() => handlePush(`${basePath}/users`)}
                  variant={
                    currentPathname === `${basePath}/users`
                      ? "default"
                      : "outline"
                  }
                >
                  Users
                </Button>
                <Button
                  onClick={() => handlePush(`${basePath}/products`)}
                  variant={
                    currentPathname === `${basePath}/products`
                      ? "default"
                      : "outline"
                  }
                >
                  Products
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-bold">Replace (Replaces current history)</h3>
              <p className="text-sm text-gray-500 mb-2">
                Replaces the current entry in history stack
              </p>
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={() => handleReplace(`${basePath}/`)}
                  variant={
                    currentPathname === `${basePath}/` ? "default" : "outline"
                  }
                >
                  Home
                </Button>
                <Button
                  onClick={() => handleReplace(`${basePath}/users`)}
                  variant={
                    currentPathname === `${basePath}/users`
                      ? "default"
                      : "outline"
                  }
                >
                  Users
                </Button>
                <Button
                  onClick={() => handleReplace(`${basePath}/products`)}
                  variant={
                    currentPathname === `${basePath}/products`
                      ? "default"
                      : "outline"
                  }
                >
                  Products
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-bold">Router Controls</h3>
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={handleBack}
                  size="sm"
                  disabled={currentHistoryIndex <= 0}
                >
                  Back
                </Button>
                <Button
                  onClick={handleForward}
                  size="sm"
                  disabled={currentHistoryIndex >= history.length - 1}
                >
                  Forward
                </Button>
                <Button onClick={handleRefresh} size="sm">
                  Refresh
                </Button>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>History Stack:</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md p-4">
            {history.length > 0 ? (
              <ol className="list-decimal pl-5">
                {history.map((path, index) => (
                  <li
                    key={index}
                    className={`text-sm ${
                      index === currentHistoryIndex
                        ? "underline text-blue-600"
                        : ""
                    }`}
                  >
                    {path} {index === currentHistoryIndex && "(current)"}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-sm">No history yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
