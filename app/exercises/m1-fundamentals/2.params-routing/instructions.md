Ta tâche est d'afficher une page qui possède un lien pour aller sur chaque librairie qui est stockée dans [data.const.ts](./data.const.ts). Tu vas utiliser l'objet `PAGES` pour afficher une liste dans la page principale.

Quand on clique sur le lien, on arrive sur l'URL `/exercises/m1-fundamentals/2.params-routing/code/[slug]` avec le slug de la librairie.

Il faudrait ensuite afficher une carte qui affiche :

1. Le slug (titre de la librairie)
2. La description de la librairie
3. Un lien pour aller sur la page de la librairie

Tu peux aussi rajouter une page [not-found.js](https://nextjs.org/docs/app/api-reference/file-conventions/not-found) dans le cas où la page n'est pas trouvée.

De cette manière, si l'utilisateur va sur un slug qui n'existe pas, on affiche aussi une erreur.
