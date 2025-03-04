# Intercepting Routes en Next.js

Dans cet exercice, nous allons explorer les **Intercepting Routes** en Next.js, une fonctionnalité puissante qui permet d'afficher une page dans un contexte différent selon la navigation.

## Objectif

Créer une application qui affiche une liste de projets et qui, lorsqu'on clique sur un projet:

- Affiche le projet dans une modal (Dialog) si on navigue depuis la liste
- Affiche le projet en pleine page si on accède directement à l'URL

## Concepts clés

1. **Intercepting Routes**: Permet d'intercepter une navigation et d'afficher un contenu différent
2. **Parallel Routes**: Permet de définir plusieurs "segments" dans une même page
3. **Dialog Component**: Utilisé pour afficher le contenu dans une fenêtre modale

## Structure des fichiers

```
/code
  /page.tsx                    # Liste des projets
  /[projectId]/page.tsx        # Page détaillée d'un projet
  /@modal/(.)([projectId])/page.tsx  # Version modale du projet (intercepting)
  /@modal/default.tsx          # Composant par défaut pour le modal
  /@modal/[...catchAll]/page.tsx     # Catch-all pour gérer les autres routes
  /layout.tsx                  # Layout qui inclut les parallel routes
```

## Comment ça fonctionne

1. Quand vous cliquez sur un projet depuis la liste, Next.js intercepte la navigation vers `/[projectId]` et affiche le contenu de `/@modal/(.)([projectId])` à la place
2. Si vous accédez directement à l'URL `/[projectId]`, vous verrez la page complète
3. Le préfixe `(.)` dans `(.)([projectId])` indique à Next.js d'intercepter uniquement les navigations depuis le même niveau

## À vous de jouer!

Explorez le code et essayez de comprendre comment les intercepting routes fonctionnent. Vous pouvez:

1. Modifier le style des cartes de projet
2. Ajouter de nouvelles fonctionnalités à la modal
3. Créer d'autres routes interceptées pour d'autres fonctionnalités

Bon codage!
