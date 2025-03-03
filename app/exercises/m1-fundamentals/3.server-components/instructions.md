Tu dois récupérer les données de cette API :

- https://jsonplaceholder.typicode.com/users

Tu dois afficher une liste avec chacun des users. Il faut être capable de cliquer sur cette liste pour arriver sur une URL `/[userId]` dans laquelle tu vas pouvoir récupérer :

- https://jsonplaceholder.typicode.com/users/:userId

Et afficher d'autres informations sur l'utilisateur.

Attention :

- Il faut afficher un `loader` car on ne sait pas combien de temps ça prend pour récupérer les données.
- Il faut afficher un bouton pour revenir à la page précédente quand on va sur la page de l'utilisateur.
- Il faut afficher une erreur si on arrive sur une page qui n'existe pas.
