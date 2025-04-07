"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { PlanDialog } from "./upgrade-dialog";

// Même chose que Content
const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="border-b">
        <div className="container flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold">My App</h1>
          <Button onClick={() => setOpen(true)} variant="secondary">
            Upgrade Plan
          </Button>
        </div>
      </header>
      <PlanDialog open={open} setOpen={setOpen} />
    </>
  );
};

// Même chose que Content
const Navigation = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
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
                <Button onClick={() => setOpen(true)} className="w-full">
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          </nav>
        </CardContent>
      </Card>
      <PlanDialog open={open} setOpen={setOpen} />
    </>
  );
};

const Content = () => {
  // 🦁 Supprime le state
  const [open, setOpen] = useState(false);
  return (
    <>
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
              {/* 🦁 Remplace par l'export de la méthode openPlanDialog */}
              <Button onClick={() => setOpen(true)}>See Premium Plans</Button>
            </CardContent>
          </Card>
        </div>
      </main>
      {/* 🦁 Supprime PlanDialog */}
      <PlanDialog open={open} setOpen={setOpen} />
    </>
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
      {/* 🦁 Ajoute PlanDialog ici */}
    </div>
  );
}
