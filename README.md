auteurs
# Projet Angular - Janvier 2024

## Auteurs du projet

[Sawsen El Bahri - TP2]
[Théo Stringat - TP2]

## Credentials

liste des identifiants et mots de passe pour les utilisateurs de l'application :
- administrateur : login : user1, password : password1
- utilisateur : login : user2, password : password2
- utilisateur : login : user3, password : password3

## Fonctionnalités

- [X] Au moins 1000 assignments dans la base de données

- [X] Ajouter une gestion de login/password
    - [X] Vous ajouter dans la toolbar un formulaire login/password + bouton connexion. Une fois loggué, le formulaire disparait et seul un bouton de deconnexion apparait.
    - [X] Si on est loggué en tant que user autorisé on a le droit de modifier / ajouter un assignment. Si on est loggué en admin on pourra en plus supprimer des assignments. Si on n'est pas loggué on ne peut que consulter.
    - [X] AVANCE : Cas mieux (mais pas mal de travail sur back-end): en créant une collection Utilisateurs dans MongoDB, et en validant que le user/password est correct. 
    - [ ] AVANCE++ : Encore mieux: regardez comment utiliser l'authentification à l'aide de Json Web Tokens (JWT), en suivant par exemple ce tutoriel.   
    
- [X] Ajouter de nouvelles propriétés au modèle des Assignments
    - [X] Vous ajouterez dans la définition des assignments : 
    - [X] Auteur (nom de l'élève)
    - [X] Matière (Base de données, Technologies Web, Grails, etc.)
    - [X] Une image sera associée à chaque matière et une photo du prof
    - [X] Note sur 20, on ne peut marquer "rendu" un Assignment qui n'a pas été noté
    - [X] Remarques sur l'assignment 
    - [X] APPROCHE FACILE : on ajoute des propriétés au modèle des Assignments (dans le front-end et dans le back-end). On n'ajoute pas de nouvelle collection à la base de données. C'est ce que je recommande pour la plupart d'entre vous.
    - [X] APPROCHE AVANCEE : vous ajoutez une collection "matières" et/ou "élève" mais évidemment cela impactera plus le back end et cela représente beaucoup de travail par rapport au reste de ce qui est demandé, c'est donc une solution optionnelle pour les meilleurs d'entre vous.

- [ ] : Améliorer l'affichage des Assignments
    - [X] Vous afficherez les assignments dans une table angular material. A vous de voir si vous arrivez à la rendre triable, avec ligne des headers fixe (qui ne scrolle pas), avec la pagination. Ajoutez un moyen pour avoir une vue de détail sur un assignment.
    - [X] OPTIONNEL : pour la pagination vous pouvez regarder pour utiliser le composant Paginator de angular material.
    - [ ] Regardez les tables avec datasource, c'est encore plus simple.
    - [X] La vue détails montrera en plus les remarques, la note s'il a été rendu, la photo du prof, etc.
    - [X] Les formulaires d'ajout et de détails proposeront un choix fixe de matières (et associeront automatiquement le prof et l'image illustrant la matière) 
    - [X] OPTIONNEL : Ajouter un filtre rendu/non rendu : Selon que cette case est cochée ou pas le tableau affichera uniquement les assignments rendus ou non rendus. 
    - [X] OPTIONNEL : Ajouter un champ de recherche sur le nom de l'assignment qui enverra une requête et affichera les résultats correspondants à la recherche. 
    - [ ] OPTIONNEL (mais simple à faire): utiliser un Formulaire de type Stepper (formulaire en plusieurs étapes) pour l'ajout d'Assignments (éventuellement pour la modification) 

- [X] Rendre le tout plus joli, essayez de ne pas tous faire la même chose. Je recommande une toolbar en haut, une sidebar sur le côté

- [ ] Hébergement sur Heroku.com ou render.com

## Répartition des tâches

