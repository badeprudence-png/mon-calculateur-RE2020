# CLAUDE.md — Calculateur de seuils RE2020

## Description du projet
Application web statique (HTML + CSS + JavaScript vanilla) permettant de calculer
les seuils réglementaires RE2020 : Bbiomax, Cep,nrmax, Cepmax, Icénergiemax,
Icconstructionmax et DHmax. Accessible sur Internet, sans backend.

## Sources réglementaires officielles
Toutes les formules et valeurs viennent UNIQUEMENT des fichiers du dossier specs/ :
- specs/chapitre1a3_annexe_r172-4_post-gtm2.pdf → texte consolidé de l'Annexe R.172-4 (source principale, inclut les décrets 2022-305, 2024-1258, 2026-16)
- specs/joe_20260320_0068_0026.pdf               → décret n°2026-16 du 15 janvier 2026 (JO du 20 mars 2026), bâtiments tertiaires spécifiques et industriels/artisanaux
- specs/zone climatique 0504.pdf                 → carte et tableau de référence des zones climatiques départementales (H1a, H1b, H1c, H2a, H2b, H2c, H2d, H3)
Ne jamais inventer une valeur réglementaire. Si une valeur est incertaine,
la marquer [À VALIDER].

## Structure du projet
- specs/   → PDFs réglementaires sources
- skills/  → fichiers de règles métier pour Claude Code
- app/     → application web (HTML, CSS, JavaScript)

## Stack technique
- HTML5 + CSS3 + JavaScript ES6 vanilla
- Zéro backend, zéro framework, zéro dépendance externe
- Page unique, déployable sur Netlify ou GitHub Pages

## Règles de comportement
- Toujours lire le PDF avant de coder une formule ou un coefficient
- Séparer données / règles / calculs / résultats
- Écrire tous les commentaires de code en français
- Chaque fonction de calcul doit citer sa source réglementaire
- Toute hypothèse doit être documentée et marquée [HYPOTHÈSE]

## Fichiers principaux à créer
- app/re2020-data.js      → toutes les tables de coefficients
- app/re2020-engine.js    → moteur de calcul
- app/re2020-calculateur.html → interface utilisateur

## Permissions
Claude Code peut lire, créer et modifier tous les fichiers du projet
sans demander confirmation à chaque opération.
