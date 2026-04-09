/**
 * re2020-ui-data.js — Données minimales côté client pour l'interface
 * Contient uniquement les libellés d'usage et les règles d'éligibilité CE3,
 * tels que définis dans les décrets publics. Aucun coefficient de calcul.
 *
 * Sources :
 *   - Décret n°2021-1004 du 29 juillet 2021  (usages 1-2)
 *   - Décret n°2022-305  du 1er mars 2022    (usages 3-5)
 *   - Décret n°2024-1258 du 30 décembre 2024 (usages 6-22, 26-27)
 *   - Décret n°2026-16   du 15 janvier 2026  (usages 23-25, 28)
 */
'use strict';

/* Libellés et dates d'entrée en vigueur RE2020 par usage */
const USAGES = {
  1:  { libelle: 'Maisons individuelles ou accolées',                                                                     dateEntreeVigueur: '2022-01-01' },
  2:  { libelle: 'Logements collectifs',                                                                                  dateEntreeVigueur: '2022-01-01' },
  3:  { libelle: 'Bureaux',                                                                                               dateEntreeVigueur: '2022-07-01' },
  4:  { libelle: 'Enseignement primaire',                                                                                 dateEntreeVigueur: '2022-07-01' },
  5:  { libelle: 'Enseignement secondaire',                                                                               dateEntreeVigueur: '2022-07-01' },
  6:  { libelle: 'Médiathèques et bibliothèques',                                                                         dateEntreeVigueur: '2026-05-01' },
  7:  { libelle: "Bâtiments universitaires d'enseignement et de recherche et bâtiments d'enseignements atypiques",        dateEntreeVigueur: '2026-05-01' },
  8:  { libelle: 'Hôtels 0, 1 et 2 étoiles (partie nuit)',                                                               dateEntreeVigueur: '2026-05-01' },
  9:  { libelle: 'Hôtels 3, 4 et 5 étoiles (partie nuit)',                                                               dateEntreeVigueur: '2026-05-01' },
  10: { libelle: 'Hôtels 0, 1 et 2 étoiles (partie jour)',                                                               dateEntreeVigueur: '2026-05-01' },
  11: { libelle: 'Hôtels 3, 4 et 5 étoiles (partie jour)',                                                               dateEntreeVigueur: '2026-05-01' },
  12: { libelle: "Établissements d'accueil de la petite enfance",                                                         dateEntreeVigueur: '2026-05-01' },
  13: { libelle: 'Restaurants – en continu, 18 heures par jour, 7 jours sur 7',                                          dateEntreeVigueur: '2026-05-01' },
  14: { libelle: 'Restaurants – 1 repas par jour, 5 jours sur 7',                                                        dateEntreeVigueur: '2026-05-01' },
  15: { libelle: 'Restaurants – 2 repas par jour, 7 jours sur 7',                                                        dateEntreeVigueur: '2026-05-01' },
  16: { libelle: 'Restaurants – 2 repas par jour, 6 jours sur 7',                                                        dateEntreeVigueur: '2026-05-01' },
  17: { libelle: 'Commerces',                                                                                             dateEntreeVigueur: '2026-05-01' },
  18: { libelle: 'Vestiaires seuls',                                                                                      dateEntreeVigueur: '2026-05-01' },
  19: { libelle: 'Établissements sanitaires avec hébergement',                                                            dateEntreeVigueur: '2026-05-01' },
  20: { libelle: 'Établissements de santé (partie nuit)',                                                                 dateEntreeVigueur: '2026-05-01' },
  21: { libelle: 'Établissements de santé (partie jour)',                                                                 dateEntreeVigueur: '2026-05-01' },
  22: { libelle: 'Aérogares',                                                                                             dateEntreeVigueur: '2026-05-01' },
  23: { libelle: 'Industries ou artisanats 3×8h',                                                                        dateEntreeVigueur: '2026-05-01' },
  24: { libelle: 'Industries ou artisanats 8h à 18h',                                                                    dateEntreeVigueur: '2026-05-01' },
  25: { libelle: 'Établissements sportifs municipaux ou scolaires',                                                       dateEntreeVigueur: '2026-05-01' },
  26: { libelle: 'Restaurants scolaires – 1 repas par jour, 5 jours sur 7',                                              dateEntreeVigueur: '2026-05-01' },
  27: { libelle: 'Restaurants scolaires – 3 repas par jour, 5 jours sur 7',                                              dateEntreeVigueur: '2026-05-01' },
  28: { libelle: 'Établissements sportifs privés',                                                                        dateEntreeVigueur: '2026-05-01' },
};

/* Usages éligibles à la catégorie CE3 — Décret n°2026-16, Chap. V */
const USAGES_CE3     = new Set([3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 21]);
const USAGES_CE3_IGH = new Set([3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);

/* ─── Fonctions utilitaires UI ───────────────────────────────────────────────
   Copies des fonctions de re2020-data.js nécessaires à l'interface (badges,
   visibilité des champs). Aucun coefficient de calcul.
   Source : Annexe R.172-4, Chap. III §§ I-III */

/* Retourne la clé de période Icconstruction (4 périodes) */
function getPlagePeriode(anneePC) {
  if (anneePC >= 2022 && anneePC <= 2024) return '2022-2024';
  if (anneePC >= 2025 && anneePC <= 2027) return '2025-2027';
  if (anneePC >= 2028 && anneePC <= 2030) return '2028-2030';
  return '2031+';
}

/* Retourne la clé de période Icénergie (3 périodes) */
function getPlagePeriodeIcenergie(anneePC) {
  if (anneePC >= 2022 && anneePC <= 2024) return '2022-2024';
  if (anneePC >= 2025 && anneePC <= 2027) return '2025-2027';
  return '2028+';
}

/* Présence d'un effet BR2/BR3 sur Bbio par usage (pour affichage du champ bruit).
   Usages 1 et 2 : BR2BR3 est un objet (non nul) → champ visible.
   Usages 3-28   : BR2BR3 = 0 → champ masqué. */
const MBBRUIT = {
  1:  { BR2BR3: { H2d: 0.10, H3: 0.10 } },
  2:  { BR2BR3: { H1c: 0.10, H2c: 0.10, H2d: 0.20, H3: 0.20 } },
  3:  { BR2BR3: 0 },  4:  { BR2BR3: 0 },  5:  { BR2BR3: 0 },
  6:  { BR2BR3: 0 },  7:  { BR2BR3: 0 },  8:  { BR2BR3: 0 },
  9:  { BR2BR3: 0 },  10: { BR2BR3: 0 },  11: { BR2BR3: 0 },
  12: { BR2BR3: 0 },  13: { BR2BR3: 0 },  14: { BR2BR3: 0 },
  15: { BR2BR3: 0 },  16: { BR2BR3: 0 },  17: { BR2BR3: 0 },
  18: { BR2BR3: 0 },  19: { BR2BR3: 0 },  20: { BR2BR3: 0 },
  21: { BR2BR3: 0 },  22: { BR2BR3: 0 },  23: { BR2BR3: 0 },
  24: { BR2BR3: 0 },  25: { BR2BR3: 0 },  26: { BR2BR3: 0 },
  27: { BR2BR3: 0 },  28: { BR2BR3: 0 },
};

/* Présence d'un seuil DH_max par usage (pour affichage du champ climatisation).
   Tous les usages 1-28 ont un seuil DH ou une formule. */
const DH_MAXCAT = { 1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true,
  9:true,10:true,11:true,12:true,13:true,14:true,15:true,16:true,17:true,
  18:true,19:true,20:true,21:true,22:true,23:true,24:true,25:true,26:true,
  27:true,28:true };

/* Présence d'un seuil Icconstruction_max par usage (pour affichage de la section ICC).
   Tous les usages 1-28 ont un seuil. */
const ICCONSTRUCTION_MAX_MOYEN = { 1:true,2:true,3:true,4:true,5:true,6:true,
  7:true,8:true,9:true,10:true,11:true,12:true,13:true,14:true,15:true,
  16:true,17:true,18:true,19:true,20:true,21:true,22:true,23:true,24:true,
  25:true,26:true,27:true,28:true };
