/**
 * re2020-data.js — Tables réglementaires RE2020
 * Source : Annexe à l'article R.172-4 (fichier specs/chapitre1a3_annexe_r172-4_post-gtm2.pdf)
 * Décrets de référence :
 *   - n°2021-1004 du 29 juillet 2021  (RE2020 initial – usages 1 et 2)
 *   - n°2022-305  du 1er mars 2022    (extension – usages 3, 4, 5)
 *   - n°2024-1258 du 30 décembre 2024 (extension – usages 6 à 22 et 26-27)
 *   - n°2026-16   du 15 janvier 2026  (extension – usages 23, 24, 25, 28)
 */

'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 — TYPOLOGIES D'USAGE
// Chapitre III, §I (Bbio) et §II (Cep), §III (Icconstruction)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Identifiants officiels des usages RE2020.
 * dateEntreeVigueur : date minimale de dépôt de PC pour être soumis à la RE2020.
 * Sources des dates : décrets n°2021-1004, 2022-305 et 2026-16.
 */
const USAGES = {
  1:  { libelle: 'Maisons individuelles ou accolées',                                    dateEntreeVigueur: '2022-01-01' },
  2:  { libelle: 'Logements collectifs',                                                 dateEntreeVigueur: '2022-01-01' },
  3:  { libelle: 'Bureaux',                                                              dateEntreeVigueur: '2022-07-01' },
  4:  { libelle: 'Enseignement primaire',                                                dateEntreeVigueur: '2022-07-01' },
  5:  { libelle: 'Enseignement secondaire',                                              dateEntreeVigueur: '2022-07-01' },
  6:  { libelle: 'Médiathèques et bibliothèques',                                        dateEntreeVigueur: '2026-05-01' },
  7:  { libelle: "Bâtiments universitaires d'enseignement et de recherche et bâtiments d'enseignements atypiques", dateEntreeVigueur: '2026-05-01' },
  8:  { libelle: 'Hôtels 0, 1 et 2 étoiles (partie nuit)',                               dateEntreeVigueur: '2026-05-01' },
  9:  { libelle: 'Hôtels 3, 4 et 5 étoiles (partie nuit)',                               dateEntreeVigueur: '2026-05-01' },
  10: { libelle: 'Hôtels 0, 1 et 2 étoiles (partie jour)',                               dateEntreeVigueur: '2026-05-01' },
  11: { libelle: 'Hôtels 3, 4 et 5 étoiles (partie jour)',                               dateEntreeVigueur: '2026-05-01' },
  12: { libelle: "Établissements d'accueil de la petite enfance",                        dateEntreeVigueur: '2026-05-01' },
  13: { libelle: 'Restaurants – en continu, 18 heures par jour, 7 jours sur 7',          dateEntreeVigueur: '2026-05-01' },
  14: { libelle: 'Restaurants – 1 repas par jour, 5 jours sur 7',                        dateEntreeVigueur: '2026-05-01' },
  15: { libelle: 'Restaurants – 2 repas par jour, 7 jours sur 7',                        dateEntreeVigueur: '2026-05-01' },
  16: { libelle: 'Restaurants – 2 repas par jour, 6 jours sur 7',                        dateEntreeVigueur: '2026-05-01' },
  17: { libelle: 'Commerces',                                                            dateEntreeVigueur: '2026-05-01' },
  18: { libelle: 'Vestiaires seuls',                                                     dateEntreeVigueur: '2026-05-01' },
  19: { libelle: 'Établissements sanitaires avec hébergement',                           dateEntreeVigueur: '2026-05-01' },
  20: { libelle: 'Établissements de santé (partie nuit)',                                dateEntreeVigueur: '2026-05-01' },
  21: { libelle: 'Établissements de santé (partie jour)',                                dateEntreeVigueur: '2026-05-01' },
  22: { libelle: 'Aérogares',                                                            dateEntreeVigueur: '2026-05-01' },
  23: { libelle: 'Industries ou artisanats 3×8h',                                        dateEntreeVigueur: '2026-05-01' },
  24: { libelle: 'Industries ou artisanats 8h à 18h',                                   dateEntreeVigueur: '2026-05-01' },
  25: { libelle: 'Établissements sportifs municipaux ou scolaires',                      dateEntreeVigueur: '2026-05-01' },
  26: { libelle: 'Restaurants scolaires – 1 repas par jour, 5 jours sur 7',             dateEntreeVigueur: '2026-05-01' },
  27: { libelle: 'Restaurants scolaires – 3 repas par jour, 5 jours sur 7',             dateEntreeVigueur: '2026-05-01' },
  28: { libelle: 'Établissements sportifs privés',                                       dateEntreeVigueur: '2026-05-01' },
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 — BBIO_MAXMOYEN
// Chapitre III, §I — tableau "Valeur de Bbio_maxmoyen"
// ─────────────────────────────────────────────────────────────────────────────

/** Bbio_maxmoyen en points, indexé par numéro d'usage. Source : Chap. III §I */
const BBIO_MAX_MOYEN = {
  1:  63,
  2:  65,
  3:  95,
  4:  68, // enseignement primaire (même valeur que secondaire)
  5:  68, // enseignement secondaire
  6:  117,
  7:  122,
  8:  76,  // hôtels 0,1,2* nuit
  9:  76,  // hôtels 3,4,5* nuit
  10: 134, // hôtels 0,1,2* jour
  11: 163, // hôtels 3,4,5* jour
  12: 139,
  13: 245,
  14: 100,
  15: 206,
  16: 177,
  17: 170,
  18: 225,
  19: 174,
  20: 164,
  21: 133,
  22: 248,
  23: 257,
  24: 69,
  25: 94,  // sportifs municipaux ou scolaires
  26: 76,  // restaurants scolaires 1 repas/5j
  27: 116, // restaurants scolaires 3 repas/5j
  28: 94,  // sportifs privés (même valeur que 25)
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 — MBGEO (modulation Bbio selon zone/altitude)
// Chapitre III §I — tableaux par usage
// Structure : MBGEO[usage][trancheAlt][zone]
//   trancheAlt : 'inf400' | '400a800' | 'sup800'
//   zone       : 'H1a'|'H1b'|'H1c'|'H2a'|'H2b'|'H2c'|'H2d'|'H3'
// ─────────────────────────────────────────────────────────────────────────────

const MBGEO = {
  // — Usage 1 : Maisons individuelles ou accolées —
  1: {
    inf400:  { H1a: 0.15, H1b: 0.20, H1c: 0.20, H2a: -0.05, H2b:  0.00, H2c: -0.10, H2d:  0.05, H3: -0.10 },
    '400a800': { H1a: 0.40, H1b: 0.50, H1c: 0.45, H2a:  0.15, H2b:  0.30, H2c:  0.05, H2d:  0.10, H3: -0.05 },
    sup800:  { H1a: 0.75, H1b: 0.85, H1c: 0.75, H2a:  0.55, H2b:  0.65, H2c:  0.35, H2d:  0.25, H3:  0.10 },
  },
  // — Usage 2 : Logements collectifs —
  2: {
    inf400:  { H1a: 0.10, H1b: 0.20, H1c: 0.15, H2a: -0.10, H2b:  0.00, H2c: -0.10, H2d:  0.00, H3: -0.10 },
    '400a800': { H1a: 0.40, H1b: 0.50, H1c: 0.45, H2a:  0.20, H2b:  0.30, H2c:  0.10, H2d:  0.20, H3: -0.05 },
    sup800:  { H1a: 0.80, H1b: 0.85, H1c: 0.75, H2a:  0.60, H2b:  0.65, H2c:  0.40, H2d:  0.40, H3:  0.15 },
  },
  // — Usage 3 : Bureaux —
  3: {
    inf400:  { H1a: 0.05, H1b: 0.10, H1c: 0.20, H2a: -0.05, H2b:  0.00, H2c:  0.10, H2d:  0.30, H3:  0.25 },
    '400a800': { H1a: 0.25, H1b: 0.25, H1c: 0.20, H2a:  0.20, H2b:  0.20, H2c:  0.10, H2d:  0.10, H3: -0.05 },
    sup800:  { H1a: 0.45, H1b: 0.45, H1c: 0.40, H2a:  0.40, H2b:  0.35, H2c:  0.25, H2d:  0.30, H3:  0.10 },
  },
  // — Usages 4 et 5 : Enseignement primaire et secondaire (même Mbgéo) —
  4: {
    inf400:  { H1a: 0.10, H1b: 0.20, H1c: 0.25, H2a: -0.10, H2b:  0.00, H2c:  0.05, H2d:  0.50, H3:  0.50 },
    '400a800': { H1a: 0.25, H1b: 0.30, H1c: 0.25, H2a:  0.05, H2b:  0.10, H2c:  0.00, H2d:  0.35, H3:  0.25 },
    sup800:  { H1a: 0.45, H1b: 0.45, H1c: 0.40, H2a:  0.30, H2b:  0.35, H2c:  0.20, H2d:  0.30, H3:  0.20 },
  },
  5: null, // même table que usage 4 — géré dans getMbgeo()
  // — Usage 6 : Médiathèques et bibliothèques —
  6: {
    inf400:  { H1a: 0.05, H1b: 0.20, H1c: 0.25, H2a: -0.10, H2b:  0.00, H2c:  0.00, H2d:  0.30, H3:  0.20 },
    '400a800': { H1a: 0.20, H1b: 0.30, H1c: 0.30, H2a:  0.00, H2b:  0.10, H2c:  0.00, H2d:  0.25, H3:  0.15 },
    sup800:  { H1a: 0.40, H1b: 0.50, H1c: 0.40, H2a:  0.15, H2b:  0.30, H2c:  0.10, H2d:  0.25, H3:  0.15 },
  },
  // — Usage 7 : Bâtiments universitaires et enseignements atypiques —
  7: {
    inf400:  { H1a: 0.10, H1b: 0.20, H1c: 0.20, H2a: -0.05, H2b:  0.00, H2c:  0.00, H2d:  0.20, H3:  0.20 },
    '400a800': { H1a: 0.30, H1b: 0.35, H1c: 0.35, H2a:  0.10, H2b:  0.20, H2c:  0.05, H2d:  0.25, H3:  0.15 },
    sup800:  { H1a: 0.50, H1b: 0.60, H1c: 0.50, H2a:  0.30, H2b:  0.40, H2c:  0.20, H2d:  0.25, H3:  0.15 },
  },
  // — Usages 8 et 9 : Hôtels nuit (0-2* et 3-5* ont le même Mbgéo à <400 m et 400-800 m) —
  8: {
    inf400:  { H1a: 0.15, H1b: 0.20, H1c: 0.20, H2a:  0.00, H2b:  0.00, H2c: -0.10, H2d:  0.00, H3: -0.15 },
    '400a800': { H1a: 0.45, H1b: 0.45, H1c: 0.40, H2a:  0.25, H2b:  0.30, H2c:  0.15, H2d:  0.15, H3: -0.05 },
    sup800:  { H1a: 0.75, H1b: 0.80, H1c: 0.70, H2a:  0.60, H2b:  0.60, H2c:  0.40, H2d:  0.40, H3:  0.15 },
  },
  9: {
    inf400:  { H1a: 0.15, H1b: 0.20, H1c: 0.20, H2a:  0.00, H2b:  0.00, H2c: -0.10, H2d:  0.00, H3: -0.15 },
    '400a800': { H1a: 0.45, H1b: 0.45, H1c: 0.40, H2a:  0.25, H2b:  0.30, H2c:  0.15, H2d:  0.15, H3: -0.05 },
    sup800:  { H1a: 0.75, H1b: 0.75, H1c: 0.65, H2a:  0.60, H2b:  0.60, H2c:  0.40, H2d:  0.40, H3:  0.15 },
  },
  // — Usage 10 : Hôtels 0,1,2* partie jour —
  10: {
    inf400:  { H1a: 0.10, H1b: 0.15, H1c: 0.25, H2a: -0.10, H2b:  0.00, H2c:  0.00, H2d:  0.35, H3:  0.25 },
    '400a800': { H1a: 0.25, H1b: 0.30, H1c: 0.35, H2a:  0.05, H2b:  0.15, H2c:  0.05, H2d:  0.30, H3:  0.15 },
    sup800:  { H1a: 0.45, H1b: 0.55, H1c: 0.50, H2a:  0.30, H2b:  0.35, H2c:  0.20, H2d:  0.35, H3:  0.15 },
  },
  // — Usage 11 : Hôtels 3,4,5* partie jour —
  11: {
    inf400:  { H1a: 0.05, H1b: 0.15, H1c: 0.20, H2a: -0.10, H2b:  0.00, H2c: -0.05, H2d:  0.25, H3:  0.10 },
    '400a800': { H1a: 0.25, H1b: 0.30, H1c: 0.30, H2a:  0.10, H2b:  0.15, H2c:  0.05, H2d:  0.25, H3:  0.10 },
    sup800:  { H1a: 0.45, H1b: 0.50, H1c: 0.45, H2a:  0.30, H2b:  0.35, H2c:  0.20, H2d:  0.30, H3:  0.15 },
  },
  // — Usage 12 : Établissements d'accueil de la petite enfance —
  12: {
    inf400:  { H1a: 0.10, H1b: 0.15, H1c: 0.10, H2a:  0.00, H2b:  0.00, H2c: -0.10, H2d:  0.10, H3:  0.00 },
    '400a800': { H1a: 0.25, H1b: 0.30, H1c: 0.25, H2a:  0.15, H2b:  0.20, H2c:  0.05, H2d:  0.10, H3:  0.05 },
    sup800:  { H1a: 0.45, H1b: 0.50, H1c: 0.40, H2a:  0.40, H2b:  0.40, H2c:  0.25, H2d:  0.25, H3:  0.15 },
  },
  // — Usage 13 : Restaurants – continu 18h/7j —
  13: {
    inf400:  { H1a: 0.05, H1b: 0.10, H1c: 0.20, H2a: -0.05, H2b:  0.00, H2c:  0.05, H2d:  0.25, H3:  0.15 },
    '400a800': { H1a: 0.15, H1b: 0.20, H1c: 0.25, H2a:  0.05, H2b:  0.10, H2c:  0.05, H2d:  0.25, H3:  0.15 },
    sup800:  { H1a: 0.30, H1b: 0.35, H1c: 0.35, H2a:  0.20, H2b:  0.25, H2c:  0.15, H2d:  0.30, H3:  0.15 },
  },
  // — Usage 14 : Restaurants – 1 repas/5j —
  // — Usage 14 : Restaurants – 1 repas/5j — SOURCE : Chap. III §I, tableau p. 17
  14: {
    inf400:    { H1a: 0.10, H1b: 0.15, H1c: 0.20, H2a:  0.00, H2b:  0.00, H2c: -0.05, H2d:  0.20, H3:  0.10 },
    '400a800': { H1a: 0.30, H1b: 0.35, H1c: 0.30, H2a:  0.20, H2b:  0.20, H2c:  0.05, H2d:  0.20, H3:  0.15 },
    sup800:    { H1a: 0.55, H1b: 0.55, H1c: 0.50, H2a:  0.45, H2b:  0.45, H2c:  0.25, H2d:  0.30, H3:  0.20 },
  },
  // — Usage 15 : Restaurants – 2 repas/7j — SOURCE : Chap. III §I, tableau p. 18
  15: {
    inf400:    { H1a: 0.05, H1b: 0.10, H1c: 0.15, H2a: -0.05, H2b:  0.00, H2c:  0.00, H2d:  0.15, H3:  0.10 },
    '400a800': { H1a: 0.20, H1b: 0.25, H1c: 0.25, H2a:  0.10, H2b:  0.15, H2c:  0.05, H2d:  0.20, H3:  0.10 },
    sup800:    { H1a: 0.35, H1b: 0.40, H1c: 0.35, H2a:  0.25, H2b:  0.30, H2c:  0.15, H2d:  0.25, H3:  0.15 },
  },
  // — Usage 16 : Restaurants – 2 repas/6j — SOURCE : Chap. III §I, tableau p. 18
  16: {
    inf400:    { H1a: 0.05, H1b: 0.15, H1c: 0.15, H2a: -0.05, H2b:  0.00, H2c:  0.00, H2d:  0.20, H3:  0.10 },
    '400a800': { H1a: 0.20, H1b: 0.25, H1c: 0.25, H2a:  0.05, H2b:  0.15, H2c:  0.05, H2d:  0.20, H3:  0.15 },
    sup800:    { H1a: 0.35, H1b: 0.40, H1c: 0.35, H2a:  0.25, H2b:  0.30, H2c:  0.15, H2d:  0.30, H3:  0.20 },
  },
  // — Usage 17 : Commerces — SOURCE : Chap. III §I, tableau p. 19
  17: {
    inf400:    { H1a: 0.05, H1b: 0.10, H1c: 0.15, H2a: -0.05, H2b:  0.00, H2c:  0.05, H2d:  0.30, H3:  0.25 },
    '400a800': { H1a: 0.10, H1b: 0.20, H1c: 0.20, H2a:  0.00, H2b:  0.10, H2c:  0.00, H2d:  0.25, H3:  0.20 },
    sup800:    { H1a: 0.20, H1b: 0.30, H1c: 0.25, H2a:  0.15, H2b:  0.20, H2c:  0.10, H2d:  0.25, H3:  0.20 },
  },
  // — Usage 18 : Vestiaires seuls — SOURCE : Chap. III §I, tableau p. 20
  18: {
    inf400:    { H1a: 0.05, H1b: 0.10, H1c: 0.10, H2a: -0.05, H2b:  0.00, H2c: -0.10, H2d:  0.00, H3: -0.10 },
    '400a800': { H1a: 0.30, H1b: 0.30, H1c: 0.25, H2a:  0.20, H2b:  0.25, H2c:  0.05, H2d:  0.10, H3:  0.00 },
    sup800:    { H1a: 0.55, H1b: 0.55, H1c: 0.50, H2a:  0.45, H2b:  0.50, H2c:  0.30, H2d:  0.25, H3:  0.15 },
  },
  // — Usage 19 : Établissements sanitaires avec hébergement — SOURCE : Chap. III §I, tableau p. 21
  19: {
    inf400:    { H1a: 0.10, H1b: 0.15, H1c: 0.15, H2a: -0.05, H2b:  0.00, H2c: -0.05, H2d:  0.05, H3: -0.05 },
    '400a800': { H1a: 0.25, H1b: 0.30, H1c: 0.25, H2a:  0.15, H2b:  0.15, H2c:  0.10, H2d:  0.10, H3: -0.05 },
    sup800:    { H1a: 0.45, H1b: 0.50, H1c: 0.45, H2a:  0.30, H2b:  0.35, H2c:  0.25, H2d:  0.20, H3:  0.05 },
  },
  // — Usage 20 : Établissements de santé (partie nuit) — SOURCE : Chap. III §I, tableau p. 21
  20: {
    inf400:    { H1a: 0.05, H1b: 0.15, H1c: 0.20, H2a: -0.05, H2b:  0.00, H2c:  0.00, H2d:  0.20, H3:  0.10 },
    '400a800': { H1a: 0.25, H1b: 0.30, H1c: 0.30, H2a:  0.15, H2b:  0.20, H2c:  0.10, H2d:  0.25, H3:  0.10 },
    sup800:    { H1a: 0.45, H1b: 0.50, H1c: 0.45, H2a:  0.35, H2b:  0.40, H2c:  0.25, H2d:  0.35, H3:  0.20 },
  },
  // — Usage 21 : Établissements de santé (partie jour) — SOURCE : Chap. III §I, tableau p. 22
  21: {
    inf400:    { H1a: 0.05, H1b: 0.15, H1c: 0.20, H2a: -0.05, H2b:  0.00, H2c:  0.00, H2d:  0.25, H3:  0.20 },
    '400a800': { H1a: 0.15, H1b: 0.20, H1c: 0.20, H2a:  0.05, H2b:  0.05, H2c:  0.00, H2d:  0.20, H3:  0.10 },
    sup800:    { H1a: 0.25, H1b: 0.30, H1c: 0.25, H2a:  0.15, H2b:  0.20, H2c:  0.10, H2d:  0.15, H3:  0.10 },
  },
  // — Usage 22 : Aérogares — SOURCE : Chap. III §I, tableau pp. 22-23
  22: {
    inf400:    { H1a: 0.05, H1b: 0.10, H1c: 0.15, H2a: -0.05, H2b:  0.00, H2c:  0.05, H2d:  0.20, H3:  0.20 },
    '400a800': { H1a: 0.10, H1b: 0.15, H1c: 0.20, H2a:  0.00, H2b:  0.10, H2c:  0.05, H2d:  0.20, H3:  0.15 },
    sup800:    { H1a: 0.05, H1b: 0.15, H1c:-0.05, H2a:  0.00, H2b:  0.10, H2c:  0.25, H2d:  0.25, H3:  0.05 }, // SOURCE : Chap. III §I, tableau p. 22-23
  },
  // — Usage 23 : Industries 3×8h — SOURCE : Chap. III §I, tableau p. 24
  23: {
    inf400:    { H1a: 0.05, H1b: 0.05, H1c: 0.10, H2a: -0.05, H2b:  0.00, H2c:  0.05, H2d:  0.25, H3:  0.25 },
    '400a800': { H1a: 0.05, H1b: 0.10, H1c: 0.10, H2a:  0.00, H2b:  0.05, H2c:  0.05, H2d:  0.20, H3:  0.15 },
    sup800:    { H1a: 0.10, H1b: 0.15, H1c: 0.15, H2a:  0.05, H2b:  0.10, H2c:  0.05, H2d:  0.20, H3:  0.10 },
  },
  // — Usage 24 : Industries 8h-18h — SOURCE : Chap. III §I, tableau p. 25
  24: {
    inf400:    { H1a: 0.10, H1b: 0.15, H1c: 0.25, H2a: -0.05, H2b:  0.00, H2c:  0.05, H2d:  0.40, H3:  0.35 },
    '400a800': { H1a: 0.20, H1b: 0.25, H1c: 0.30, H2a:  0.05, H2b:  0.10, H2c:  0.05, H2d:  0.40, H3:  0.30 },
    sup800:    { H1a: 0.35, H1b: 0.40, H1c: 0.45, H2a:  0.20, H2b:  0.25, H2c:  0.15, H2d:  0.35, H3:  0.25 },
  },
  // — Usages 25 et 28 : Établissements sportifs (même tableau) — SOURCE : Chap. III §I, tableau p. 25
  25: {
    inf400:    { H1a: 0.00, H1b: 0.10, H1c: 0.25, H2a: -0.15, H2b:  0.00, H2c:  0.10, H2d:  0.55, H3:  0.55 },
    '400a800': { H1a: 0.00, H1b: 0.05, H1c: 0.15, H2a: -0.15, H2b: -0.05, H2c: -0.05, H2d:  0.40, H3:  0.30 },
    sup800:    { H1a: 0.05, H1b: 0.10, H1c: 0.15, H2a: -0.05, H2b:  0.00, H2c: -0.05, H2d:  0.25, H3:  0.15 },
  },
  // — Usage 26 : Restaurants scolaires – 1 repas/5j — SOURCE : Chap. III §I, tableau p. 26
  26: {
    inf400:    { H1a: 0.15, H1b: 0.20, H1c: 0.15, H2a: -0.05, H2b:  0.00, H2c: -0.05, H2d:  0.10, H3:  0.10 },
    '400a800': { H1a: 0.35, H1b: 0.40, H1c: 0.35, H2a:  0.20, H2b:  0.25, H2c:  0.10, H2d:  0.20, H3:  0.10 },
    sup800:    { H1a: 0.65, H1b: 0.65, H1c: 0.60, H2a:  0.50, H2b:  0.55, H2c:  0.35, H2d:  0.35, H3:  0.25 },
  },
  // — Usage 27 : Restaurants scolaires – 3 repas/5j — SOURCE : Chap. III §I, tableau p. 26-27
  27: {
    inf400:    { H1a: 0.10, H1b: 0.15, H1c: 0.15, H2a: -0.05, H2b:  0.00, H2c: -0.05, H2d:  0.10, H3:  0.10 },
    '400a800': { H1a: 0.30, H1b: 0.35, H1c: 0.30, H2a:  0.15, H2b:  0.20, H2c:  0.10, H2d:  0.20, H3:  0.10 },
    sup800:    { H1a: 0.55, H1b: 0.55, H1c: 0.50, H2a:  0.45, H2b:  0.45, H2c:  0.30, H2d:  0.35, H3:  0.20 },
  },
  // — Usage 28 : Établissements sportifs privés — SOURCE : Chap. III §I, tableau p. 25 (même que usage 25)
  28: null, // null = même table que usage 25 — géré dans getMbgeo()
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4 — MBSURF_MOY (modulation Bbio selon surface moyenne logements)
// Chapitre III §I — formules tabulées par usage
// Résultat exprimé en fraction de Bbio_maxmoyen : valeur_tableau / Bbio_maxmoyen
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calcule Mbsurf_moy pour un usage donné.
 * @param {number} usage      - numéro d'usage
 * @param {number} smoylgt    - surface moyenne des logements (m²)
 * @param {number} bbioMoyen  - Bbio_maxmoyen de l'usage
 * @returns {number} coefficient Mbsurf_moy (0 si sans objet)
 * Source : Chap. III §I, tableaux de modulation Mbsurf_moy
 */
function calcMbsurfMoy(usage, smoylgt, bbioMoyen) {
  switch (usage) {
    case 1: { // Maisons individuelles — Chap. III §I, tableau MI
      let num;
      if (smoylgt <= 100)       num = 49 - 0.49 * smoylgt;
      else if (smoylgt <= 150)  num = 18 - 0.18 * smoylgt;
      else                       num = -9;
      return num / bbioMoyen;
    }
    case 2: { // Logements collectifs — Chap. III §I, tableau LC
      let num;
      if (smoylgt <= 80)        num = -6 + 0.10 * smoylgt;
      else if (smoylgt <= 120)  num = -2 + 0.05 * smoylgt;
      else                       num = 4;
      return num / bbioMoyen;
    }
    default:
      return 0; // Sans objet pour les autres usages
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5 — MBSURF_TOT (modulation Bbio selon surface totale de référence)
// Chapitre III §I — tableaux par usage
// Pour bureaux : dépend de l'année du PC (périodes réglementaires)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calcule Mbsurf_tot pour un usage donné.
 * @param {number} usage    - numéro d'usage
 * @param {number} sref     - surface de référence du bâtiment (m²)
 * @param {number} anneePC  - année de dépôt du permis de construire
 * @param {string} [sousUsage] - 'primaire' ou 'secondaire' pour usage 4/5
 * @returns {number} coefficient Mbsurf_tot
 * Source : Chap. III §I, tableaux Mbsurf_tot par usage
 */
function calcMbsurfTot(usage, sref, anneePC, sousUsage) {
  const plage = getPlagePeriode(anneePC);

  switch (usage) {
    case 1: // Maisons individuelles — Mbsurf_tot = 0
      return 0;

    case 2: { // Logements collectifs — Chap. III §I tableau LC
      if (sref <= 1300) return (19.5 - 0.015 * sref) / BBIO_MAX_MOYEN[2];
      return 0;
    }

    case 3: { // Bureaux — Chap. III §I, tableau Bureaux (3 périodes)
      // Les formules bureaux suivent 3 périodes ('2022-2024'|'2025-2027'|'2028+'),
      // alignées sur getPlagePeriodeIcenergie et non sur getPlagePeriode (4 périodes).
      const plage3 = getPlagePeriodeIcenergie(anneePC);
      if (sref <= 500) {
        return (24 - 0.06 * sref) / BBIO_MAX_MOYEN[3];
      } else if (sref <= 4000) {
        const formules = {
          '2022-2024': -5.55 - 0.0009 * sref,
          '2025-2027': -4.90 - 0.0022 * sref,
          '2028+':     -3.80 - 0.0044 * sref,
        };
        return formules[plage3] / BBIO_MAX_MOYEN[3];
      } else if (sref <= 10000) {
        const formules = {
          '2022-2024': -5.55 - 0.0009 * sref,
          '2025-2027': -9.70 - 0.0010 * sref,
          '2028+':    -21.40,
        };
        const val = formules[plage3];
        const caps = { '2022-2024': -14.55, '2025-2027': -19.7, '2028+': -21.4 };
        return Math.max(val, caps[plage3]) / BBIO_MAX_MOYEN[3];
      } else {
        return 0;
      }
    }

    case 4: { // Enseignement primaire — Chap. III §I, tableau Ens. primaire
      if (sref <= 500)       return (35 - 0.05 * sref) / BBIO_MAX_MOYEN[4];
      else if (sref <= 1000) return (20 - 0.02 * sref) / BBIO_MAX_MOYEN[4];
      return 0;
    }

    case 5: { // Enseignement secondaire — Chap. III §I, tableau Ens. secondaire
      if (sref <= 1000) return (45 - 0.045 * sref) / BBIO_MAX_MOYEN[5];
      return 0;
    }

    default:
      return 0; // Mbsurf_tot = 0 pour tous les autres usages (Chap. III §I)
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 6 — MBBRUIT (modulation Bbio selon exposition au bruit)
// Chapitre III §I — tableaux par usage
// Zones de bruit définies au Chapitre V
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Mbbruit indexé par usage, puis zone de bruit ('BR1'|'BR2BR3'|'cat3').
 * Pour les usages à tableau zonal, valeur unique (pire cas) ou lookup zone.
 * Source : Chap. III §I, tableaux Mbbruit par usage
 *
 * Convention :
 *   - BR1     = zone de bruit 1 (faible)
 *   - BR2BR3  = zones de bruit 2 ou 3
 *   - cat3    = catégorie acoustique 3 (bâtiment très exposé)
 */
/**
 * MBBRUIT — modulation Bbio_max selon l'exposition au bruit.
 * Structure : { BR1, BR2BR3, cat3 } où chaque valeur peut être :
 *   - un scalaire (valeur unique quelle que soit la zone climatique)
 *   - un objet { H1a, H1b, H1c, H2a, H2b, H2c, H2d, H3 } (valeur zonale)
 *   - null (modulateur non défini pour cette combinaison)
 * Utiliser getMbbruit(usage, cleBruit, zone) pour obtenir la valeur finale.
 * Source : Chap. III §I, tableaux Mbbruit par usage
 */
const MBBRUIT = {
  // Maisons individuelles — Chap. III §I : table zonale BR2/BR3 (p.7 du PDF)
  1: {
    BR1:    0,
    BR2BR3: { H1a: 0, H1b: 0, H1c: 0, H2a: 0, H2b: 0, H2c: 0, H2d: 0.10, H3: 0.10 },
    cat3:   null, // pas de catégorie 3 pour les MI
  },

  // Logements collectifs — Chap. III §I : table zonale BR2/BR3 (p.8 du PDF)
  2: {
    BR1:    0,
    BR2BR3: { H1a: 0, H1b: 0, H1c: 0.10, H2a: 0, H2b: 0, H2c: 0.10, H2d: 0.20, H3: 0.20 },
    cat3:   null, // pas de catégorie 3 pour les LC
  },

  // Bureaux — Chap. III §I (p.9) : BR1=0, BR2/3=0, cat3=0,40
  3: { BR1: 0, BR2BR3: 0, cat3: 0.40 },

  // Enseignement primaire/secondaire — Chap. III §I (p.10) : Mbbruit = 0
  4: { BR1: 0, BR2BR3: 0, cat3: 0 },
  5: { BR1: 0, BR2BR3: 0, cat3: 0 },

  // Médiathèques — Chap. III §I (p.11) : cat3 zonale
  6: {
    BR1: 0, BR2BR3: 0,
    cat3: { H1a: 0.15, H1b: 0.10, H1c: 0.10, H2a: 0.15, H2b: 0.15, H2c: 0.20, H2d: 0.10, H3: 0.15 },
  },

  // Bâtiments universitaires — Chap. III §I (p.11) : cat3 zonale
  7: {
    BR1: 0, BR2BR3: 0,
    cat3: { H1a: 0.10, H1b: 0.05, H1c: 0.10, H2a: 0.10, H2b: 0.15, H2c: 0.20, H2d: 0.10, H3: 0.15 },
  },

  // Hôtels nuit (8,9) — Chap. III §I (pp.12-13) : BR1=0, BR2/3=0, cat3=0,05
  8:  { BR1: 0, BR2BR3: 0, cat3: 0.05 },
  9:  { BR1: 0, BR2BR3: 0, cat3: 0.05 },

  // Hôtels jour (10,11) — Chap. III §I (pp.14-15) : BR1=0, BR2/3=0, cat3=0,30
  10: { BR1: 0, BR2BR3: 0, cat3: 0.30 },
  11: { BR1: 0, BR2BR3: 0, cat3: 0.30 },

  // EAPE — Chap. III §I (p.16) : cat3 zonale
  12: {
    BR1: 0, BR2BR3: 0,
    cat3: { H1a: 0.05, H1b: 0.10, H1c: 0.15, H2a: 0.10, H2b: 0.15, H2c: 0.20, H2d: 0.25, H3: 0.30 },
  },

  // Restaurants continu — Chap. III §I (p.17) : Mbbruit = 0
  13: { BR1: 0, BR2BR3: 0, cat3: 0 },

  // Usages 14–16 : restaurants — Chap. III §I (pp.17-19) : Mbbruit = 0
  14: { BR1: 0, BR2BR3: 0, cat3: 0 },
  15: { BR1: 0, BR2BR3: 0, cat3: 0 },
  16: { BR1: 0, BR2BR3: 0, cat3: 0 },

  // Commerces — Chap. III §I (p.20) : cat3=0,20
  17: { BR1: 0, BR2BR3: 0, cat3: 0.20 },

  // Usages 18–28 : Mbbruit = 0 (confirmé pp.21-28 du PDF)
  18: { BR1: 0, BR2BR3: 0, cat3: 0 },
  19: { BR1: 0, BR2BR3: 0, cat3: 0 },
  20: { BR1: 0, BR2BR3: 0, cat3: 0 },
  21: { BR1: 0, BR2BR3: 0, cat3: 0 },
  22: { BR1: 0, BR2BR3: 0, cat3: 0 },
  23: { BR1: 0, BR2BR3: 0, cat3: 0 },
  24: { BR1: 0, BR2BR3: 0, cat3: 0 },
  25: { BR1: 0, BR2BR3: 0, cat3: 0 },
  26: { BR1: 0, BR2BR3: 0, cat3: 0 },
  27: { BR1: 0, BR2BR3: 0, cat3: 0 },
  28: { BR1: 0, BR2BR3: 0, cat3: 0 },
};

/**
 * Retourne la valeur de Mbbruit pour un usage, une zone de bruit et une zone climatique.
 * Gère les valeurs scalaires et les tables zonales.
 * @param {number} usage     - numéro d'usage
 * @param {string} cleBruit  - 'BR1' | 'BR2BR3' | 'cat3'
 * @param {string} zone      - zone climatique (ex. 'H1a', 'H3')
 * @returns {number}
 * Source : Chap. III §I, tableaux Mbbruit
 */
function getMbbruit(usage, cleBruit, zone) {
  const entree = MBBRUIT[usage];
  if (!entree) return 0;
  const valeur = entree[cleBruit];
  if (valeur === null || valeur === undefined) return 0;
  if (typeof valeur === 'object') return valeur[zone] ?? 0;
  return valeur;
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 7 — CEP,NR_MAXMOYEN et CEP_MAXMOYEN
// Chapitre III §II — tableau "Valeurs de Cep,nr_maxmoyen et Cep_maxmoyen"
// Unité : kWhep/(m².an)
// ─────────────────────────────────────────────────────────────────────────────

/** Cep,nr_maxmoyen en kWhep/(m².an). Source : Chap. III §II */
const CEP_NR_MAX_MOYEN = {
  1:  55,
  2:  70,
  3:  75,
  4:  65,
  5:  63,
  6:  93,
  7:  102,
  8:  121,
  9:  118,
  10: 235,
  11: 234,
  12: 150,
  13: 282,
  14: 132,
  15: 219,
  16: 214,
  17: 163,
  18: 242,
  19: 190,
  20: 274,
  21: 165,
  22: 191,
  23: 290,
  24: 94,
  25: 94,
  26: 119,
  27: 153,
  28: 112,
};

/** Cep_maxmoyen en kWhep/(m².an). Source : Chap. III §II */
const CEP_MAX_MOYEN = {
  1:  75,
  2:  85,
  3:  85,
  4:  72,
  5:  72,
  6:  105,
  7:  112,
  8:  144,
  9:  138,
  10: 252,
  11: 281,
  12: 182,
  13: 578,
  14: 275,
  15: 446,
  16: 412,
  17: 182,
  18: 306,
  19: 252,
  20: 302,
  21: 180,
  22: 253,
  23: 365,
  24: 116,
  25: 116,
  26: 251,
  27: 329,
  28: 148,
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 8 — ICENERGIE_MAXMOYEN
// Chapitre III §II — tableau par usage, année de PC et raccordement RCU
// Unité : kg éq. CO2/m²
// Clés de période : '2022-2024' | '2025-2027' | '2028+'
// Clé RCU : 'rcu' (raccordé réseau de chaleur urbain) | 'autres'
// Valeur null = pas d'exigence pour cette combinaison
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Icénergie_maxmoyen en kg éq. CO2/m².
 * Source : Chap. III §II, tableaux Icénergie_maxmoyen (pp. 29-32)
 * Note spéciale MI : valeur 280 possible si conditions parcelle gaz (art. transitoire)
 */
const ICENERGIE_MAX_MOYEN = {
  1:  { '2022-2024': { rcu: 200, autres: 160 }, '2025-2027': { rcu: 200, autres: 160 }, '2028+': { rcu: 160, autres: 160 } },
  2:  { '2022-2024': { rcu: 560, autres: 560 }, '2025-2027': { rcu: 320, autres: 260 }, '2028+': { rcu: 260, autres: 260 } },
  3:  { '2022-2024': { rcu: 280, autres: 200 }, '2025-2027': { rcu: 200, autres: 200 }, '2028+': { rcu: 200, autres: 200 } },
  4:  { '2022-2024': { rcu: 240, autres: 240 }, '2025-2027': { rcu: 200, autres: 140 }, '2028+': { rcu: 140, autres: 140 } },
  5:  { '2022-2024': { rcu: 240, autres: 240 }, '2025-2027': { rcu: 200, autres: 140 }, '2028+': { rcu: 140, autres: 140 } },
  6:  { '2022-2024': { rcu: 360, autres: null }, '2025-2027': { rcu: 285, autres: 285 }, '2028+': { rcu: 285, autres: 285 } },
  7:  { '2022-2024': { rcu: null, autres: null }, '2025-2027': { rcu: 190, autres: 190 }, '2028+': { rcu: 190, autres: 190 } },
  8:  { '2022-2024': { rcu: null, autres: null }, '2025-2027': { rcu: 390, autres: 390 }, '2028+': { rcu: 390, autres: 390 } },
  9:  { '2022-2024': { rcu: null, autres: null }, '2025-2027': { rcu: 350, autres: 350 }, '2028+': { rcu: 350, autres: 350 } },
  10: { '2022-2024': { rcu: null, autres: null }, '2025-2027': { rcu: 495, autres: 495 }, '2028+': { rcu: 495, autres: 495 } },
  11: { '2022-2024': { rcu: null, autres: null }, '2025-2027': { rcu: 520, autres: 520 }, '2028+': { rcu: 520, autres: 520 } },
  12: { '2022-2024': { rcu: 895, autres: null }, '2025-2027': { rcu: 680, autres: 680 }, '2028+': { rcu: 680, autres: 680 } },
  13: { '2022-2024': { rcu: 670, autres: null }, '2025-2027': { rcu: 570, autres: 570 }, '2028+': { rcu: 570, autres: 570 } },
  14: { '2022-2024': { rcu: 605, autres: null }, '2025-2027': { rcu: 470, autres: 470 }, '2028+': { rcu: 470, autres: 470 } },
  15: { '2022-2024': { rcu: 705, autres: null }, '2025-2027': { rcu: 570, autres: 570 }, '2028+': { rcu: 570, autres: 570 } },
  16: { '2022-2024': { rcu: 675, autres: null }, '2025-2027': { rcu: 545, autres: 545 }, '2028+': { rcu: 545, autres: 545 } },
  17: { '2022-2024': { rcu: 315, autres: null }, '2025-2027': { rcu: 315, autres: 315 }, '2028+': { rcu: 315, autres: 315 } },
  18: { '2022-2024': { rcu: 1460, autres: null }, '2025-2027': { rcu: 1120, autres: 585 }, '2028+': { rcu: 1120, autres: 585 } },
  19: { '2022-2024': { rcu: 1155, autres: null }, '2025-2027': { rcu: 890,  autres: 330 }, '2028+': { rcu: 890,  autres: 330 } },
  20: { '2022-2024': { rcu: 575,  autres: null }, '2025-2027': { rcu: 490,  autres: 320 }, '2028+': { rcu: 490,  autres: 320 } },
  21: { '2022-2024': { rcu: 615,  autres: null }, '2025-2027': { rcu: 365,  autres: 230 }, '2028+': { rcu: 365,  autres: 230 } },
  22: { '2022-2024': { rcu: 290,  autres: null }, '2025-2027': { rcu: 260,  autres: 260 }, '2028+': { rcu: 260,  autres: 260 } },
  23: { '2022-2024': { rcu: null, autres: null }, '2025-2027': { rcu: 315,  autres: 315 }, '2028+': { rcu: 315,  autres: 315 } },
  24: { '2022-2024': { rcu: null, autres: null }, '2025-2027': { rcu: 110,  autres: 110 }, '2028+': { rcu: 110,  autres: 110 } },
  25: { '2022-2024': { rcu: null, autres: null }, '2025-2027': { rcu: 265,  autres: 150 }, '2028+': { rcu: 265,  autres: 150 } },
  26: { '2022-2024': { rcu: null, autres: null }, '2025-2027': { rcu: 445,  autres: 445 }, '2028+': { rcu: 445,  autres: 445 } },
  27: { '2022-2024': { rcu: null, autres: null }, '2025-2027': { rcu: 485,  autres: 485 }, '2028+': { rcu: 485,  autres: 485 } },
  28: { '2022-2024': { rcu: null, autres: null }, '2025-2027': { rcu: 420,  autres: 190 }, '2028+': { rcu: 420,  autres: 190 } },
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 9 — MCGEO (modulation Cep selon zone/altitude)
// Chapitre III §II — tableaux Mcgéo par usage
// Structure identique à MBGEO
// ─────────────────────────────────────────────────────────────────────────────

const MCGEO = {
  // — Usage 1 : Maisons individuelles —
  1: {
    inf400:  { H1a: 0.10, H1b: 0.15, H1c: 0.10, H2a: -0.05, H2b:  0.00, H2c: -0.10, H2d: -0.10, H3: -0.15 },
    '400a800': { H1a: 0.40, H1b: 0.50, H1c: 0.40, H2a:  0.15, H2b:  0.30, H2c:  0.05, H2d:  0.00, H3: -0.10 },
    sup800:  { H1a: 0.75, H1b: 0.85, H1c: 0.75, H2a:  0.55, H2b:  0.60, H2c:  0.35, H2d:  0.25, H3:  0.15 },
  },
  // — Usage 2 : Logements collectifs —
  2: {
    inf400:  { H1a: 0.05, H1b: 0.05, H1c: 0.05, H2a: -0.10, H2b:  0.00, H2c: -0.15, H2d: -0.10, H3: -0.15 }, // Source : Chap. III §II, tableau p. 34
    '400a800': { H1a: 0.35, H1b: 0.40, H1c: 0.35, H2a:  0.20, H2b:  0.20, H2c:  0.05, H2d:  0.05, H3: -0.10 },
    sup800:  { H1a: 0.55, H1b: 0.65, H1c: 0.55, H2a:  0.45, H2b:  0.50, H2c:  0.30, H2d:  0.30, H3:  0.15 },
  },
  // — Usage 3 : Bureaux —
  3: {
    inf400:  { H1a: 0.05, H1b: 0.10, H1c: 0.10, H2a:  0.00, H2b:  0.00, H2c:  0.00, H2d:  0.15, H3:  0.15 },
    '400a800': { H1a: 0.20, H1b: 0.25, H1c: 0.20, H2a:  0.15, H2b:  0.15, H2c:  0.05, H2d:  0.10, H3: -0.05 },
    sup800:  { H1a: 0.35, H1b: 0.40, H1c: 0.35, H2a:  0.35, H2b:  0.30, H2c:  0.20, H2d:  0.25, H3:  0.10 },
  },
  // — Usages 4/5 : Enseignement primaire et secondaire —
  4: {
    inf400:  { H1a: 0.05, H1b: 0.15, H1c: 0.10, H2a: -0.05, H2b:  0.00, H2c: -0.05, H2d:  0.40, H3:  0.30 },
    '400a800': { H1a: 0.30, H1b: 0.30, H1c: 0.30, H2a:  0.15, H2b:  0.20, H2c:  0.10, H2d:  0.30, H3:  0.10 },
    sup800:  { H1a: 0.60, H1b: 0.60, H1c: 0.60, H2a:  0.45, H2b:  0.50, H2c:  0.35, H2d:  0.35, H3:  0.15 },
  },
  5: null, // même que 4 — géré dans getMcgeo()
  // — Usage 6 : Médiathèques —
  6: {
    inf400:  { H1a: 0.10, H1b: 0.15, H1c: 0.10, H2a: -0.05, H2b:  0.00, H2c: -0.05, H2d:  0.15, H3:  0.05 },
    '400a800': { H1a: 0.25, H1b: 0.30, H1c: 0.20, H2a:  0.10, H2b:  0.15, H2c:  0.05, H2d:  0.10, H3:  0.00 },
    sup800:  { H1a: 0.50, H1b: 0.45, H1c: 0.40, H2a:  0.35, H2b:  0.35, H2c:  0.20, H2d:  0.20, H3:  0.05 },
  },
  // — Usage 7 : Bâtiments universitaires — SOURCE : Chap. III §II, tableau p. 37
  7: {
    inf400:    { H1a: 0.05, H1b: 0.10, H1c: 0.10, H2a: -0.05, H2b:  0.00, H2c:  0.00, H2d:  0.20, H3:  0.15 },
    '400a800': { H1a: 0.10, H1b: 0.15, H1c: 0.15, H2a:  0.00, H2b:  0.05, H2c:  0.00, H2d:  0.10, H3:  0.05 },
    sup800:    { H1a: 0.20, H1b: 0.20, H1c: 0.20, H2a:  0.10, H2b:  0.10, H2c:  0.10, H2d:  0.10, H3:  0.00 },
  },
  // — Usages 8 et 9 : Hôtels nuit (0-2* et 3-5* ont le même Mcgéo) — SOURCE : Chap. III §II, tableaux pp. 38-39
  8: {
    inf400:    { H1a: 0.10, H1b: 0.10, H1c: 0.10, H2a:  0.00, H2b:  0.00, H2c:  0.00, H2d:  0.05, H3:  0.00 },
    '400a800': { H1a: 0.20, H1b: 0.25, H1c: 0.20, H2a:  0.10, H2b:  0.15, H2c:  0.10, H2d:  0.15, H3:  0.05 },
    sup800:    { H1a: 0.35, H1b: 0.35, H1c: 0.35, H2a:  0.25, H2b:  0.25, H2c:  0.20, H2d:  0.25, H3:  0.10 },
  },
  9: null, // SOURCE : Chap. III §II, tableau p. 39 — même valeurs que usage 8 — géré dans getMcgeo()
  // — Usage 10 : Hôtels 0,1,2* partie jour — SOURCE : Chap. III §II, tableau p. 39
  10: {
    inf400:    { H1a: 0.05, H1b: 0.10, H1c: 0.10, H2a: -0.05, H2b:  0.00, H2c:  0.05, H2d:  0.15, H3:  0.10 },
    '400a800': { H1a: 0.10, H1b: 0.15, H1c: 0.15, H2a:  0.00, H2b:  0.05, H2c:  0.05, H2d:  0.15, H3:  0.10 },
    sup800:    { H1a: 0.20, H1b: 0.20, H1c: 0.20, H2a:  0.10, H2b:  0.15, H2c:  0.10, H2d:  0.15, H3:  0.05 },
  },
  // — Usage 11 : Hôtels 3,4,5* partie jour — SOURCE : Chap. III §II, tableau p. 40
  11: {
    inf400:    { H1a: 0.05, H1b: 0.10, H1c: 0.10, H2a:  0.00, H2b:  0.00, H2c:  0.00, H2d:  0.10, H3:  0.10 },
    '400a800': { H1a: 0.10, H1b: 0.15, H1c: 0.15, H2a:  0.05, H2b:  0.05, H2c:  0.05, H2d:  0.10, H3:  0.05 },
    sup800:    { H1a: 0.20, H1b: 0.25, H1c: 0.20, H2a:  0.15, H2b:  0.15, H2c:  0.10, H2d:  0.15, H3:  0.05 },
  },
  // — Usage 12 : EAPE — SOURCE : Chap. III §II, tableau p. 41
  12: {
    inf400:    { H1a: 0.10, H1b: 0.10, H1c: 0.10, H2a:  0.00, H2b:  0.00, H2c: -0.05, H2d:  0.05, H3: -0.05 },
    '400a800': { H1a: 0.25, H1b: 0.25, H1c: 0.25, H2a:  0.20, H2b:  0.20, H2c:  0.10, H2d:  0.10, H3:  0.00 },
    sup800:    { H1a: 0.45, H1b: 0.40, H1c: 0.40, H2a:  0.35, H2b:  0.35, H2c:  0.25, H2d:  0.25, H3:  0.15 },
  },
  // — Usage 13 : Restaurants continu 18h/7j — SOURCE : Chap. III §II, tableau p. 42
  13: {
    inf400:    { H1a: 0.00, H1b: 0.05, H1c: 0.10, H2a: -0.05, H2b:  0.00, H2c:  0.05, H2d:  0.20, H3:  0.15 },
    '400a800': { H1a: 0.10, H1b: 0.10, H1c: 0.10, H2a:  0.00, H2b:  0.05, H2c:  0.05, H2d:  0.15, H3:  0.05 },
    sup800:    { H1a: 0.20, H1b: 0.20, H1c: 0.15, H2a:  0.10, H2b:  0.15, H2c:  0.10, H2d:  0.15, H3:  0.05 },
  },
  // — Usage 14 : Restaurants 1 repas/5j — SOURCE : Chap. III §II, tableau p. 43
  14: {
    inf400:    { H1a: 0.10, H1b: 0.10, H1c: 0.05, H2a:  0.00, H2b:  0.00, H2c: -0.05, H2d:  0.05, H3: -0.05 },
    '400a800': { H1a: 0.25, H1b: 0.25, H1c: 0.20, H2a:  0.15, H2b:  0.20, H2c:  0.05, H2d:  0.10, H3:  0.00 },
    sup800:    { H1a: 0.40, H1b: 0.40, H1c: 0.35, H2a:  0.35, H2b:  0.35, H2c:  0.20, H2d:  0.20, H3:  0.05 },
  },
  // — Usage 15 : Restaurants 2 repas/7j — SOURCE : Chap. III §II, tableau p. 44
  15: {
    inf400:    { H1a: 0.05, H1b: 0.10, H1c: 0.05, H2a: -0.05, H2b:  0.00, H2c:  0.00, H2d:  0.15, H3:  0.10 },
    '400a800': { H1a: 0.10, H1b: 0.10, H1c: 0.10, H2a:  0.05, H2b:  0.05, H2c:  0.05, H2d:  0.10, H3:  0.05 },
    sup800:    { H1a: 0.15, H1b: 0.20, H1c: 0.15, H2a:  0.10, H2b:  0.15, H2c:  0.05, H2d:  0.10, H3:  0.05 },
  },
  // — Usage 16 : Restaurants 2 repas/6j — SOURCE : Chap. III §II, tableau p. 45
  16: {
    inf400:    { H1a: 0.05, H1b: 0.10, H1c: 0.10, H2a: -0.05, H2b:  0.00, H2c:  0.00, H2d:  0.10, H3:  0.05 },
    '400a800': { H1a: 0.15, H1b: 0.20, H1c: 0.15, H2a:  0.10, H2b:  0.10, H2c:  0.05, H2d:  0.10, H3:  0.00 },
    sup800:    { H1a: 0.30, H1b: 0.30, H1c: 0.25, H2a:  0.20, H2b:  0.25, H2c:  0.15, H2d:  0.15, H3:  0.05 },
  },
  // — Usage 17 : Commerces — SOURCE : Chap. III §II, tableau p. 45-46
  17: {
    inf400:    { H1a: 0.00, H1b: 0.05, H1c: 0.10, H2a: -0.05, H2b:  0.00, H2c:  0.05, H2d:  0.20, H3:  0.20 },
    '400a800': { H1a: 0.00, H1b: 0.10, H1c: 0.10, H2a: -0.05, H2b:  0.05, H2c:  0.05, H2d:  0.15, H3:  0.15 },
    sup800:    { H1a: 0.05, H1b: 0.10, H1c: 0.10, H2a:  0.00, H2b:  0.05, H2c:  0.05, H2d:  0.10, H3:  0.10 },
  },
  // — Usage 18 : Vestiaires seuls — SOURCE : Chap. III §II, tableau p. 46
  18: {
    inf400:    { H1a: 0.05, H1b: 0.10, H1c: 0.05, H2a:  0.00, H2b:  0.00, H2c: -0.05, H2d:  0.00, H3: -0.05 },
    '400a800': { H1a: 0.15, H1b: 0.15, H1c: 0.15, H2a:  0.10, H2b:  0.15, H2c:  0.05, H2d:  0.05, H3: -0.05 },
    sup800:    { H1a: 0.30, H1b: 0.30, H1c: 0.30, H2a:  0.25, H2b:  0.25, H2c:  0.15, H2d:  0.15, H3:  0.05 },
  },
  // — Usage 19 : Établissements sanitaires — SOURCE : Chap. III §II, tableau p. 47
  19: {
    inf400:    { H1a: 0.10, H1b: 0.10, H1c: 0.05, H2a:  0.00, H2b:  0.00, H2c: -0.05, H2d:  0.00, H3: -0.05 },
    '400a800': { H1a: 0.25, H1b: 0.25, H1c: 0.20, H2a:  0.15, H2b:  0.15, H2c:  0.10, H2d:  0.10, H3: -0.05 },
    sup800:    { H1a: 0.40, H1b: 0.40, H1c: 0.35, H2a:  0.30, H2b:  0.35, H2c:  0.20, H2d:  0.25, H3:  0.10 },
  },
  // — Usage 20 : Établissements de santé (nuit) — SOURCE : Chap. III §II, tableau p. 48
  20: {
    inf400:    { H1a: 0.05, H1b: 0.05, H1c: 0.10, H2a:  0.00, H2b:  0.00, H2c:  0.05, H2d:  0.10, H3:  0.10 },
    '400a800': { H1a: 0.05, H1b: 0.10, H1c: 0.10, H2a:  0.05, H2b:  0.05, H2c:  0.05, H2d:  0.10, H3:  0.05 },
    sup800:    { H1a: 0.10, H1b: 0.15, H1c: 0.15, H2a:  0.10, H2b:  0.10, H2c:  0.10, H2d:  0.10, H3:  0.05 },
  },
  // — Usage 21 : Établissements de santé (jour) — SOURCE : Chap. III §II, tableau p. 49
  21: {
    inf400:    { H1a: 0.05, H1b: 0.10, H1c: 0.10, H2a: -0.05, H2b:  0.00, H2c: -0.05, H2d:  0.10, H3:  0.10 },
    '400a800': { H1a: 0.15, H1b: 0.15, H1c: 0.15, H2a:  0.10, H2b:  0.10, H2c:  0.05, H2d:  0.15, H3:  0.10 },
    sup800:    { H1a: 0.30, H1b: 0.35, H1c: 0.30, H2a:  0.25, H2b:  0.25, H2c:  0.15, H2d:  0.20, H3:  0.20 },
  },
  // — Usage 22 : Aérogares — SOURCE : Chap. III §II, tableau p. 50 (extraction partielle)
  22: {
    inf400:    { H1a:-0.05, H1b: 0.00, H1c: 0.05, H2a: -0.05, H2b:  0.00, H2c:  0.00, H2d:  0.10, H3:  0.10 },
    '400a800': { H1a:-0.05, H1b: 0.00, H1c: 0.05, H2a: -0.10, H2b:  0.10, H2c:  0.20, H2d:  0.25, H3:  0.00 }, // Source : Chap. III §II, tableau p. 50
    sup800:    { H1a: 0.05, H1b: 0.10, H1c:-0.05, H2a:  0.00, H2b:  0.05, H2c:  0.15, H2d:  0.15, H3:  0.00 }, // SOURCE : Chap. III §II, tableau p. 50
  },
  // — Usage 23 : Industries 3×8h — SOURCE : Chap. III §II, tableau p. 51
  23: {
    inf400:    { H1a: 0.05, H1b: 0.05, H1c: 0.10, H2a: -0.05, H2b:  0.00, H2c:  0.05, H2d:  0.15, H3:  0.15 },
    '400a800': { H1a: 0.05, H1b: 0.05, H1c: 0.10, H2a:  0.00, H2b:  0.05, H2c:  0.05, H2d:  0.10, H3:  0.10 },
    sup800:    { H1a: 0.10, H1b: 0.15, H1c: 0.15, H2a:  0.05, H2b:  0.10, H2c:  0.05, H2d:  0.10, H3:  0.05 },
  },
  // — Usage 24 : Industries 8h-18h — SOURCE : Chap. III §II, tableau p. 52
  24: {
    inf400:    { H1a: 0.05, H1b: 0.10, H1c: 0.10, H2a: -0.05, H2b:  0.00, H2c:  0.00, H2d:  0.20, H3:  0.15 },
    '400a800': { H1a: 0.15, H1b: 0.15, H1c: 0.20, H2a:  0.05, H2b:  0.10, H2c:  0.05, H2d:  0.15, H3:  0.10 },
    sup800:    { H1a: 0.25, H1b: 0.30, H1c: 0.30, H2a:  0.20, H2b:  0.20, H2c:  0.10, H2d:  0.20, H3:  0.10 },
  },
  // — Usage 25 : Établissements sportifs municipaux/scolaires — SOURCE : Chap. III §II, tableau p. 52-53
  25: {
    inf400:    { H1a: 0.00, H1b: 0.10, H1c: 0.10, H2a: -0.10, H2b:  0.00, H2c:  0.00, H2d:  0.40, H3:  0.25 },
    '400a800': { H1a: 0.05, H1b: 0.10, H1c: 0.05, H2a: -0.05, H2b:  0.00, H2c: -0.05, H2d:  0.20, H3:  0.05 },
    sup800:    { H1a: 0.10, H1b: 0.15, H1c: 0.10, H2a:  0.05, H2b:  0.10, H2c:  0.00, H2d:  0.10, H3:  0.00 },
  },
  // — Usage 26 : Restaurants scolaires 1 repas/5j — SOURCE : Chap. III §II, tableau p. 53
  26: {
    inf400:    { H1a: 0.10, H1b: 0.10, H1c: 0.05, H2a:  0.00, H2b:  0.00, H2c: -0.05, H2d: -0.05, H3: -0.15 },
    '400a800': { H1a: 0.25, H1b: 0.25, H1c: 0.20, H2a:  0.20, H2b:  0.20, H2c:  0.10, H2d:  0.05, H3: -0.05 },
    sup800:    { H1a: 0.45, H1b: 0.45, H1c: 0.40, H2a:  0.35, H2b:  0.40, H2c:  0.25, H2d:  0.20, H3:  0.10 },
  },
  // — Usage 27 : Restaurants scolaires 3 repas/5j — SOURCE : Chap. III §II, tableau p. 54
  27: {
    inf400:    { H1a: 0.05, H1b: 0.10, H1c: 0.05, H2a:  0.00, H2b:  0.00, H2c:  0.00, H2d:  0.00, H3: -0.05 },
    '400a800': { H1a: 0.20, H1b: 0.20, H1c: 0.15, H2a:  0.10, H2b:  0.15, H2c:  0.05, H2d:  0.05, H3:  0.00 },
    sup800:    { H1a: 0.30, H1b: 0.35, H1c: 0.30, H2a:  0.25, H2b:  0.25, H2c:  0.20, H2d:  0.15, H3:  0.10 },
  },
  // — Usage 28 : Établissements sportifs privés — SOURCE : Chap. III §II, tableau p. 55
  28: {
    inf400:    { H1a: 0.00, H1b: 0.10, H1c: 0.05, H2a: -0.10, H2b:  0.00, H2c:  0.05, H2d:  0.35, H3:  0.25 },
    '400a800': { H1a: 0.00, H1b: 0.05, H1c: 0.05, H2a: -0.05, H2b:  0.00, H2c: -0.05, H2d:  0.15, H3:  0.05 },
    sup800:    { H1a: 0.05, H1b: 0.10, H1c: 0.05, H2a:  0.00, H2b:  0.05, H2c:  0.00, H2d:  0.10, H3: -0.05 },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 10 — MCSURF_MOY (modulation Cep selon surface moyenne logements)
// Chapitre III §II — formules par usage
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calcule Mcsurf_moy.
 * Source : Chap. III §II, formules Mcsurf_moy (format identique à Mbsurf_moy)
 */
function calcMcsurfMoy(usage, smoylgt, cepNrMoyen) {
  switch (usage) {
    case 1: { // Maisons individuelles
      let num;
      if (smoylgt <= 100)      num = 49.5 - 0.55 * smoylgt;
      else if (smoylgt <= 150) num = 14.5 - 0.20 * smoylgt;
      else                      num = -15.5;
      return num / cepNrMoyen;
    }
    case 2: { // Logements collectifs
      let num;
      if (smoylgt <= 40)       num = 45  - 1.00 * smoylgt;
      else if (smoylgt <= 80)  num = 15  - 0.25 * smoylgt;
      else if (smoylgt <= 120) num = 3   - 0.10 * smoylgt;
      else                      num = -9;
      return num / cepNrMoyen;
    }
    default:
      return 0;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 11 — MCSURF_TOT (modulation Cep selon surface totale)
// Chapitre III §II
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calcule Mcsurf_tot.
 * Source : Chap. III §II, tableaux Mcsurf_tot par usage
 */
function calcMcsurfTot(usage, sref, cepNrMoyen) {
  switch (usage) {
    case 1: // Maisons individuelles — Mcsurf_tot = 0
      return 0;

    case 2: { // Logements collectifs
      if (sref <= 1300) return (13 - 0.01 * sref) / cepNrMoyen;
      return 0;
    }

    case 3: { // Bureaux
      if (sref <= 500)       return (18 - 0.032 * sref) / cepNrMoyen;
      else if (sref <= 1500) return (6  - 0.008 * sref) / cepNrMoyen;
      return -6 / cepNrMoyen;
    }

    case 4:
    case 5: { // Enseignement (primaire et secondaire, même formule Cep)
      if (sref <= 500) return (12.5 - 0.025 * sref) / cepNrMoyen;
      return 0;
    }

    default:
      return 0;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 12 — MCCAT (modulation Cep selon catégorie de contraintes extérieures)
// Chapitre III §II — tableaux par usage
// Catégories définies au Chapitre V
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Mccat indexé par usage puis catégorie ('cat1'|'cat2'|'cat3').
 * Source : Chap. III §II, tableaux Mccat par usage
 */
const MCCAT = {
  // Usage 1 (MI) : Mccat cat2 = 0.10 uniquement en H2d et H3 — Source : Chap. III §II p. 33
  1:  { cat1: 0,
        cat2: { H1a: 0, H1b: 0, H1c: 0, H2a: 0, H2b: 0, H2c: 0, H2d: 0.10, H3: 0.10 },
        cat3: null },
  // Usage 2 (LC) : idem — Source : Chap. III §II p. 34
  2:  { cat1: 0,
        cat2: { H1a: 0, H1b: 0, H1c: 0, H2a: 0, H2b: 0, H2c: 0, H2d: 0.10, H3: 0.10 },
        cat3: null },
  3:  { cat1: 0, cat2: 0,    cat3: 0    }, // Bureaux : Mccat = 0
  4:  { cat1: 0, cat2: 0.05, cat3: null },
  5:  { cat1: 0, cat2: 0.05, cat3: null },
  // SOURCE : Chap. III §II, tableaux Mccat par usage
  // — Usage 6 : Médiathèques — cat3 varie par zone — SOURCE : p. 36
  // Structure spéciale : cat3 est un objet par zone (seul usage avec Mccat zonal)
  6:  { cat1: 0, cat2: 0,
        cat3: { H1a: 0.05, H1b: 0.05, H1c: 0.05, H2a: 0.05, H2b: 0.05, H2c: 0.10, H2d: 0.20, H3: 0.30 } },
  // — Usage 7 : Bâtiments universitaires — cat3 varie par zone — SOURCE : p. 37
  7:  { cat1: 0, cat2: 0,
        cat3: { H1a: 0.00, H1b: 0.00, H1c: 0.00, H2a: 0.00, H2b: 0.00, H2c: 0.00, H2d: 0.05, H3: 0.05 } },
  // — Usages 8-11 : Hôtels — Mccat = 0 toutes catégories — SOURCE : Décret n°2026-16, tableau Mccat "Hôtels"
  8:  { cat1: 0, cat2: 0, cat3: 0 }, // Mccat cat3 hôtels 0-2* nuit = 0 (toutes zones)
  9:  { cat1: 0, cat2: 0, cat3: 0 }, // Mccat cat3 hôtels 3-5* nuit = 0 (toutes zones)
  10: { cat1: 0, cat2: 0, cat3: 0 }, // Mccat cat3 hôtels 0-2* jour = 0 (toutes zones)
  11: { cat1: 0, cat2: 0, cat3: 0 }, // Mccat cat3 hôtels 3-5* jour = 0 (toutes zones)
  // — Usage 12 : EAPE — cat3 varie par zone — SOURCE : p. 41
  12: { cat1: 0, cat2: 0,
        cat3: { H1a: 0.00, H1b: 0.05, H1c: 0.05, H2a: 0.00, H2b: 0.05, H2c: 0.05, H2d: 0.20, H3: 0.25 } },
  // — Usages 13-16 : Restaurants — Mccat = 0 toutes catégories — SOURCE : Décret n°2026-16, tableau Mccat "Restaurants"
  13: { cat1: 0, cat2: 0, cat3: 0 }, // Mccat cat3 restaurant continu = 0 (toutes zones)
  14: { cat1: 0, cat2: 0, cat3: 0 }, // Mccat cat3 restaurant 1 repas/5j = 0 (toutes zones)
  15: { cat1: 0, cat2: 0, cat3: 0 }, // Mccat cat3 restaurant 2 repas/7j = 0 (toutes zones)
  16: { cat1: 0, cat2: 0, cat3: 0 }, // Mccat cat3 restaurant 2 repas/6j = 0 (toutes zones)
  // — Usage 17 : Commerces — Mccat cat3 = 0.05 toutes zones — SOURCE : Décret n°2026-16, tableau Mccat "Commerce"
  // NOTE : pour les commerces, la modulation Mccat utilise les zones de bruit (BR), pas cat1/2/3
  17: { cat1: 0, cat2: 0, cat3: 0.05 }, // cat3 = 0.05 uniforme toutes zones climatiques (confirmé Décret n°2026-16)
  // — Usages 18-24 — SOURCE : pp. 46-52
  18: { cat1: 0, cat2: 0, cat3: 0 }, // CE3 non applicable (usage 18 absent de la liste Décret 2026-16)
  19: { cat1: 0, cat2: 0, cat3: 0 }, // CE3 non applicable
  20: { cat1: 0, cat2: 0, cat3: 0 }, // CE3 non applicable (santé nuit, non listé)
  // — Usage 21 : Établissements de santé (partie jour) — Mccat = 0 toutes catégories — SOURCE : Décret n°2026-16, tableau Mccat "Etablissements de santé"
  // CE3 éligible via baies non ouvrantes UNIQUEMENT (IGH exclu, cf. Décret n°2026-16)
  21: { cat1: 0, cat2: 0, cat3: 0 }, // Mccat cat3 établ. santé partie jour = 0 (toutes zones, confirmé Décret n°2026-16)
  22: { cat1: 0, cat2: 0, cat3: 0 },
  23: { cat1: 0, cat2: 0, cat3: 0 },
  24: { cat1: 0, cat2: 0, cat3: 0 },
  // — Usages 25-28 : Mccat = 0 — SOURCE : pp. 52-55
  25: { cat1: 0, cat2: 0, cat3: 0 },
  26: { cat1: 0, cat2: 0, cat3: 0 },
  27: { cat1: 0, cat2: 0, cat3: 0 },
  28: { cat1: 0, cat2: 0, cat3: 0 },
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 12b — USAGES ÉLIGIBLES À LA CATÉGORIE CE3
// Source : Décret n°2026-16 du 15 janvier 2026, Chap. V, § Catégorie CE d'un local
// Deux branches cumulatives (climatisé obligatoire dans les deux cas) :
//   Branche A — baies non ouvrantes : usages 3, 6, 7, 8-12, 13-17, 21
//   Branche B — IGH : mêmes usages SAUF usage 21 (établ. santé partie jour)
// ─────────────────────────────────────────────────────────────────────────────

/** Usages pour lesquels la catégorie CE3 est possible (toutes branches confondues). */
const USAGES_CE3 = new Set([3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 21]);

/**
 * Usages pour lesquels CE3 est accessible via la branche IGH.
 * L'usage 21 (établissements de santé partie jour) est exclu de cette branche.
 */
const USAGES_CE3_IGH = new Set([3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 13 — ICCONSTRUCTION_MAXMOYEN
// Chapitre III §III — tableau par usage et période réglementaire
// Unité : kg éq. CO2/m²
// Périodes : '2022-2024' | '2025-2027' | '2028-2030' | '2031+'
// Valeur null = pas d'exigence sur cette période pour cet usage
// ─────────────────────────────────────────────────────────────────────────────

/** Icconstruction_maxmoyen. Source : Chap. III §III, tableau pp. 56-57 */
const ICCONSTRUCTION_MAX_MOYEN = {
  1:  { '2022-2024': 640,  '2025-2027': 530,  '2028-2030': 475,  '2031+': 415  },
  2:  { '2022-2024': 740,  '2025-2027': 650,  '2028-2030': 580,  '2031+': 490  },
  3:  { '2022-2024': 980,  '2025-2027': 810,  '2028-2030': 710,  '2031+': 600  },
  4:  { '2022-2024': 900,  '2025-2027': 770,  '2028-2030': 680,  '2031+': 590  },
  5:  { '2022-2024': 900,  '2025-2027': 770,  '2028-2030': 680,  '2031+': 590  },
  6:  { '2022-2024': null, '2025-2027': 940,  '2028-2030': 785,  '2031+': 630  },
  7:  { '2022-2024': null, '2025-2027': 940,  '2028-2030': 790,  '2031+': 640  },
  8:  { '2022-2024': null, '2025-2027': 820,  '2028-2030': 680,  '2031+': 540  }, // hôtels nuit 0-2*
  9:  { '2022-2024': null, '2025-2027': 820,  '2028-2030': 680,  '2031+': 540  }, // hôtels nuit 3-5*
  10: { '2022-2024': null, '2025-2027': 820,  '2028-2030': 680,  '2031+': 540  }, // hôtels jour 0-2*
  11: { '2022-2024': null, '2025-2027': 820,  '2028-2030': 680,  '2031+': 540  }, // hôtels jour 3-5*
  12: { '2022-2024': null, '2025-2027': 950,  '2028-2030': 780,  '2031+': 630  },
  13: { '2022-2024': null, '2025-2027': 800,  '2028-2030': 670,  '2031+': 540  }, // restaurants (13-16, 26-27 même valeur)
  14: { '2022-2024': null, '2025-2027': 800,  '2028-2030': 670,  '2031+': 540  },
  15: { '2022-2024': null, '2025-2027': 800,  '2028-2030': 670,  '2031+': 540  },
  16: { '2022-2024': null, '2025-2027': 800,  '2028-2030': 670,  '2031+': 540  },
  17: { '2022-2024': null, '2025-2027': 800,  '2028-2030': 670,  '2031+': 540  },
  18: { '2022-2024': null, '2025-2027': 1050, '2028-2030': 900,  '2031+': 750  },
  19: { '2022-2024': null, '2025-2027': 880,  '2028-2030': 760,  '2031+': 620  },
  20: { '2022-2024': null, '2025-2027': 880,  '2028-2030': 760,  '2031+': 620  },
  21: { '2022-2024': null, '2025-2027': 880,  '2028-2030': 760,  '2031+': 620  },
  22: { '2022-2024': null, '2025-2027': 1120, '2028-2030': 950,  '2031+': 780  },
  23: { '2022-2024': null, '2025-2027': 840,  '2028-2030': 695,  '2031+': 550  },
  24: { '2022-2024': null, '2025-2027': 840,  '2028-2030': 695,  '2031+': 550  },
  25: { '2022-2024': null, '2025-2027': 900,  '2028-2030': 760,  '2031+': 620  },
  26: { '2022-2024': null, '2025-2027': 800,  '2028-2030': 670,  '2031+': 540  },
  27: { '2022-2024': null, '2025-2027': 800,  '2028-2030': 670,  '2031+': 540  },
  28: { '2022-2024': null, '2025-2027': 900,  '2028-2030': 760,  '2031+': 620  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 14 — COEFFICIENTS MI (modulation Icconstruction_max)
// Chapitre III §III — formules par usage
// ─────────────────────────────────────────────────────────────────────────────

// — Micombles (maisons individuelles uniquement) —

/**
 * Calcule Micombles.
 * @param {number} scombles - surface combles aménagés (hp < 1,8 m) en m²
 * @param {number} sref     - surface de référence en m²
 * @returns {number}
 * Source : Chap. III §III, formule Micombles MI
 */
function calcMicombles(scombles, sref) {
  return (0.4 * scombles) / sref;
}

// — Misurf_moy (surface moyenne des logements) —

/**
 * Calcule Misurf_moy.
 * Source : Chap. III §III, tableaux Misurf_moy par usage
 * @param {number} usage    - numéro d'usage
 * @param {number} smoylgt  - surface moyenne des logements (m²)
 * @param {number} icMoyen  - Icconstruction_maxmoyen de l'usage et de la période
 * @returns {number}
 */
function calcMisurfMoy(usage, smoylgt, icMoyen) {
  switch (usage) {
    case 1: { // Maisons individuelles — Chap. III §III
      if (smoylgt <= 120) return (0.36 - 3.6 * smoylgt / 1000) ;
      return -0.072;
    }
    case 2: { // Logements collectifs — Chap. III §III
      if (smoylgt <= 40) return (100 - 2.5 * smoylgt) / icMoyen;
      return 0;
    }
    default:
      return 0;
  }
}

// — Misurf_tot (surface de référence totale) —

/**
 * Calcule Misurf_tot.
 * Source : Chap. III §III, tableaux Misurf_tot par usage
 * @param {number} usage   - numéro d'usage
 * @param {number} sref    - surface de référence (m²)
 * @returns {number}
 */
function calcMisurfTot(usage, sref) {
  switch (usage) {
    case 1: // Maisons individuelles — Misurf_tot = 0
      return 0;

    case 2: { // Logements collectifs — Chap. III §III, tableau p. 60
      if (sref <= 1300)      return -0.104 + 0.8 * sref / 10000;
      else if (sref < 4000)  return 0.0455 - 0.350 * sref / 10000;
      return -0.0945;
    }

    case 3: { // Bureaux — Chap. III §III, tableau p. 62
      if (sref <= 2500) return 0.034 - 0.86 * sref / 10000;
      return -0.181;
    }

    case 4:
    case 5: { // Enseignement primaire/secondaire — Chap. III §III, tableau p. 63
      // Source : Misurf_tot = 0,21 × Sref/10000 − 0,084 si Sref ≤ 10000 m²
      if (sref <= 10000) return 0.21 * sref / 10000 - 0.084;
      return -0.126;
    }

    default:
      return 0;
  }
}

// — Migéo —

/**
 * Migéo pour Icconstruction_max.
 * Valeur absolue en kg éq. CO2/m² (s'additionne, pas multipliée).
 * Source : Chap. III §III, tableaux Migéo par usage
 * Seule H2d et H3 en altitude ≥ 400 m reçoivent une valeur non nulle
 * pour les usages 1 et 2 (30 kg éq. CO2/m²).
 * Pour bureaux : H2d et H3 à < 400 m = 50 kg éq. CO2/m².
 * @param {number} usage     - numéro d'usage
 * @param {string} zone      - zone climatique
 * @param {string} tranche   - tranche d'altitude
 * @returns {number} valeur absolue en kg éq. CO2/m²
 */
function getMigeo(usage, zone, tranche) {
  switch (usage) {
    case 1:
    case 2: // MI et LC — Chap. III §III : 30 kg éq. CO2/m² si H2d ou H3 et < 400 m (tableau p. 57/60)
      if ((zone === 'H2d' || zone === 'H3') && tranche === 'inf400') return 30;
      return 0;
    case 3: // Bureaux — Chap. III §III : 50 kg éq. CO2/m² si H2d ou H3 à <400m
      if ((zone === 'H2d' || zone === 'H3') && tranche === 'inf400') return 50;
      return 0;
    default:
      return 0; // Migéo = 0 pour tous les autres usages (confirmé PDF p.58)
  }
}

// — Miinfra (fondations et sous-sol) —

/**
 * Calcule Miinfra (valeur absolue en kg éq. CO2/m²).
 * @param {number} icLot2 - impact du lot 2 (fondations/infrastructure) en kg éq. CO2/m²
 * @param {number} usage  - numéro d'usage
 * @returns {number}
 * Source : Chap. III §III, formules Miinfra par usage
 */
function calcMiinfra(icLot2, usage) {
  // Seuil universel = 40 kg éq. CO2/m² — Source : Chap. III §III, formule Miinfra (p.58)
  const seuil = 40;
  if (icLot2 <= seuil) return 0;
  return icLot2 - seuil;
}

// — Mivrd (voirie et réseaux divers) —

/**
 * Calcule Mivrd (valeur absolue en kg éq. CO2/m²).
 * @param {number} icLot1 - impact du lot 1 (VRD) en kg éq. CO2/m²
 * @param {number} usage  - numéro d'usage
 * @returns {number}
 * Source : Chap. III §III, formules Mivrd
 */
function calcMivrd(icLot1, usage) {
  // Seuil universel = 20 kg éq. CO2/m² — Source : Chap. III §III, formule Mivrd (p.58)
  const seuil = 20;
  if (icLot1 <= seuil) return 0;
  return icLot1 - seuil;
}

// — Mipv (panneaux photovoltaïques) —

/**
 * Calcule Mipv (valeur absolue en kg éq. CO2/m²).
 * Seuil = 20 kg éq. CO2/m² pour tous usages documentés.
 * @param {number} icLot13 - impact du lot 13 (production locale électricité) en kg éq. CO2/m²
 * @returns {number}
 * Source : Chap. III §III, formules Mipv (identique MI et LC)
 */
function calcMipv(icLot13) {
  const seuil = 20;
  if (icLot13 <= seuil) return 0;
  return icLot13 - seuil;
}

// — Mided (données environnementales par défaut) —

/**
 * Calcule Mided (coefficient multiplicatif, sans unité).
 * @param {number} icded    - impact des données par défaut en kg éq. CO2/m²
 * @param {number} anneePC  - année de dépôt du PC
 * @param {number} usage    - numéro d'usage
 * @returns {number}
 * Source : Chap. III §III, tableaux Mided par usage et période
 */
function calcMided(icded, anneePC, usage) {
  // Seuil universel = 370 kg éq. CO2/m² — Source : Chap. III §III, tableau Mided (p.59)
  const seuil = 370;
  const plage = getPlagePeriode(anneePC);

  if (plage === '2022-2024') {
    if (icded <= seuil) return 0;
    return 0.3 * (icded - seuil);
  }
  if (plage === '2025-2027') {
    return 0; // Mided = 0 en 2025-2027 pour MI et LC
  }
  // À partir de 2028
  if (icded <= seuil) return 0;
  return -0.3 * (icded - seuil);
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 15 — DH_MAXCAT (degrés-heures d'inconfort estival)
// Chapitre III §IV — tableaux par usage
// Unité : °C.h
// DH_max = DH_maxcat (aucune modulation supplémentaire)
// Structure : DH_MAXCAT[usage][categorie][etatClimatisation]
//   categorie   : 'cat1' | 'cat2' | 'cat3'
//   etatClim    : 'nonClim' | 'climZonesChaudesH2dH3' | null (pas de distinction)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * DH_maxcat en °C.h. Source : Chap. III §IV, tableaux DH_maxcat par usage
 * Null = pas de seuil DH (catégorie 3 ou usage non soumis)
 *
 * Pour les logements collectifs en cat1 : formule selon Smoylgt (voir calcDHmax_LC).
 */
const DH_MAXCAT = {
  // — Usage 1 : Maisons individuelles — Chap. III §IV
  1: {
    cat1: { nonClim: 1250, climH2dH3: 1250 },
    cat2: { nonClim: 1850, climH2dH3: 1850 },
    cat3: null,
  },
  // — Usage 2 : Logements collectifs — formule (voir calcDHmax_LC) —
  2: 'formule_LC',

  // — Usage 3 : Bureaux —
  3: {
    cat1: { nonClim: 1150, climH2dH3: 2400 },
    cat2: { nonClim: 2600, climH2dH3: 2600 },
    cat3: null, // pas de seuil
  },
  // — Usages 4 et 5 : Enseignement primaire/secondaire —
  4: {
    cat1: { nonClim: 900,  climH2dH3: 1800 },
    cat2: { nonClim: 2200, climH2dH3: 2200 },
    cat3: null,
  },
  5: null, // même que 4 — géré dans getDHmax()
  // — Usage 6 : Médiathèques —
  6: {
    cat1: { nonClim: 900,  climH2dH3: 2200 },
    cat2: { nonClim: 2400, climH2dH3: 2400 },
    cat3: null,
  },
  // — Usage 7 : Bâtiments universitaires —
  7: {
    cat1: { nonClim: 900,  climH2dH3: 2200 },
    cat2: { nonClim: 2400, climH2dH3: 2400 },
    cat3: null,
  },
  // — Usages 8 et 9 : Hôtels nuit (0-5*) —
  8: {
    cat1: { nonClim: 300,  climH2dH3: 700  },
    cat2: { nonClim: 1000, climH2dH3: 1000 },
    cat3: null,
  },
  9: null, // même que 8
  // — Usages 10 et 11 : Hôtels jour (0-5*) —
  10: {
    cat1: { nonClim: 1300, climH2dH3: 3300 },
    cat2: { nonClim: 3400, climH2dH3: 3400 },
    cat3: null,
  },
  11: null, // même que 10
  // — Usage 12 : EAPE —
  12: {
    cat1: { nonClim: 550,  climH2dH3: 1600 },
    cat2: { nonClim: 1600, climH2dH3: 1600 },
    cat3: null,
  },
  // — Usage 13 : Restaurants continu 18h/7j —
  13: {
    cat1: { nonClim: 2500, climH2dH3: 5000 },
    cat2: { nonClim: 5000, climH2dH3: 5000 },
    cat3: null,
  },
  // — Usage 14 : Restaurants 1 repas/5j —
  14: {
    cat1: { nonClim: 250, climH2dH3: 650 },
    cat2: { nonClim: 650, climH2dH3: 650 },
    cat3: null,
  },
  // — Usage 15 : Restaurants 2 repas/7j —
  15: {
    cat1: { nonClim: 1600, climH2dH3: 3500 },
    cat2: { nonClim: 3500, climH2dH3: 3500 },
    cat3: null,
  },
  // — Usage 16 : Restaurants 2 repas/6j —
  16: {
    cat1: { nonClim: 1250, climH2dH3: 2500 },
    cat2: { nonClim: 2500, climH2dH3: 2500 },
    cat3: null,
  },
  // — Usage 17 : Commerces —
  17: {
    cat1: { nonClim: 3300, climH2dH3: 8000 },
    cat2: { nonClim: 9500, climH2dH3: 9500 },
    cat3: null,
  },
  // — Usage 18 : Vestiaires seuls —
  18: {
    cat1: { nonClim: 1000, climH2dH3: 2200 },
    cat2: { nonClim: 2200, climH2dH3: 2200 },
    cat3: null,
  },
  // — Usage 19 : Établissements sanitaires avec hébergement —
  19: {
    cat1: { nonClim: 900,  climH2dH3: 2400 },
    cat2: { nonClim: 2600, climH2dH3: 2600 },
    cat3: null,
  },
  // — Usage 20 : Établissements de santé (partie nuit) —
  20: {
    cat1: { nonClim: 900,  climH2dH3: 2400 },
    cat2: { nonClim: 2600, climH2dH3: 2600 },
    cat3: null,
  },
  // — Usage 21 : Établissements de santé (partie jour) —
  21: {
    cat1: { nonClim: 1250, climH2dH3: 3000 },
    cat2: { nonClim: 3300, climH2dH3: 3300 },
    cat3: null,
  },
  // — Usage 22 : Aérogares —
  22: {
    cat1: { nonClim: 12100, climH2dH3: 21500 },
    cat2: { nonClim: 21500, climH2dH3: 21500 },
    cat3: null,
  },
  // — Usage 23 : Industries 3x8h —
  23: {
    cat1: { nonClim: 3200, climH2dH3: 8000 },
    cat2: { nonClim: 8000, climH2dH3: 8000 },
    cat3: null,
  },
  // — Usage 24 : Industries 8h-18h —
  24: {
    cat1: { nonClim: 900,  climH2dH3: 2200 },
    cat2: { nonClim: 2200, climH2dH3: 2200 },
    cat3: null,
  },
  // — Usage 25 : Établissements sportifs municipaux/scolaires —
  25: {
    cat1: { nonClim: 2000, climH2dH3: 4600 },
    cat2: { nonClim: 5000, climH2dH3: 5000 },
    cat3: null,
  },
  // — Usage 26 : Restaurants scolaires 1 repas/5j —
  26: {
    cat1: { nonClim: 40,  climH2dH3: 170 },
    cat2: { nonClim: 170, climH2dH3: 170 },
    cat3: null,
  },
  // — Usage 27 : Restaurants scolaires 3 repas/5j —
  27: {
    cat1: { nonClim: 260, climH2dH3: 650 },
    cat2: { nonClim: 650, climH2dH3: 650 },
    cat3: null,
  },
  // — Usage 28 : Établissements sportifs privés — (même valeurs que 25)
  28: {
    cat1: { nonClim: 2000, climH2dH3: 4600 },
    cat2: { nonClim: 5000, climH2dH3: 5000 },
    cat3: null,
  },
};

/**
 * Calcule DH_maxcat pour les logements collectifs (formule tabulée).
 * Source : Chap. III §IV, tableau LC — formule selon Smoylgt
 * @param {string} categorie  - 'cat1' | 'cat2'
 * @param {string} zone       - zone climatique (H2d ou H3 → climatisé)
 * @param {boolean} climatise - true si la partie de bâtiment est climatisée
 * @param {number} smoylgt    - surface moyenne des logements (m²)
 * @returns {number|null}
 */
function calcDHmax_LC(categorie, zone, climatise, smoylgt) {
  // Source : Chap. III §IV, tableau LC (p. 87)
  const zonesChaudes = zone === 'H2d' || zone === 'H3';

  if (categorie === 'cat1') {
    if (zonesChaudes && climatise) {
      // Catégorie 1 climatisé en zones H2d et H3 — formule tabulée
      if (smoylgt <= 20)       return 1600;
      else if (smoylgt <= 60)  return 1700 - 5 * smoylgt;
      return 1400;
    }
    // Catégorie 1 sauf bâtiments climatisés en zones H2d et H3 : valeur fixe 1250
    return 1250;
  }

  if (categorie === 'cat2') {
    // Catégorie 2 — formule tabulée selon Smoylgt
    if (smoylgt <= 20)       return 2600;
    else if (smoylgt <= 60)  return 2850 - 12.5 * smoylgt;
    return 2100;
  }

  return null; // cat3 sans seuil pour LC
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 16 — FONCTIONS UTILITAIRES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Retourne la plage réglementaire correspondant à l'année du PC.
 * Les plages gouvernent les valeurs de Icconstruction_maxmoyen,
 * Icénergie_maxmoyen (usage 1-5), et les formules Mbsurf_tot bureaux.
 * @param {number} anneePC - année de dépôt du permis de construire
 * @returns {'2022-2024'|'2025-2027'|'2028-2030'|'2031+'}
 * Source : Chap. III §III, entêtes de colonnes des tableaux de valeurs
 */
function getPlagePeriode(anneePC) {
  if (anneePC >= 2022 && anneePC <= 2024) return '2022-2024';
  if (anneePC >= 2025 && anneePC <= 2027) return '2025-2027';
  if (anneePC >= 2028 && anneePC <= 2030) return '2028-2030';
  return '2031+';
}

/**
 * Retourne la clé de période Icénergie (3 périodes, distincte de Icconstruction).
 * @param {number} anneePC
 * @returns {'2022-2024'|'2025-2027'|'2028+'}
 */
function getPlagePeriodeIcenergie(anneePC) {
  if (anneePC >= 2022 && anneePC <= 2024) return '2022-2024';
  if (anneePC >= 2025 && anneePC <= 2027) return '2025-2027';
  return '2028+';
}

/**
 * Retourne la date d'entrée en vigueur RE2020 pour un usage donné.
 * @param {number} usage - numéro d'usage (1 à 28)
 * @returns {string} date au format 'YYYY-MM-DD'
 */
function getDateEntreeVigueur(usage) {
  return USAGES[usage]?.dateEntreeVigueur ?? null;
}

/**
 * Retourne la tranche d'altitude pour la lookup MBGEO/MCGEO.
 * @param {number} altitude - altitude en mètres
 * @returns {'inf400'|'400a800'|'sup800'}
 */
function getTrancheAltitude(altitude) {
  if (altitude < 400)  return 'inf400';
  if (altitude <= 800) return '400a800';
  return 'sup800';
}

/**
 * Retourne Mbgéo pour un usage, une zone et une altitude.
 * @param {number} usage
 * @param {string} zone      - 'H1a'|'H1b'|...|'H3'
 * @param {number} altitude  - en mètres
 * @returns {number|null}
 */
function getMbgeo(usage, zone, altitude) {
  // usage 5 = même table que 4 ; usage 28 = même table que 25
  const aliases = { 5: 4, 28: 25 };
  const refUsage = aliases[usage] ?? usage;
  const table = MBGEO[refUsage];
  if (!table) return null;
  const tranche = getTrancheAltitude(altitude);
  return table[tranche]?.[zone] ?? null;
}

/**
 * Retourne Mcgéo pour un usage, une zone et une altitude.
 */
function getMcgeo(usage, zone, altitude) {
  // usage 5 = même table que 4 ; usage 9 = même table que 8
  const aliases = { 5: 4, 9: 8 };
  const refUsage = aliases[usage] ?? usage;
  const table = MCGEO[refUsage];
  if (!table) return null;
  const tranche = getTrancheAltitude(altitude);
  return table[tranche]?.[zone] ?? null;
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 17 — DÉCRET n°2026-200 DU 18 MARS 2026
// Applicables aux PC déposés à compter du 01/07/2026.
// Source : JO 20/03/2026, Décret n°2026-200
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Détermine si le décret n°2026-200 s'applique.
 * @param {number}  anneePC          - année du PC
 * @param {boolean} apresJuillet2026 - vrai si le PC est déposé à partir du 01/07/2026
 *                                     (pertinent uniquement pour anneePC === 2026)
 * @returns {boolean}
 * Source : Décret n°2026-200, Art. 3
 */
function appliqueDecretJO2026(anneePC, apresJuillet2026) {
  if (anneePC > 2026) return true;
  if (anneePC === 2026) return !!apresJuillet2026;
  return false;
}

/**
 * Calcule MbHSP (modulation Bbio_max selon hauteur sous plafond — nouvelles formules JO 2026).
 * Avant le 01/07/2026, utiliser l'ancienne formule : MbHSP = 0,30 × (HSPmoy − 2,5).
 * @param {number} usage  - numéro d'usage
 * @param {number} hsp    - HSPmoy en mètres
 * @param {number} sref   - surface de référence (m²)
 * @returns {number}
 * Source : Décret n°2026-200, Chap. III §I, tableaux MbHSP (usages 1 et 2)
 */
function calcMbHSP(usage, hsp, sref) {
  if (hsp <= 2.5) return 0;
  const base = Math.min(hsp, 2.9) / 2.5 - 1;
  switch (usage) {
    case 1: // Maisons individuelles — tableau selon Sref
      return sref <= 150 ? base : base / 2;
    case 2: // Logements collectifs
      return base / 1.5;
    default:
      return 0; // MbHSP = 0 pour usages 3 à 28 (HSP sans effet hors habitation)
  }
}

/**
 * Calcule McHSP (modulation Cep,nr_max / Cep_max / Icénergie_max — nouvelles formules JO 2026).
 * Avant le 01/07/2026, utiliser l'ancienne formule : McHSP = 0,10 × (HSPmoy − 2,5).
 * @param {number} usage  - numéro d'usage
 * @param {number} hsp    - HSPmoy en mètres
 * @param {number} sref   - surface de référence (m²)
 * @returns {number}
 * Source : Décret n°2026-200, Chap. III §II, tableaux McHSP (usages 1 et 2)
 */
function calcMcHSP(usage, hsp, sref) {
  if (hsp <= 2.5) return 0;
  const base = Math.min(hsp, 2.9) / 2.5 - 1;
  switch (usage) {
    case 1: // Maisons individuelles
      return sref <= 150 ? base / 2 : base / 4;
    case 2: // Logements collectifs
      return base / 4;
    default:
      return 0; // McHSP = 0 pour usages 3 à 28 (HSP sans effet hors habitation)
  }
}

/**
 * Calcule MiHSP (terme additif Icconstruction_max selon HSP — JO 2026).
 * Unité : kg éq. CO2/m².
 * @param {number} usage - numéro d'usage
 * @param {number} hsp   - HSPmoy en mètres
 * @returns {number}
 * Source : Décret n°2026-200, Chap. III §III, tableaux MiHSP (usages 1 et 2)
 */
function calcMiHSP(usage, hsp) {
  if (usage !== 1 && usage !== 2) return 0; // = 0 pour usages 3-28
  if (hsp <= 2.5) return 0;
  return (Math.min(hsp, 2.9) / 2.5 - 1) * 95;
}

/**
 * Calcule Miagrément_ext (terme additif Icconstruction_max selon surface balcons/loggias — JO 2026).
 * Applicable aux logements collectifs (usage 2) à compter du 01/07/2026.
 * Unité : kg éq. CO2/m².
 * @param {number} usage        - numéro d'usage
 * @param {number} sagrementExt - surface d'agrément extérieur (m²) : balcons + loggias + terrasses épannelage
 * @param {number} sref         - surface de référence (m²)
 * @returns {number}
 * Source : Décret n°2026-200, Chap. III §III, tableau Miagrément_ext usage 2
 */
function calcMiagrementExt(usage, sagrementExt, sref) {
  if (usage !== 2) return 0; // = 0 pour tous usages sauf LC
  if (!sref || sref <= 0) return 0;
  const ratio = sagrementExt / sref;
  if (ratio <= 0.1) return 0;
  return (Math.min(ratio, 0.25) - 0.1) * 110;
}

/**
 * Calcule Miclim_RCU (terme additif Icconstruction_max selon présence clim + RCU classé — JO 2026).
 * Applicable à tous les usages à compter du 01/07/2026.
 * Unité : kg éq. CO2/m².
 * @param {boolean} rcu       - raccordé à un réseau de chaleur urbain classé
 * @param {boolean} climatise - bâtiment climatisé
 * @returns {number}
 * Source : Décret n°2026-200, Chap. III §III, tableau Miclim_RCU (tous usages)
 */
function calcMiclimRCU(rcu, climatise) {
  return (rcu && climatise) ? 25 : 0;
}

/**
 * Retourne la valeur de Misurf_tot applicable aux IGH en lieu et place de calcMisurfTot().
 * [HYPOTHÈSE] usage 5 traité comme usage 4 (section d du décret).
 * @param {number} usage - numéro d'usage
 * @returns {number|null} null si la dérogation IGH ne s'applique pas pour cet usage
 * Source : Décret n°2026-200, Chap. III §III, sections b/c/d/e
 */
function calcMisurfTotIGH(usage) {
  if (usage === 1) return null;   // usage 1 (MI) : pas de dérogation IGH
  if (usage === 2) return 0;      // LC : Misurftot IGH = 0
  if (usage === 3 || usage === 4 || usage === 5) return -0.05; // [HYPOTHÈSE] usage 5 = usage 4
  if (usage >= 6) return 0.05;    // usages 6 à 28
  return null;
}

/**
 * Retourne Icconstruction_maxmoyen en tenant compte de la dérogation IGH 95%.
 * - En 2028-2030 (IGH) : 95 % de la valeur standard 2028-2030
 * - En 2031+     (IGH) : 95 % de la valeur appliquée en 2028 = 0,9025 × valeur standard 2028-2030
 * Pour les autres périodes ou sans IGH : valeur standard.
 * @param {number}  usage          - numéro d'usage
 * @param {number}  anneePC        - année du PC
 * @param {boolean} igh            - immeuble de grande hauteur
 * @param {boolean} decretJO2026   - décret 2026-200 applicable
 * @returns {number|null}
 * Source : Décret n°2026-200, Chap. III §III, dérogation IGH
 */
function getIcconstructionMoyen(usage, anneePC, igh, decretJO2026) {
  const plage    = getPlagePeriode(anneePC);
  const valStd   = ICCONSTRUCTION_MAX_MOYEN[usage]?.[plage] ?? null;

  if (!decretJO2026 || !igh || anneePC < 2028) return valStd;

  // Dérogation IGH : base sur la valeur standard 2028-2030
  const val2028  = ICCONSTRUCTION_MAX_MOYEN[usage]?.['2028-2030'] ?? null;
  if (val2028 === null) return valStd;

  if (plage === '2028-2030') return Math.round(val2028 * 0.95);
  if (plage === '2031+')     return Math.round(val2028 * 0.9025); // 95 % × 95 % de la valeur 2028-2030
  return valStd;
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

// Exports Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    USAGES,
    BBIO_MAX_MOYEN,
    MBGEO,
    MBBRUIT,
    getMbbruit,
    CEP_NR_MAX_MOYEN,
    CEP_MAX_MOYEN,
    ICENERGIE_MAX_MOYEN,
    MCGEO,
    MCCAT,
    ICCONSTRUCTION_MAX_MOYEN,
    DH_MAXCAT,
    calcMbsurfMoy,
    calcMbsurfTot,
    calcMcsurfMoy,
    calcMcsurfTot,
    calcMicombles,
    calcMisurfMoy,
    calcMisurfTot,
    getMigeo,
    calcMiinfra,
    calcMivrd,
    calcMipv,
    calcMided,
    calcDHmax_LC,
    getPlagePeriode,
    getPlagePeriodeIcenergie,
    getDateEntreeVigueur,
    getTrancheAltitude,
    getMbgeo,
    getMcgeo,
    appliqueDecretJO2026,
    calcMbHSP,
    calcMcHSP,
    calcMiHSP,
    calcMiagrementExt,
    calcMiclimRCU,
    calcMisurfTotIGH,
    getIcconstructionMoyen,
  };
}

// Export navigateur — namespace dédié pour éviter les conflits de portée lexicale
// (les `const` de ce fichier ne sont pas des propriétés de `window`)
if (typeof window !== 'undefined') {
  window.RE2020Data = {
    USAGES,
    BBIO_MAX_MOYEN,
    MBGEO,
    MBBRUIT,
    getMbbruit,
    CEP_NR_MAX_MOYEN,
    CEP_MAX_MOYEN,
    ICENERGIE_MAX_MOYEN,
    MCGEO,
    MCCAT,
    ICCONSTRUCTION_MAX_MOYEN,
    DH_MAXCAT,
    calcMbsurfMoy,
    calcMbsurfTot,
    calcMcsurfMoy,
    calcMcsurfTot,
    calcMicombles,
    calcMisurfMoy,
    calcMisurfTot,
    getMigeo,
    calcMiinfra,
    calcMivrd,
    calcMipv,
    calcMided,
    calcDHmax_LC,
    getPlagePeriode,
    getPlagePeriodeIcenergie,
    getDateEntreeVigueur,
    getTrancheAltitude,
    getMbgeo,
    getMcgeo,
    appliqueDecretJO2026,
    calcMbHSP,
    calcMcHSP,
    calcMiHSP,
    calcMiagrementExt,
    calcMiclimRCU,
    calcMisurfTotIGH,
    getIcconstructionMoyen,
  };
}
