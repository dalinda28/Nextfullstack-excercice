import { headers } from "next/headers";
import { userAgent } from "next/server";
import { InitializeRequestStore } from "./user-agent-store";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const userAgentType = userAgent({ headers: headersList });
  return (
    <>
      <InitializeRequestStore store={{ userAgent: userAgentType }} />
      {children}
    </>
  );
}
