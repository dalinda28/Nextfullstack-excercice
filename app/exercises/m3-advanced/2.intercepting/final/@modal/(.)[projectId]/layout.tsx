import { DialogServer } from "./dialog-server";

export default async function RouteLayout(props: {
  children: React.ReactNode;
}) {
  return <DialogServer>{props.children}</DialogServer>;
}
