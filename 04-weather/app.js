const place = require('./place/place');
const weather = require('./weather/weather');
const argv = require('yargs').options({
    address: {
        alias: 'a',
        desc: 'addres for get the weather',
        demand: true
    }
}).argv;
const getInfo = async(address) => {
    try {


        const coo = await place.getPlaceLatLong(address);

        const temp = await weather.getWeather(coo.lat, coo.long);

        return `The Weather for lat:  ${coo.lat} and long: ${coo.long}, is ${temp.temp}°`;

    } catch (e) {
        return `Cant resolve Weather for ${coords}`;
    }



}
getInfo(argv.address).then(resp => console.log(resp)).catch(err => console.log(err));