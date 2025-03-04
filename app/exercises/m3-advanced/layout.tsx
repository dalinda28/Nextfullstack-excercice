import { AuthButton } from "@/components/navigation/login";
import { PropsWithChildren } from "react";

export default async function LayoutPage(props: PropsWithChildren) {
  return (
    <div>
      <nav className="flex justify-between items-center mb-4">
        <div className="flex-1" />
        <AuthButton />
      </nav>
      {props.children}
    </div>
  );
}
