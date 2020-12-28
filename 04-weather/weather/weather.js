const axios = require('axios');
const config = require('../config.json');
const getWeather = async(lat, long) => {
    const resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${config['access_key_weather']}&units=metric`);
    const data = resp.data;
    const { main, description } = data.weather[0];
    const { temp } = data.main;

    return {
        main,
        description,
        temp
    }

}
module.exports = {
    getWeather
}