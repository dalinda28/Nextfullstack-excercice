## Context

On va utiliser `NUQS` et les query params pour afficher des données de manière dynamique depuis nos Server Components.

C'est **la meilleure solution** pour afficher des données en fonction de paramètres dans notre application.

## Partie 1

Tu peux suivre les émojis 🦁 pour venir ajouter `NUQS` dans notre application.

1.  Modifie le fichier search input avec useQueryState

Tu peux voir la documentation de [shallow](https://nuqs.47ng.com/docs/options#shallow) et [Throttles](https://nuqs.47ng.com/docs/options#throttling-url-updates) qui permet d'optimiser les changements de notre application.

2. Modifie le server components

Utilise les [searchParams](https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional) et la méthode de [cache de NUQS](https://nuqs.47ng.com/docs/server-side#cache).
