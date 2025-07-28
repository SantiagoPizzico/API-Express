const {Router} = require('express');
const { getClimaActualPorUbicacion, getCiudadPorUbicacion } = require('../controllers/controllers');

const rutas = Router();

rutas.get("/actual/ubicacion", getClimaActualPorUbicacion);
rutas.get('/ciudad/ubicacion', getCiudadPorUbicacion);

module.exports = rutas;

