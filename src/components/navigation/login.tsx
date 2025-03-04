import { signIn, signOut } from "@/lib/auth";
import { auth } from "@/lib/auth-helper";
import { redirect } from "next/navigation";
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
  const user = await auth();

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
                  await signOut();
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
          className="flex gap-2"
          action={async (formData) => {
            "use server";
            await signIn("resend", formData);
          }}
        >
          <Input type="text" name="email" placeholder="Email" />
          <Button type="submit">Signin</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
