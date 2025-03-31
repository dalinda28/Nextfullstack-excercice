import { AuthButton } from "@/components/navigation/auth-button";
import { PropsWithChildren, Suspense } from "react";

export default async function LayoutPage(props: PropsWithChildren) {
  return (
    <div>
      <nav className="flex justify-between items-center mb-4">
        <div className="flex-1" />
        <Suspense fallback={<div>Loading...</div>}>
          <AuthButton />
        </Suspense>
      </nav>
      {props.children}
    </div>
  );
}
