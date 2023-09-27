const {Router} = require('express');
const { getClimaCiudadID, getClimaCiuad, getClimaSemanal } = require('../controllers/controllers');

const rutas = Router();

rutas.get("/ciudadID", getClimaCiudadID);
rutas.get("/ciudad", getClimaCiuad);
rutas.get("/ciudad/semanal", getClimaSemanal);

module.exports = rutas;

