## Context

On utilise `useEffect` pour fetch les données dans `projects-list.tsx`. On va refactoriser en utilisant `useQuery` et Zod pour valider les données.

## Partie 1

Refactorise le fichier `projects-list.tsx` en utilisant Tanstack/Query.

## Partie 2

Quand on soumet le formulaire de "Create new project", il n'y a aucun projet qui est créé... ou plutôt : on ne voit pas la mise à jour !

Rafraîchis et tu verras la mise à jour.

Il va falloir utiliser la méthode [`invalidateQueries`](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation) pour faire re-fetch de notre méthode.

## Partie 3

Tu peux utiliser Zod pour valider le type de retours de notre méthode. Pour l'instant, on ne sait pas ce qu'on reçoit et par défaut tout est typé à `any`. Regarde le résultat pour faire un schéma Zod qui vérifie qu'on reçoit les bonnes données de l'API.

## Partie 4

Dans le fichier `create-project-form`, remplace l'usage de `useAction` par `useMutation` de Tanstack/query !

- https://tanstack.com/query/latest/docs/framework/react/reference/useMutation

En règle générale, utiiser `useMutation` est **moins praitque pour les server-actions que useAction** !
