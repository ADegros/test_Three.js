# Test Technique - Simulateur 3D avec Three.js

Ce projet a été réalisé dans le cadre d'un test technique pour l'intégration d'une équipe travaillant sur un simulateur 3D.

## Installation et Lancement

Ce projet utilise [Vite](https://vitejs.dev/) comme outil de build, comme indiqué dans les recommandations de la documentation de Three.js (https://threejs.org/manual/#en/installation)

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/ADegros/test_Three.js.git
    ```

2. **Installation via npm :**
    ```bash
    npm install
    ```

3. **Lancement du serveur local :**
    ```bash
    npx vite
    ```

## Fonctionnalités implémentées

- **Canvas de taille fixe :** Configuration du canvas dans la taille proposée (900x800), modifiable en changeant les valeurs de ```canvaWidth``` et ```canvaHeight```
- **Géométries multiples :** Utilisation de ```PlaneGeometry``` pour le sol, ```CircleGeometry``` et ```RingGeometry``` pour les cercles au sol et ```SphereGeometry``` pour la sphère mobile.
- **Texture :** Application d'une texture répétée sur un ```MeshStandardMaterial``` pour le sol.
- **Animation en temps réel :** 
    - Déplacement circulaire et rotation de la sphère grâce à la trigonométrie
    - Déplacement circulaire et animation d'un modèle 3D (via ```AnimationMixer```)
- **Éclairage :** Combinaison d'une ```AmbientLight``` (éclairage global) et d'une ```DirectionalLight``` (éclairage directionnel)
- **Contrôles de la caméra :** Utilisation d'```OrbitControls``` pour permettre de se déplacer dans la scène grâce à la souris

## Bonus et initiatives

- **Ombres :** Activation du rendu des ombres sur les différents objets (dont le modèle 3D)
    - Ajustement de la zone de la caméra captant les ombres afin de capter les ombres de tous les objets (```directionalLight.shadow.camera.___ = ...```)
    - Augmentation de la résolution des ombres (```directionalLight.shadow.mapSize.width|height = 1024``` au lieu de ```512```)
- **Import d'un modèle 3D:** Utilisation d'un ```GLTFLoader``` pour importer un personnage
    - Le modèle 3D contenait une animation de marche qui comportait un déplacement (*Root Motion*) -> Modification du modèle sur ***Blender*** pour supprimer cette translation (*Animation In-Place*)

## Technologies utilisées :

- JavaScript
- Three.js
- Vite
