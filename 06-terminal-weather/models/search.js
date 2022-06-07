const axios = require("axios");
const { readDB } = require("../helpers/save_file");


class Search {
    history = [];
    constructor() {
        //TODO: read from db
        let history = readDB();
        if (history) {
            this.history = history;
        }
    }
    get paramsMapBox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 6,
            'language': 'es',
            'types': 'place'
        }
    }

    async searchCity(place = '') {
        //http request
        try {

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapBox
            });
            const resp = await instance.get();
            return resp.data.features.map(place => ({
                    id: place.id,
                    name: place.place_name,
                    lat: place.center[0],
                    lng: place.center[1],

                })

            );

        } catch (err) {
            return [];
        }
    }
    paramsOpenWeather(lat, lon) {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            lat,
            lon,
            'units': 'metric'
        }
    }
    async searchWeather(lat = 0, lng = 0) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: this.paramsOpenWeather(lat, lng)
            });
            const resp = await instance.get();
            const main = resp.data.main;
            const weather = resp.data.weather[0];

            return {
                desc: weather.description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            };
        } catch (err) {
            console.log(err)
            return [];
        }

    }
    get historyCapitalized() {
        return this.history.map(city => {
            let words = city.split(' ');
            words = words.map(word => word[0].toUpperCase() + word.slice(1));
            return words.join(' ');
        });
    }
    addHistory(city = '') {

        if (this.history.includes(city.toLocaleLowerCase())) {
            return;
        }
        this.history = this.history.splice(0, 5);
        this.history.unshift(city.toLocaleLowerCase());


    }
}
module.exports = Search;