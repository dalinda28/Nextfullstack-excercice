import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PAGES } from "../../data.const";
// Ce composant reçoit une prop "params" qui est une Promise contenant un objet avec un champ "slug".
// On utilise "await" pour attendre que la Promise soit résolue et obtenir la valeur réelle de "params".
// Cela permet de récupérer dynamiquement le paramètre d'URL (slug) pour afficher la page correspondante.

// "params" est une propriété passée au composant par le système de routing de Next.js. 
// Dans ce cas, "params" est une Promise qui, une fois résolue, donne un objet contenant le champ "slug".
// "slug" est un paramètre dynamique de l'URL, par exemple : /exercises/m1-fundamentals/2.params-routing/code/bonjour
// Ici, "params" ressemblera à : { slug: "bonjour" } une fois la Promise résolue.
// Cela permet de récupérer dynamiquement la partie de l'URL correspondant au "slug" pour afficher la page appropriée.

export default async function RoutePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = PAGES.find((page) => page.slug === params.slug);

  if (!page) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{page.slug}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{page.description}</p>
      </CardContent>
      <CardFooter>
        <Link
          className={buttonVariants({ size: "lg", variant: "outline" })}
          href="exercises/m1-fundamentals/2.params-routing/code"
        >
          Visit
        </Link>
      </CardFooter>
    </Card>
  );
}
