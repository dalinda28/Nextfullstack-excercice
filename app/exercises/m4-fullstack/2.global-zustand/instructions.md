## Context

On veut pouvoir afficher une Dialog qui affiche les différent plans disponible sur notre application depuis n'importe où.

Pour ça on va utiliser Zustand.

## Partie 1

Tu vas pouvoir refactor le fichier `upgrade-dialog.tsx` pour utiliser un Store Zustand qui va venir gérer le state de la dialog.

Ensuite tu vas pouvoir refactor `page.tsx` en appelant la méthode Zustand au lieu de devoir chaque fois ajouter la dialog.
