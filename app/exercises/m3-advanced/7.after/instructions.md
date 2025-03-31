## Context

Pour garder trace des mises à jour sur les Tasks et les projets on a ajouté une table qui permet de garder tous les "events" afin de pouvoir savoir quand un élément a été changé. Le problème c'est que maintenant, chaque fois qu'on veut modifier un élément il faut créer l'event ce qui peut prendre du temps.

Nous, on veut retourner la réponse le plus rapidement possible à l'utilisateur, on va donc utiliser `after()` pour wrapper les modifications qui peuvent "attendre quelque temps" avant d'être effectuées.

## Tâche

Optimise l'application avec `after()`
