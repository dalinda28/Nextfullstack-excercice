## Context

On va créer une interface qui permet lister et de créer de nouveau projet.

## Step #1

Tu dois créer la server actions directement dans le Server Components qui permet de venir créer le projet. La Server Actions doit créer un projet liée à l'utilisateur actuellement connecté, pour ça tu peux utiliser [auth-helper.ts](../../../../src/lib/auth-helper.ts) qui permet avec la méthode `requiredAuth()` de récupérer l'utilisateur actuelle.
