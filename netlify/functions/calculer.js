/**
 * calculer.js — Fonction serverless Netlify
 * Reçoit les paramètres RE2020 via POST JSON, retourne les seuils calculés.
 * Le moteur de calcul (engine/) n'est jamais exposé côté client.
 */
'use strict';

const { calculerTout } = require('../../engine/re2020-engine.js');

const HEADERS_CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

exports.handler = async function (event) {
  /* Pré-vol CORS */
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: HEADERS_CORS, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: HEADERS_CORS,
      body: JSON.stringify({ erreur: 'Méthode non autorisée' }),
    };
  }

  let params;
  try {
    params = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers: HEADERS_CORS,
      body: JSON.stringify({ erreur: 'Corps JSON invalide' }),
    };
  }

  try {
    const resultat = calculerTout(params);
    return {
      statusCode: 200,
      headers: HEADERS_CORS,
      body: JSON.stringify(resultat),
    };
  } catch (e) {
    return {
      statusCode: 422,
      headers: HEADERS_CORS,
      body: JSON.stringify({ erreur: e.message }),
    };
  }
};
