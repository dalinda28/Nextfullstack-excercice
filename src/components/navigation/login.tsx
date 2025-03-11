import { auth } from "@/lib/auth";
import { getUser } from "@/lib/auth-helper";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { LoadingButton } from "../form/loading-button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";

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
    <Dialog>
      <DialogTrigger asChild>
        <Button>Sign In</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in</DialogTitle>
        </DialogHeader>
        <form
          className="flex gap-2 flex-col"
          action={async (formData) => {
            "use server";

            await auth.api.signInEmail({
              body: {
                password: formData.get("password") as string,
                email: formData.get("email") as string,
              },
              headers: await headers(),
            });
          }}
        >
          <Input type="text" name="email" placeholder="Email" />
          <Input type="password" name="password" placeholder="Password" />
          <LoadingButton type="submit">Sign In</LoadingButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
