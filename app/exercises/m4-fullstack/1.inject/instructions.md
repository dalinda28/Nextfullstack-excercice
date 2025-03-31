## Context

Parfois tu souhaites **injecter des données** qui sont accessible uniquement côtés serveurs. Par exemple :

- le compte ou l'organization actuelle
- des données de la headers (le `referrer` ou le `userAgent`)
- etc...

Si tu souhaites le donnée à un Client Component il est possible d'utiliser les `props`.

Mais comment faire si tu veux que n'importe quel composant de notre application ai potentiellement accès à ces données sans avoir besoin de faire du "props drilling" de partout ?

On peut utiliser `Zustand` !

## Tâche

Tu dois :

1. Créer un store Zustand avec le type suivant :

```ts
import { userAgent } from "next/server";

interface Store {
  userAgent?: ReturnType<typeof userAgent>;
}
```

2. Créer un composant qui prends en paramètre "store" et qui définit le "store Zustand" avec ce même type
3. Utiliser ce compsoant dans le Layout pour intjecter les données du `userAgent`
4. Récupérer les données dans `user-agent.tsx`
