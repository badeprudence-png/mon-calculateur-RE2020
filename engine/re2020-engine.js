/**
 * re2020-engine.js — Moteur de calcul RE2020
 * Source : Annexe à l'article R.172-4 (specs/chapitre1a3_annexe_r172-4_post-gtm2.pdf)
 *
 * Chaque fonction retourne { valeur, coefficients, sources }.
 * Compatibilité : navigateur (via <script>) et Node.js (require).
 */

(function () {
'use strict';

// ─── Importation des données réglementaires ──────────────────────────────────
// En navigateur, re2020-data.js expose window.RE2020Data (namespace dédié).
// En Node.js, on charge le module via require.
const _d = (typeof require !== 'undefined')
  ? require('./re2020-data.js')
  : (typeof window !== 'undefined' ? window.RE2020Data : {});

const {
  USAGES,
  BBIO_MAX_MOYEN,
  getMbbruit,
  CEP_NR_MAX_MOYEN,
  CEP_MAX_MOYEN,
  ICENERGIE_MAX_MOYEN,
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
} = _d;

// ─── Constantes de validation ────────────────────────────────────────────────
const ZONES_VALIDES    = ['H1a', 'H1b', 'H1c', 'H2a', 'H2b', 'H2c', 'H2d', 'H3'];
const CATEGORIES_VALIDES = ['cat1', 'cat2', 'cat3'];
const BRUITS_VALIDES   = ['BR1', 'BR2BR3', 'cat3'];

// ─────────────────────────────────────────────────────────────────────────────
// VALIDATION DES PARAMÈTRES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Valide les paramètres communs à tous les calculs.
 * @param {object} params
 * @throws {Error} si un paramètre est manquant ou invalide
 */
function validerParamsBase(params) {
  const { usage, anneePC, zone, altitude, sref } = params;

  if (!Number.isInteger(usage) || usage < 1 || usage > 28) {
    throw new Error(
      `Paramètre invalide : usage doit être un entier entre 1 et 28 (reçu : ${usage}).`
    );
  }
  if (!USAGES[usage]) {
    throw new Error(`Usage inconnu : ${usage}.`);
  }
  if (!Number.isInteger(anneePC) || anneePC < 2022) {
    throw new Error(
      `Paramètre invalide : anneePC doit être un entier ≥ 2022 (reçu : ${anneePC}).`
    );
  }
  if (!ZONES_VALIDES.includes(zone)) {
    throw new Error(
      `Paramètre invalide : zone doit être l'une de ${ZONES_VALIDES.join(', ')} (reçu : ${zone}).`
    );
  }
  if (typeof altitude !== 'number' || altitude < 0) {
    throw new Error(
      `Paramètre invalide : altitude doit être un nombre ≥ 0 en mètres (reçu : ${altitude}).`
    );
  }
  if (typeof sref !== 'number' || sref <= 0) {
    throw new Error(
      `Paramètre invalide : sref doit être un nombre positif en m² (reçu : ${sref}).`
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// FONCTIONS UTILITAIRES INTERNES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Normalise la clé de zone de bruit.
 * Valeurs reconnues : 'BR1', 'BR2BR3', 'BR2', 'BR3', 'cat3'.
 * @param {string|null|undefined} bruit
 * @returns {'BR1'|'BR2BR3'|'cat3'}
 */
function _normaliseBruit(bruit) {
  if (bruit === 'cat3') return 'cat3';
  if (bruit === 'BR2BR3' || bruit === 'BR2' || bruit === 'BR3') return 'BR2BR3';
  return 'BR1'; // valeur par défaut (pas d'exposition particulière)
}

/**
 * Normalise la clé de catégorie de contraintes extérieures.
 * @param {string|null|undefined} categorie
 * @returns {'cat1'|'cat2'|'cat3'}
 */
function _normaliseCategorie(categorie) {
  if (categorie === 'cat2') return 'cat2';
  if (categorie === 'cat3') return 'cat3';
  return 'cat1'; // valeur par défaut
}

/**
 * Retourne la valeur Mccat pour un usage, une catégorie et une zone donnés.
 * Gère les valeurs zonales : cat2 des usages 1-2, cat3 des usages 6, 7, 12.
 * Note : CE3 est déterminé via le diagramme "bureaux" (Chap. V), mais les usages 6, 7, 12
 * peuvent contenir des locaux bureaux → la partie de bâtiment peut être CE3 → Mccat cat3 applicable.
 * Source : Chap. III §II, tableaux Mccat
 * @param {number} usage
 * @param {string} cat   - 'cat1'|'cat2'|'cat3'
 * @param {string} zone
 * @returns {number}
 */
function _getMccat(usage, cat, zone) {
  const entree = MCCAT[usage];
  if (!entree) return 0;
  const valeur = entree[cat];
  if (typeof valeur === 'object' && valeur !== null) {
    // cat3 zonal : usages 6, 7, 12
    return valeur[zone] ?? 0;
  }
  return valeur ?? 0;
}

/**
 * Calcule les coefficients Mc (géo, combles, surf_moy, surf_tot, cat, HSP) communs
 * aux indicateurs Cep,nr_max, Cep_max et Icénergie_max.
 * Source : Chap. III §II — formule générale Mc
 */
function _coeffsMc(params) {
  const { usage, anneePC, zone, altitude, sref, smoylgt = 0, categorie, hsp = 0, apresJuillet2026 } = params;
  const decretJO2026 = appliqueDecretJO2026(anneePC, apresJuillet2026);
  const cepNrMoyen   = CEP_NR_MAX_MOYEN[usage];
  const cat          = _normaliseCategorie(categorie);

  // Mcgéo — Source : Chap. III §II, tableaux Mcgéo par usage
  const mcgeo = getMcgeo(usage, zone, altitude) ?? 0;

  // Mccombles — [HYPOTHÈSE] Mccombles = 0 pour tous les usages
  const mccombles = 0;

  // Mcsurf_moy — Source : Chap. III §II, tableaux Mcsurf_moy (usages 1-2)
  const mcsurfMoy = calcMcsurfMoy(usage, smoylgt, cepNrMoyen);

  // Mcsurf_tot — Source : Chap. III §II, tableaux Mcsurf_tot par usage
  const mcsurfTot = calcMcsurfTot(usage, sref, cepNrMoyen);

  // Mccat — Source : Chap. III §II, tableaux Mccat par usage
  const mccat = _getMccat(usage, cat, zone);

  // McHSP :
  //  - Avant 01/07/2026 : McHSP = 0,10 × (HSPmoy − 2,5) si HSPmoy > 2,5 m
  //    Source : Annexe R.172-4 initiale, Chap. III §II
  //  - À partir du 01/07/2026 : nouvelles formules par usage et Sref
  //    Source : Décret n°2026-200, Chap. III §II
  let mchsp;
  if (decretJO2026) {
    mchsp = calcMcHSP(usage, hsp, sref);
  } else {
    mchsp = (hsp > 2.5) ? Math.round(0.10 * (hsp - 2.5) * 10000) / 10000 : 0;
  }

  const sommeM = mcgeo + mccombles + mcsurfMoy + mcsurfTot + mccat + mchsp;
  return { mcgeo, mccombles, mcsurfMoy, mcsurfTot, mccat, mchsp, sommeM, cepNrMoyen };
}

// ─────────────────────────────────────────────────────────────────────────────
// FONCTION 1 — Bbio_max
// Bbio_max = Bbio_maxmoyen × (1 + Mbgéo + Mbcombles + Mbsurf_moy + Mbsurf_tot + Mbbruit)
// Source : Annexe R.172-4, Chap. III §I
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calcule Bbio_max.
 *
 * @param {object} params
 * @param {number}          params.usage            - numéro d'usage (1 à 28)
 * @param {number}          params.anneePC          - année de dépôt du permis de construire (≥ 2022)
 * @param {string}          params.zone             - zone climatique ('H1a'…'H3')
 * @param {number}          params.altitude         - altitude en mètres
 * @param {number}          params.sref             - surface de référence (m²)
 * @param {number}         [params.smoylgt=0]       - surface moyenne des logements (m²) — usages 1 et 2
 * @param {string}         [params.bruit]           - zone de bruit ('BR1'|'BR2BR3'|'cat3')
 * @param {number}         [params.scombles=0]      - surface combles aménagés (hp < 1,8 m) en m² — usage 1
 * @param {number}         [params.hsp=0]           - HSPmoy en mètres
 * @param {boolean}        [params.apresJuillet2026]- PC déposé à partir du 01/07/2026 (décret 2026-200)
 *
 * @returns {{ valeur: number, coefficients: object, sources: string[] }}
 */
function calculerBbiomax(params) {
  validerParamsBase(params);
  const {
    usage, anneePC, zone, altitude, sref,
    smoylgt = 0,
    bruit,
    scombles = 0,
    hsp = 0,
    apresJuillet2026,
  } = params;

  const decretJO2026 = appliqueDecretJO2026(anneePC, apresJuillet2026);
  const bbioMoyen    = BBIO_MAX_MOYEN[usage];

  // Mbgéo — Source : Chap. III §I, tableaux Mbgéo par usage
  const mbgeo = getMbgeo(usage, zone, altitude) ?? 0;

  // Mbcombles — Source : Chap. III §I, formule Mbcombles (maisons individuelles)
  // Mbcombles = 0,4 × Scombles / Sref — applicable uniquement usage 1
  const mbcombles = (usage === 1 && scombles > 0) ? (0.4 * scombles) / sref : 0;

  // Mbsurf_moy — Source : Chap. III §I, tableaux Mbsurf_moy (usages 1-2)
  const mbsurfMoy = calcMbsurfMoy(usage, smoylgt, bbioMoyen);

  // Mbsurf_tot — Source : Chap. III §I, tableaux Mbsurf_tot par usage
  const mbsurfTot = calcMbsurfTot(usage, sref, anneePC);

  // Mbbruit — Source : Chap. III §I, tableaux Mbbruit par usage
  // getMbbruit gère les valeurs scalaires et les tables zonales (usages 1, 2, 6, 7, 12)
  const cleBruit = _normaliseBruit(bruit);
  const mbbruit  = getMbbruit(usage, cleBruit, zone);

  // MbHSP :
  //  - Avant 01/07/2026 (RE2020 initial) : MbHSP = 0,30 × (HSPmoy − 2,5) si HSPmoy > 2,5 m
  //    Source : Annexe R.172-4 initiale, Chap. III §I
  //  - À partir du 01/07/2026 : nouvelles formules par usage (MIN(HSPmoy;2,9)/2,5−1)
  //    Source : Décret n°2026-200, Chap. III §I
  let mbhsp;
  if (decretJO2026) {
    mbhsp = calcMbHSP(usage, hsp, sref);
  } else {
    mbhsp = (hsp > 2.5) ? Math.round(0.30 * (hsp - 2.5) * 10000) / 10000 : 0;
  }

  const sommeM = mbgeo + mbcombles + mbsurfMoy + mbsurfTot + mbbruit + mbhsp;
  const valeur = Math.round(bbioMoyen * (1 + sommeM));

  return {
    valeur,
    coefficients: {
      bbioMaxMoyen: bbioMoyen,
      mbgeo,
      mbcombles,
      mbsurfMoy,
      mbsurfTot,
      mbbruit,
      mbhsp,
      sommeModulations: Math.round(sommeM * 10000) / 10000,
    },
    sources: [
      decretJO2026
        ? 'Bbio_max = Bbio_maxmoyen × (1 + Mbgéo + Mbcombles + Mbsurf_moy + Mbsurf_tot + Mbbruit + MbHSP) [Décret 2026-200]'
        : 'Bbio_max = Bbio_maxmoyen × (1 + Mbgéo + Mbcombles + Mbsurf_moy + Mbsurf_tot + Mbbruit + MbHSP)',
      'Annexe R.172-4, Chap. III §I',
    ],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// FONCTION 2 — Cep,nr_max
// Cep,nr_max = Cep,nr_maxmoyen × (1 + Mcgéo + Mccombles + Mcsurf_moy + Mcsurf_tot + Mccat)
// Source : Annexe R.172-4, Chap. III §II
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calcule Cep,nr_max.
 *
 * @param {object} params
 * @param {number}  params.usage         - numéro d'usage
 * @param {number}  params.anneePC       - année du permis de construire
 * @param {string}  params.zone          - zone climatique
 * @param {number}  params.altitude      - altitude (m)
 * @param {number}  params.sref          - surface de référence (m²)
 * @param {number} [params.smoylgt=0]    - surface moyenne logements (m²)
 * @param {string} [params.categorie]    - catégorie de contrainte ('cat1'|'cat2'|'cat3')
 *
 * @returns {{ valeur: number, coefficients: object, sources: string[] }}
 */
function calculerCepnrmax(params) {
  validerParamsBase(params);
  const { usage } = params;
  const { mcgeo, mccombles, mcsurfMoy, mcsurfTot, mccat, mchsp, sommeM, cepNrMoyen } = _coeffsMc(params);

  const valeur = Math.round(cepNrMoyen * (1 + sommeM));

  return {
    valeur,
    coefficients: {
      cepNrMaxMoyen: cepNrMoyen,
      mcgeo,
      mccombles,
      mcsurfMoy,
      mcsurfTot,
      mccat,
      mchsp,
      sommeModulations: Math.round(sommeM * 10000) / 10000,
    },
    sources: [
      'Cep,nr_max = Cep,nr_maxmoyen × (1 + Mcgéo + Mccombles + Mcsurf_moy + Mcsurf_tot + Mccat + McHSP)',
      'Annexe R.172-4, Chap. III §II',
    ],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// FONCTION 3 — Cep_max
// Cep_max = Cep_maxmoyen × (1 + Mcgéo + Mccombles + Mcsurf_moy + Mcsurf_tot + Mccat)
// Source : Annexe R.172-4, Chap. III §II
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calcule Cep_max.
 *
 * @param {object} params - mêmes paramètres que calculerCepnrmax
 * @returns {{ valeur: number, coefficients: object, sources: string[] }}
 */
function calculerCepmax(params) {
  validerParamsBase(params);
  const { usage } = params;
  const cepMaxMoyen = CEP_MAX_MOYEN[usage];
  const { mcgeo, mccombles, mcsurfMoy, mcsurfTot, mccat, mchsp, sommeM } = _coeffsMc(params);

  const valeur = Math.round(cepMaxMoyen * (1 + sommeM));

  return {
    valeur,
    coefficients: {
      cepMaxMoyen,
      mcgeo,
      mccombles,
      mcsurfMoy,
      mcsurfTot,
      mccat,
      mchsp,
      sommeModulations: Math.round(sommeM * 10000) / 10000,
    },
    sources: [
      'Cep_max = Cep_maxmoyen × (1 + Mcgéo + Mccombles + Mcsurf_moy + Mcsurf_tot + Mccat + McHSP)',
      'Annexe R.172-4, Chap. III §II',
    ],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// FONCTION 4 — Icénergie_max
// Icénergie_max = Icénergie_maxmoyen × (1 + Mcgéo + Mccombles + Mcsurf_moy + Mcsurf_tot + Mccat)
// Source : Annexe R.172-4, Chap. III §II
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calcule Icénergie_max.
 *
 * @param {object}  params
 * @param {number}  params.usage        - numéro d'usage
 * @param {number}  params.anneePC      - année du permis de construire
 * @param {string}  params.zone         - zone climatique
 * @param {number}  params.altitude     - altitude (m)
 * @param {number}  params.sref         - surface de référence (m²)
 * @param {number} [params.smoylgt=0]   - surface moyenne logements (m²)
 * @param {string} [params.categorie]   - catégorie de contrainte
 * @param {boolean}[params.rcu=false]   - raccordé réseau de chaleur urbain classé
 *
 * @returns {{ valeur: number|null, coefficients: object, sources: string[] }}
 * Retourne valeur=null si aucune exigence n'est applicable pour l'usage et la période.
 */
function calculerIcenergiemax(params) {
  validerParamsBase(params);
  const { usage, anneePC, rcu = false } = params;

  const plage    = getPlagePeriodeIcenergie(anneePC);
  const cleRcu   = rcu ? 'rcu' : 'autres';
  const icMoyen  = ICENERGIE_MAX_MOYEN[usage]?.[plage]?.[cleRcu] ?? null;

  if (icMoyen === null) {
    return {
      valeur: null,
      coefficients: { icEnergieMaxMoyen: null, plage, raccordementRCU: cleRcu },
      sources: [
        `Pas d'exigence Icénergie_max pour l'usage ${usage} en période ${plage} (${cleRcu}).`,
        'Annexe R.172-4, Chap. III §II',
      ],
    };
  }

  const { mcgeo, mccombles, mcsurfMoy, mcsurfTot, mccat, mchsp, sommeM } = _coeffsMc(params);
  const valeur = Math.round(icMoyen * (1 + sommeM));

  return {
    valeur,
    coefficients: {
      icEnergieMaxMoyen: icMoyen,
      plage,
      raccordementRCU: cleRcu,
      mcgeo,
      mccombles,
      mcsurfMoy,
      mcsurfTot,
      mccat,
      mchsp,
      sommeModulations: Math.round(sommeM * 10000) / 10000,
    },
    sources: [
      'Icénergie_max = Icénergie_maxmoyen × (1 + Mcgéo + Mccombles + Mcsurf_moy + Mcsurf_tot + Mccat + McHSP)',
      'Annexe R.172-4, Chap. III §II',
    ],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// FONCTION 5 — Icconstruction_max
// Icconstruction_max = Icconstruction_maxmoyen × (1 + Micombles + Misurf_moy + Misurf_tot)
//                    + Migéo + Miinfra + Mivrd + Mipv + Mided
// Source : Annexe R.172-4, Chap. III §III
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calcule Icconstruction_max.
 *
 * @param {object}  params
 * @param {number}  params.usage             - numéro d'usage
 * @param {number}  params.anneePC           - année du permis de construire
 * @param {string}  params.zone              - zone climatique
 * @param {number}  params.altitude          - altitude (m)
 * @param {number}  params.sref              - surface de référence (m²)
 * @param {number} [params.smoylgt=0]        - surface moyenne logements (m²) — usages 1-2
 * @param {number} [params.scombles=0]       - surface combles aménagés (m²) — usage 1
 * @param {number} [params.hsp=0]            - HSPmoy en mètres (JO 2026)
 * @param {number} [params.sagrementExt=0]   - Surface d'agrément extérieur (m²) — usage 2, JO 2026
 * @param {boolean}[params.igh=false]        - Immeuble de Grande Hauteur (JO 2026, anneePC ≥ 2028)
 * @param {boolean}[params.rcu=false]        - Raccordé réseau de chaleur urbain classé
 * @param {boolean}[params.climatise=false]  - Bâtiment climatisé
 * @param {number} [params.icLot1=0]         - impact lot 1 VRD (kg éq. CO2/m²)
 * @param {number} [params.icLot2=0]         - impact lot 2 fondations/infrastructure (kg éq. CO2/m²)
 * @param {number} [params.icLot13=0]        - impact lot 13 PV (kg éq. CO2/m²)
 * @param {number} [params.icDed=0]          - impact données environnementales par défaut (kg éq. CO2/m²)
 * @param {boolean}[params.apresJuillet2026] - PC déposé à partir du 01/07/2026 (décret 2026-200)
 *
 * @returns {{ valeur: number|null, coefficients: object, sources: string[] }}
 * Retourne valeur=null si aucune exigence n'est applicable pour l'usage et la période.
 */
function calculerIcconstructionmax(params) {
  validerParamsBase(params);
  const {
    usage, anneePC, zone, altitude, sref,
    smoylgt      = 0,
    scombles     = 0,
    hsp          = 0,
    sagrementExt = 0,
    igh          = false,
    rcu          = false,
    climatise    = false,
    icLot1       = 0,
    icLot2       = 0,
    icLot13      = 0,
    icDed        = 0,
    apresJuillet2026,
  } = params;

  const decretJO2026 = appliqueDecretJO2026(anneePC, apresJuillet2026);
  const plage        = getPlagePeriode(anneePC);

  // Icconstruction_maxmoyen — avec dérogation IGH 95 % à partir de 2028 (JO 2026)
  const icMoyen = getIcconstructionMoyen(usage, anneePC, igh, decretJO2026);

  if (icMoyen === null) {
    return {
      valeur: null,
      coefficients: { icConstructionMaxMoyen: null, plage },
      sources: [
        `Pas d'exigence Icconstruction_max pour l'usage ${usage} en période ${plage}.`,
        'Annexe R.172-4, Chap. III §III',
      ],
    };
  }

  // Micombles — Source : Chap. III §III, formule Micombles (usage 1 uniquement)
  const micombles = (usage === 1 && scombles > 0) ? calcMicombles(scombles, sref) : 0;

  // Misurf_moy — Source : Chap. III §III, tableaux Misurf_moy (usages 1-2)
  const misurfMoy = calcMisurfMoy(usage, smoylgt, icMoyen);

  // Misurf_tot — dérogation IGH à partir du 01/07/2026 (Décret n°2026-200)
  // Source : Chap. III §III, tableaux Misurf_tot par usage
  let misurfTot = calcMisurfTot(usage, sref);
  if (decretJO2026 && igh) {
    const misurfTotIGH = calcMisurfTotIGH(usage);
    if (misurfTotIGH !== null) misurfTot = misurfTotIGH;
  }

  // Partie multiplicative
  const partieMulti = icMoyen * (1 + micombles + misurfMoy + misurfTot);

  // Migéo — Source : Chap. III §III, tableaux Migéo (valeur absolue kg éq. CO2/m²)
  const tranche = getTrancheAltitude(altitude);
  const migeo   = getMigeo(usage, zone, tranche);

  // Miinfra — Source : Chap. III §III, formule Miinfra (fondations/sous-sol)
  const miinfra = calcMiinfra(icLot2, usage);

  // Mivrd — Source : Chap. III §III, formule Mivrd (voirie et réseaux divers)
  const mivrd = calcMivrd(icLot1, usage);

  // Mipv — Source : Chap. III §III, formule Mipv (panneaux photovoltaïques)
  const mipv = calcMipv(icLot13);

  // Mided — Source : Chap. III §III, formule Mided (données environnementales par défaut)
  const mided = calcMided(icDed, anneePC, usage);

  // Termes additifs JO 2026 — Décret n°2026-200, Chap. III §III
  let miHSP = 0, miagrementExt = 0, miclimRCU = 0;
  if (decretJO2026) {
    miHSP        = calcMiHSP(usage, hsp);
    miagrementExt = calcMiagrementExt(usage, sagrementExt, sref);
    miclimRCU    = calcMiclimRCU(rcu, climatise);
  }

  const partieAdditive = migeo + miinfra + mivrd + mipv + mided + miHSP + miagrementExt + miclimRCU;
  const valeur = Math.round(partieMulti + partieAdditive);

  const coefficients = {
    icConstructionMaxMoyen: icMoyen,
    plage,
    ighApplique: decretJO2026 && igh && anneePC >= 2028,
    // Termes multiplicatifs
    micombles,
    misurfMoy,
    misurfTot,
    partieMultiplicative: Math.round(partieMulti * 10) / 10,
    // Termes additifs (kg éq. CO2/m²)
    migeo,
    miinfra,
    mivrd,
    mipv,
    mided,
  };
  if (decretJO2026) {
    coefficients.miHSP         = miHSP;
    coefficients.miagrementExt = miagrementExt;
    coefficients.miclimRCU     = miclimRCU;
  }
  coefficients.partieAdditive = Math.round(partieAdditive * 10) / 10;

  return {
    valeur,
    coefficients,
    sources: [
      decretJO2026
        ? 'Icconstruction_max = Icconstruction_maxmoyen × (1 + Mi_mult) + Migéo + Miinfra + Mivrd + Mipv + Mided + MiHSP + Miagrément_ext + Miclim_RCU [Décret 2026-200]'
        : 'Icconstruction_max = Icconstruction_maxmoyen × (1 + Micombles + Misurf_moy + Misurf_tot) + Migéo + Miinfra + Mivrd + Mipv + Mided',
      'Annexe R.172-4, Chap. III §III',
    ],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// FONCTION 6 — DH_max
// DH_max = DH_maxcat  (pas de modulation supplémentaire)
// Source : Annexe R.172-4, Chap. III §IV
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Table des alias DH_MAXCAT : usage → usage de référence.
 * Usages sans entrée propre dans DH_MAXCAT partagent la table d'un autre usage.
 */
const _DH_ALIASES = { 5: 4, 9: 8, 11: 10, 28: 25 };

/**
 * Calcule DH_max.
 *
 * @param {object}  params
 * @param {number}  params.usage          - numéro d'usage
 * @param {number}  params.anneePC        - année du permis de construire
 * @param {string}  params.zone           - zone climatique
 * @param {number}  params.altitude       - altitude (m)
 * @param {number}  params.sref           - surface de référence (m²)
 * @param {string} [params.categorie]     - catégorie de contrainte ('cat1'|'cat2'|'cat3')
 * @param {boolean}[params.climatise]     - true si la partie de bâtiment est climatisée
 * @param {number} [params.smoylgt=50]    - surface moyenne logements (m²) — usage 2 uniquement
 *
 * @returns {{ valeur: number|null, coefficients: object, sources: string[] }}
 * Retourne valeur=null pour les catégories sans seuil (cat3 la plupart des usages).
 */
function calculerDHmax(params) {
  validerParamsBase(params);
  const { usage, zone, climatise = false, smoylgt = 50, categorie } = params;

  const cat           = _normaliseCategorie(categorie);
  const zonesChaudes  = (zone === 'H2d' || zone === 'H3');
  const cleClim       = (zonesChaudes && climatise) ? 'climH2dH3' : 'nonClim';

  let valeur = null;

  if (usage === 2) {
    // Logements collectifs — formule tabulée selon Smoylgt
    // Source : Chap. III §IV, formule LC
    valeur = calcDHmax_LC(cat, zone, climatise, smoylgt);
  } else {
    // Résolution de l'alias si nécessaire
    const refUsage  = _DH_ALIASES[usage] ?? usage;
    const entree    = DH_MAXCAT[refUsage];
    if (!entree || entree === 'formule_LC') {
      valeur = null;
    } else {
      const catEntry = entree[cat];
      if (catEntry === null || catEntry === undefined) {
        valeur = null; // pas de seuil pour cette catégorie
      } else {
        valeur = catEntry[cleClim] ?? catEntry['nonClim'] ?? null;
      }
    }
  }

  return {
    valeur,
    coefficients: {
      categorie: cat,
      zone,
      climatise,
      zonesChaudes,
      smoylgt: (usage === 2) ? smoylgt : null,
    },
    sources: [
      'DH_max = DH_maxcat (pas de modulation supplémentaire)',
      'Annexe R.172-4, Chap. III §IV',
    ],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// FONCTION 7 — calculerTout
// Calcule tous les seuils RE2020 applicables en une seule passe.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calcule l'ensemble des seuils RE2020 pour un projet donné.
 *
 * @param {object} params - réunion de tous les paramètres des 6 fonctions individuelles
 * @returns {{
 *   resultats: {
 *     bbiomax:          object,
 *     cepnrmax:         object,
 *     cepmax:           object,
 *     icenergiemax:     object,
 *     icconstructionmax:object,
 *     dhmax:            object,
 *   },
 *   erreurs: object
 * }}
 */
function calculerTout(params) {
  const resultats = {};
  const erreurs   = {};

  const calculs = [
    ['bbiomax',           calculerBbiomax],
    ['cepnrmax',          calculerCepnrmax],
    ['cepmax',            calculerCepmax],
    ['icenergiemax',      calculerIcenergiemax],
    ['icconstructionmax', calculerIcconstructionmax],
    ['dhmax',             calculerDHmax],
  ];

  for (const [cle, fn] of calculs) {
    try {
      resultats[cle] = fn(params);
    } catch (e) {
      erreurs[cle] = e.message;
    }
  }

  return { resultats, erreurs };
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculerBbiomax,
    calculerCepnrmax,
    calculerCepmax,
    calculerIcenergiemax,
    calculerIcconstructionmax,
    calculerDHmax,
    calculerTout,
  };
} else if (typeof window !== 'undefined') {
  // Expose les fonctions du moteur dans le scope global pour le script inline du HTML
  window.calculerTout             = calculerTout;
  window.calculerBbiomax          = calculerBbiomax;
  window.calculerCepnrmax         = calculerCepnrmax;
  window.calculerCepmax           = calculerCepmax;
  window.calculerIcenergiemax     = calculerIcenergiemax;
  window.calculerIcconstructionmax = calculerIcconstructionmax;
  window.calculerDHmax            = calculerDHmax;
}

})(); // fin IIFE re2020-engine
