## Context

On va utiliser les API Routes avec la librairie [Next Zod Route] pour créer une API Route qui affiche la liste des projets pour un utilisateur.

## Step #1

Il faut créer un fichier `route-client.ts` qui va contenir le client. Pour l'instant le client c'est juste une instance de `Next-Zod-Route`. Une fois défini, on va créer une route pour `/api/projects` qui va retourner **les projets pour l'utilisateur** et prendre un **query param** (qu'on peut passer avec `?q=xx`) qui va \*\*filtrer la liste des projets.

## Step #2

Dans cette étape on va ajouter une nouvelle route avec un [Middleware](https://github.com/Melvynx/next-zod-route#middleware) en utilisant la documentation. On va créer une route `authRoute` qui va vérifier les accès de l'utilisateur et retourner une `403` si l'utilisateur n'a pas la permission de faire l'action.

On va passer le `user` en context et le récupérer dans notre méthode.

## Step #3

On va créer une API Rest pour les projets. On a déjà créé `/api/projects` qui permet de récupérer la liste de tous les projets.

Maintenant créer :

1. Route pour récupérer un projet via `id`
2. Route pour supprimer un projet via `id`
3. Route pour modifier un projet via `id`
4. Route pour récupérer tous les "tasks" qui sont liées à un projet

Créer les routes en suivant le concept d'API Rest.

Tu peux utiliser un service comme "HTTPie" pour tester les requêtes. Pour t'authentifier dans ce genre d'outil, tu peux récupérer ton cookie qui est dans ton navigateur.
