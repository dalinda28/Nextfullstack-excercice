"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "../ui/button";

export type LoadingButtonProps = ButtonProps & {
  forceLoading?: boolean;
};

export const LoadingButton = ({
  forceLoading,
  ...props
}: LoadingButtonProps) => {
  const { pending } = useFormStatus();
  const loading = forceLoading || pending;
  return (
    <Button {...props} disabled={loading} className="relative">
      <span
        className={cn(
          "transition-opacity duration-300 ease-in-out",
          pending ? "opacity-0" : "opacity-100"
        )}
      >
        {props.children}
      </span>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      )}
    </Button>
  );
};
