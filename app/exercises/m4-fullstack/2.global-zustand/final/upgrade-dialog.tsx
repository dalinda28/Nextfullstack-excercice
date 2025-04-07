"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { create } from "zustand";

// Plan store
interface PlanStore {
  showPlanDialog: boolean;
  openPlanDialog: () => void;
  closePlanDialog: () => void;
}

const usePlanStore = create<PlanStore>((set) => ({
  showPlanDialog: false,
  openPlanDialog: () => set({ showPlanDialog: true }),
  closePlanDialog: () => set({ showPlanDialog: false }),
}));

export const openPlanDialog = usePlanStore.getState().openPlanDialog;

export const PlanDialog = () => {
  const { showPlanDialog, closePlanDialog } = usePlanStore();

  return (
    <Dialog open={showPlanDialog} onOpenChange={closePlanDialog}>
      <DialogContent className="max-w-2xl w-full p-0">
        <CardHeader className="border-b">
          <DialogTitle>Choose Your Plan</DialogTitle>
          <DialogDescription>
            Select the plan that best suits your needs
          </DialogDescription>
        </CardHeader>
        <CardContent className="grid gap-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-baseline justify-between">
                Basic Plan
                <span className="text-2xl font-bold">$9.99</span>
              </CardTitle>
              <CardDescription>Perfect for getting started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">✓ Access to basic features</p>
              <p className="text-sm">✓ Email support</p>
              <p className="text-sm">✓ 5GB storage</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="secondary">
                Select Basic Plan
              </Button>
            </CardFooter>
          </Card>
          <Card className="relative">
            <div className="absolute -top-3 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
              POPULAR
            </div>
            <CardHeader>
              <CardTitle className="flex items-baseline justify-between">
                Pro Plan
                <span className="text-2xl font-bold">$19.99</span>
              </CardTitle>
              <CardDescription>For professional users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">✓ Access to all features</p>
              <p className="text-sm">✓ Priority support</p>
              <p className="text-sm">✓ 50GB storage</p>
              <p className="text-sm">✓ Advanced analytics</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Select Pro Plan</Button>
            </CardFooter>
          </Card>
        </CardContent>
        <DialogFooter className="justify-end border-t pt-4 px-6 pb-6">
          <Button onClick={closePlanDialog} variant="outline">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
