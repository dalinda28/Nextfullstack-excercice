## Context

On va utiliser les API Route avec la libraire [Next Zod Route] pour créer une API Route qui affiche la liste des projets pour un utilisateur.

## Step #1

Il faut créer un fichier `route-client.ts` qui va contenir le client. Pour l'instant le client c'est juste une instance de `Next-Zod-Route`. Une fois définit, on va créer un route pour `/api/projects` qui va retourner **les projets pour l'utilisateur** et prendre un **query params** (qu'on peut passer avec `?q=xx`) qui va \*\*filtrer la liste des projets.

## Step #2

Dans cette étape on va rajouter une nouvelle route avec un [Middleware](https://github.com/Melvynx/next-zod-route#middleware) en utilisant la documentation. On va créer une route `authRoute` qui va vérifier les accès de l'utilsiatuer et retourner une `403` si l'utilsiatuer n'a pas la persmission de faire l'action.

On va passer le `user` en context et le récupérer dans notre méthode.
