const axios = require('axios');
const { request, response} = require('express');


const getClimaCiudadID = async (req = request, res = response) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather`;
        const id = req.query.ciudadID;
        const respuesta = await axios.get(url, {params:{id: id, appid: process.env.API_KEY }},);
        const datosClima = respuesta.data;

        res.status(respuesta.status).json(datosClima);
        console.log('respuesta exitosa con codigo:', respuesta.status)
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'error, asegurese de pasar bien los parametros' });
    }
};


const getClimaCiuad = async (req = request, res = response) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather`;
        const ciudad = req.query.ciudad;
        const respuesta = await axios.get(url, {
            params: {
            q: ciudad,
            appid: process.env.API_KEY,
            lang:"es",
            units: 'metric',
            },
        });
        const datosClima = respuesta.data;

        const filteredData = {
            weather: {
                main: datosClima.weather[0].main,
                description: datosClima.weather[0].description
            },
            main: {
                temp: datosClima.main.temp,
                feels_like: datosClima.main.feels_like,
                humidity: datosClima.main.humidity
            },
            wind: {
                speed: datosClima.wind.speed
            },
            name: datosClima.name,
            cod: datosClima.cod
        };
        res.status(200).json(filteredData);
        console.log('respuesta exitosa con codigo:', respuesta.status)
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'error, asegurese de pasar bien los parametros' });
    }
};


const getClimaSemanal = async (req = request, res = response) => {
    try {
        const url = 'https://api.openweathermap.org/data/2.5/forecast';
        const ciudad = req.query.ciudad;
        const respuesta = await axios.get(url, {
            params: {
            q: ciudad,
            cnt: 7,
            appid: process.env.API_KEY,
            lang:"es",
            units: 'metric'
            }
        });
        const datosClima = respuesta.data;

        const filteredData = {
            cod: datosClima.cod,
            list: datosClima.list.slice(0, 7).map(item => ({
                main: {
                    temp_min: item.main.temp_min,
                    temp_max: item.main.temp_max,
                    humidity: item.main.humidity
                },
                weather: {
                    main: item.weather[0].main,
                    description: item.weather[0].description
                },
                wind: {
                    speed: item.wind.speed
                }
            })),
            city: {
                name: datosClima.city.name
            }
        };
        res.status(200).json(filteredData);
        console.log('respuesta exitosa con codigo:', respuesta.status)
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'error, asegurese de pasar bien los parametros' });
    }
};


module.exports = {
    getClimaCiudadID,
    getClimaCiuad,
    getClimaSemanal
};