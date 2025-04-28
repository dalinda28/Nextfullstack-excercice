Les `Route Handler` permettent de créer des API Endpoint avec `GET`, `POST`, `PUT` et `DELETE`...

Ta tâche est de venir créer 3 `API Endpoint` pour intéragir avec [`data.json`](./data.json), celui-ci contient une liste d'élément avec :

- `id` : un identifiant unique
- `name` : un nom

Il y a 3 actions à faire :

- `GET` : Récupérer la liste des éléments
- `POST` : Ajouter un élément
- `DELETE` : Supprimer un élément

Tu vas ensuite créer l'UI, l'interface, qui permet d'intéragir et faire des requêtes sur ces 3 endpoints.

Tu vas commencer par afficher la liste en utilisnat la "vieille méthode" de `useEffect` et `fetch` pour récupérer les données.

Puis tu vas créer un formulaire qui permet d'ajouter un élément à la liste.

Et un bouton qui permet de supprimer un élément de la liste.

## Important : usage de `fs`

`fs` est un outil en NodeJS qui permet de lire un fichier (ici data.json) mais surtout d'écrire dans ce même fichier.

Notre métier en tant que développeur est d'utiliser des nouveaux outils au quotidien. Je te laisse faire des recherches sur Google ou ChatGPT pour réussir à écrire et lire ce fichier.

Seul tips, le meilleur moyen de récupérer le path est le suivant :

```ts
import fs from "fs/promises";
import path from "path";

const dataPath = path.join(
  process.cwd(),
  "/app/exercises/m1-fundamentals/5.route-handler/data.json"
);
```
