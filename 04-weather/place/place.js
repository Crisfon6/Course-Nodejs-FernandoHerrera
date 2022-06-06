const axios = require('axios');
const config = require('../config.json');



const getPlaceLatLong = async(address) => {

    // const encodeUrl = encodeURI(argv.address);


    const instance = axios.create({
        baseURL: `http://api.positionstack.com/v1/forward?access_key=${config['access_key_place']}&query=${address}`,
    });
    const resp = await instance.get();

    if (resp.data.data.length == 0) {
        throw new Error(`No result for: ${address}`);
    }
    const data = resp.data.data[0];
    const { label, latitude, longitude } = data;
    return {
        name: label,
        lat: latitude,
        long: longitude
    }

}

module.exports = {
    getPlaceLatLong
}