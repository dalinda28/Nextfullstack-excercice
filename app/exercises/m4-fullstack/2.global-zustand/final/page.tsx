"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { openPlanDialog, PlanDialog } from "./upgrade-dialog";

// Components
const Header = () => {
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">My App</h1>
        <Button onClick={() => openPlanDialog()} variant="secondary">
          Upgrade Plan
        </Button>
      </div>
    </header>
  );
};

const Navigation = () => {
  return (
    <Card className="h-full rounded-none border-r">
      <CardContent className="p-4">
        <nav className="space-y-6">
          <ul className="space-y-1">
            <li className="flex items-center p-2 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer">
              <span>Dashboard</span>
            </li>
            <li className="flex items-center p-2 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer">
              <span>Settings</span>
            </li>
            <li className="flex items-center p-2 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer">
              <span>Profile</span>
            </li>
          </ul>
          <Card>
            <CardContent className="p-4 space-y-3">
              <p className="font-medium">Upgrade to Premium</p>
              <p className="text-xs text-muted-foreground">
                Get access to all features
              </p>
              <Button onClick={() => openPlanDialog()} className="w-full">
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        </nav>
      </CardContent>
    </Card>
  );
};

const Content = () => {
  return (
    <main className="flex-1">
      <div className="container py-6">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to your dashboard</CardTitle>
            <CardDescription>
              Discover all the features available to you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This is your content area. You're currently on the free plan.
            </p>
            <Button onClick={() => openPlanDialog()}>See Premium Plans</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 gap-4">
        <Navigation />
        <Content />
      </div>
      <PlanDialog />
    </div>
  );
}
