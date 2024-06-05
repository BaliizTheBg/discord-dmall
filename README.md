ReadME

Dmall
Description : Un outil puissant pour envoyer des messages en masse à tous les membres d'un serveur Discord, sauf ceux ayant désactivé les messages privés.
Fonctionnalités
* Modes de DM :
    * Mode Normal : Envoi rapide de messages (moins d'une seconde entre chaque utilisateur).
    * Mode Temporisé : Délai de 3 à 9 secondes entre chaque message pour minimiser le risque de signalement de spam par Discord.
* Sécurité : Contournement des drapeaux anti-spam de Discord.
* Exclusion d'IDs : Possibilité d'exclure certains IDs des envois de messages.
* Journalisation : Fichier de journal pour suivre les messages envoyés.
* Résumé Webhook : Utilisation d'un webhook pour recevoir un résumé des messages envoyés.
* Limite de messages : Définir une limite maximale de messages à envoyer.
* Envoi par lot : Envoi de messages en lots pour une gestion plus efficace.
Prérequis
* Node.js
* npm (installé avec Node.js)
* Un éditeur de texte (par exemple, VS Code, Sublime Text).
Installation
1. Cloner le dépôt :shCopy codegit clone https://github.com/BaliizTheBg/massdm.git
2. cd massdm
3. 
4. Installer les dépendances :shCopy codenpm install
5. 
6. Configurer le bot : Mettez votre jeton de bot et le message dans le fichier settings.json :jsonCopy code{
7.   "token": "VOTRE_BOT_TOKEN",
8.   "message": {
9.     "content": "Votre message ici"
10.   },
11.   "owner": "VOTRE_ID_PROPRIÉTAIRE",
12.   "exclude_ids": ["ID1", "ID2"],
13.   "message_limit": 1000,
14.   "batch_size": 10
15. }
16. 
Utilisation
1. Démarrer le script :shCopy codenpm start
2. 
3. Choisir le mode :
    * Tapez 1 pour le mode Normal.
    * Tapez 2 pour le mode Temporisé.


Exclusion d'IDs
Vous pouvez exclure certains utilisateurs de la réception des messages en ajoutant leurs IDs dans le tableau exclude_ids dans settings.json.
Journalisation
Les messages envoyés seront enregistrés dans un fichier journal nommé log.txt pour suivre les activités de DM.
Résumé Webhook
Un résumé des messages envoyés sera envoyé à un webhook spécifié dans settings.json. Assurez-vous de configurer correctement webhookId et webhookToken.
Limite de Messages
Vous pouvez définir une limite maximale de messages à envoyer en configurant message_limit dans settings.json.
Envoi par Lot
Les messages peuvent être envoyés par lots pour une gestion plus efficace en configurant batch_size dans settings.json.
Fonctionnement
Le bot crée un tableau contenant tous les objets GuildMember. Ensuite, il extrait l'ID utilisateur de chaque objet GuildMember et envoie un message privé à chacun. Le bot a besoin des permissions d'administrateur pour fonctionner correctement.
Remarque
* Activer les intentions de la passerelle privilégiée :
    * Allez dans Dev Portal > Bot > Privileged Gateway Intents et activez les deux intentions.
* Autorisation requise : Votre bot doit avoir l'autorisation "Administrateur".
Clause de Non-Responsabilité
Cet outil est conçu à des fins éducatives et de preuve de concept. L'auteur n'est pas responsable de toute action illégale ou de toute violation des conditions d'utilisation administrées par un tiers.
Problèmes et Solutions
Si le mode normal est utilisé, votre bot risque d'être signalé par Discord. Pour résoudre ce problème :
* Faites appel via ce formulaire en sélectionnant "Appeal an Action Trust and Safety take on my bot".
* Créez un nouveau bot si nécessaire.
Les bots non vérifiés ne peuvent pas envoyer de messages en masse à des serveurs de plus de 1000 membres. Assurez-vous que votre bot est vérifié pour envoyer des messages en masse à des serveurs de plus de 1000 membres.
Contact
* Discord : baliizphp
* GitHub : BaliizTheBg
