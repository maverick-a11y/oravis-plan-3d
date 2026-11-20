# Oravis Plan Événement 3D

Outil interne Oravis pour faire les plans 3D des événements clients (mobilier, tentes, guirlandes, récap du matériel).
Application web installable (ordinateur, Android, iPhone), qui fonctionne hors connexion après la première ouverture.

## Mettre en ligne avec GitHub Pages

1. Sur github.com, créez un dépôt (bouton **New**), par exemple `oravis-3d`.
   Choisissez **Private** si vous avez un compte payant ; sinon **Public** (le code sera visible, pas vos plans).
2. Dans le dépôt : **Add file → Upload files**, glissez **tout le contenu de ce zip**
   (les fichiers **et le dossier `vendor`**), puis **Commit changes**.
3. **Settings → Pages** : Source = **Deploy from a branch**, Branch = **main**, dossier **/ (root)**, **Save**.
4. Après 1 à 2 minutes, l'adresse s'affiche en haut de la page Pages :
   `https://VOTRE-COMPTE.github.io/oravis-3d/`

## Installer l'application

- **Ordinateur (Chrome / Edge)** : ouvrez l'adresse, icône « Installer » à droite de la barre d'adresse.
- **Android (Chrome)** : menu ⋮ → « Installer l'application ».
- **iPhone / iPad (Safari)** : bouton Partager → « Sur l'écran d'accueil ».

## Utilisation

- Les plans restent sur l'appareil (brouillon gardé automatiquement).
- **Exporter** télécharge le plan en `.json` pour l'envoyer à un collègue ; **Importer** l'ouvre.
- **Image** télécharge une image PNG du plan pour le client.

## Mettre à jour

Remplacez les fichiers du dépôt par ceux d'un nouveau zip (**Add file → Upload files**, mêmes noms).
Le dossier `vendor` (moteur 3D et polices, servis par le site lui-même) change rarement :
en général il suffit d'envoyer `index.html` et `sw.js`.
Les appareils récupèrent la nouvelle version à la prochaine ouverture avec connexion.

## Lien client

Le bouton **Lien client** crée un lien qui contient le plan ; le client l'ouvre dans son navigateur,
peut tourner et zoomer, sans rien modifier. Boutons d'envoi WhatsApp, e-mail et SMS intégrés.
