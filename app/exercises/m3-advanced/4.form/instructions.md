## Context

On va créer une interface qui permet de lister et de créer de nouveaux projets.

## Step #1

Tu dois créer la server action directement dans le Server Component qui permet de venir créer le projet. La Server Action doit créer un projet lié à l'utilisateur actuellement connecté, pour ça tu peux utiliser [auth-session.ts](../../../../src/lib/auth-session.ts) qui permet avec la méthode `requiredAuth()` de récupérer l'utilisateur actuel.

Ensuite tu peux créer la page `/projects/[projectId]` pour venir gérer la page d'un projet. Tu vas afficher un formulaire avec ce projet et encore une fois créer une server-action qui permet de modifier ce projet.

Ceci va nous permettre de pouvoir :

1. Créer un projet
2. Le modifier

## Step #2

Tu vas devoir modifier **l'édition d'un projet** dans la page `/projects/[projectId]` pour inclure [`useActionState()`](https://react.dev/reference/react/useActionState) qui va venir gérer la Server Action pour un client component.

Tu vas pouvoir **déplacer la server action** dans un fichier séparé comme `project.action.ts` et réaliser le Client Component (séparé dans un autre fichier que la page) qui permet de gérer la modification. Quand la modification est terminée, on est redirigé sur la page principale avec les projets mis à jour.

Pour pimenter un peu l'exercice, on va rajouter des "Erreurs".

- Si il n'y a pas de title ou description données, on affiche une erreur
- Si le title ou la description contient un mots interdit en utilisant [bad-words.ts](src/lib/bad-words.ts) !

Pour gérer ceci, on va utiliser le `prevState` avec un état d'erreur. Je te laisse chercher par toi même.

## Step #3

On va venir rajouter un bouton delete en utilisant la props `formAction` sur le bouton. Ceci va permettre d'appeler une méthode pour supprimer un projet avec simplement un bouton.

- [formAction props](https://react.dev/reference/react-dom/components/input#props)

Créer un `LoadingButton` qu'on va utiliser ici et pour la création d'un projet. On va créer un client component qui utilise [useFormStatus](https://react.dev/reference/react-dom/hooks/useFormStatus) pour fonctionner avec l'état `pending` !

## Step #4

Les projects ont des tâches assigner. On va venir utiliser le hooks useOptimistic pour afficher la liste des tâches.

Tu vas créer un nouveau fichier `tasks-list.tsx` qui av utiliser le hooks [useOptimistic](https://react.dev/reference/react/useOptimistic) pour mettre à jour notre liste et faire 2 actions :

- Ajouter une tâche
- Supprimer une tâche

Pour chacune de ces updates il va falloir :

1. Mettre à jour le state optimistic
2. Appeler la Server Actions
3. Afficher un état de chargement pour comprendre que c'est pas "valider"

Utilise Google et fait des recherches pour mener à bien cette exercices complexe.

## Step #5

On va venir utiliser [NextSafeAction] pour créer un `safe-action.ts` en suivant la documentation :

- [Getting Started](https://next-safe-action.dev/docs/getting-started) (j'ai déjà installé la librairie)
- [Middleware](https://next-safe-action.dev/docs/define-actions/middleware)

De cette manière on va créer 2 clients :

1. Client de base
2. Client que pour les utilisateurs authentifiés

Tu peux aussi utiliser [`handleServerError`](https://next-safe-action.dev/docs/define-actions/create-the-client#handleservererror) afin d'avoir une custom erreur.

Une fois que tu as fait tout ça, tu peux créer un fichier `create-project-form` qui va appeler cette server-action en utilisant [`useAction`](https://next-safe-action.dev/docs/execute-actions/hooks/useaction).
