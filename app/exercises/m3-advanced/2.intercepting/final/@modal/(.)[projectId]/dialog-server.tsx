"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export const DialogServer = (
  props: PropsWithChildren<{ className?: string }>
) => {
  const router = useRouter();
  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className={props.className}>
        {props.children}
      </DialogContent>
    </Dialog>
  );
};
