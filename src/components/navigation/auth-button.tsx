import { auth } from "@/lib/auth";
import { getUser } from "@/lib/auth-session";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button, buttonVariants } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export async function AuthButton() {
  const user = await getUser();

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Avatar className="size-6">
                <AvatarFallback>
                  {user.name?.charAt(0) || user.email.charAt(0)}
                </AvatarFallback>
                {user.image && <AvatarImage src={user.image} />}
              </Avatar>

              <span className="text-sm font-medium hidden md:inline-block">
                {user.name || user.email}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/auth">Auth</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <form
                action={async () => {
                  "use server";
                  await auth.api.signOut({
                    headers: await headers(),
                  });
                  redirect("/exercises");
                }}
              >
                <button className="w-full text-left">Logout</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <Link
      href="/auth/signin"
      className={buttonVariants({ size: "sm", variant: "outline" })}
    >
      Sign in
    </Link>
  );
}
