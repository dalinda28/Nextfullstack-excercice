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
