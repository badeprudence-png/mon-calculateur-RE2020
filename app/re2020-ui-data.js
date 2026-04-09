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
