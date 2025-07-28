const axios = require('axios');
const { request, response } = require('express');


const getClimaActualPorUbicacion = async (req = request, res = response) => {
    try {
        const { lat, lon } = req.query;

        if (!lat || !lon) {
            return res.status(400).json({ error: "Debe proporcionar latitud y longitud" });
        }

        const oneCallUrl = "https://api.openweathermap.org/data/3.0/onecall";
        const climaResponse = await axios.get(oneCallUrl, {
            params: {
                lat,
                lon,
                exclude: "minutely", // <--- Esto excluye el bloque minutely
                appid: process.env.API_KEY,
                lang: "es",
                units: "metric",
            },
        });

        // Retorna toda la respuesta de OpenWeatherMap
        res.status(200).json(climaResponse.data);
        console.log("Clima completo consultado correctamente");
    } catch (error) {
        console.error("Error:", error.message);
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else {
            res.status(500).json({ error: "Error interno al obtener el clima" });
        }
    }
};


const getCiudadPorUbicacion = async (req = request, res = response) => {
    try {
        const { lat, lon } = req.query;

        if (!lat || !lon) {
            return res.status(400).json({ error: "Debe proporcionar latitud y longitud" });
        }

        // Usamos Nominatim (OpenStreetMap) para reverse geocoding
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
        const geoResp = await axios.get(url, {
            headers: { 'User-Agent': 'ExpressClimaApp' }
        });

        const address = geoResp.data.address || {};
        const ciudad = address.city || address.town || address.village || address.state || geoResp.data.display_name;

        res.status(200).json({ ciudad });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Error al obtener el nombre de la ciudad" });
    }
};

module.exports = {
    getClimaActualPorUbicacion,
    getCiudadPorUbicacion
};