Dans notre application, on a envie d'afficher la liste qui est dans [data.const.ts](./data.const.ts) avec un champs texte qui permet de rechercher dans cette liste pour nous afficher une liste filtrée de celle-ci.

Le problème c'est que dans le `Server Components` (la page) où on est actuellement, on ne peut pas filtrer simplement la liste car il n'est pas possible d'utiliser `useState` ou d'autres hooks.

Ta tâche est donc de résoudre ce problème en créant un `Client Component` qui permettra de filtrer la liste.
