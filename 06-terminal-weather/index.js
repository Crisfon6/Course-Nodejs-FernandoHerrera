const { readInput, inquirerMenu, pauseMenu, listChoices } = require("./helpers/inquirer");
const { save } = require("./helpers/save_file");
const Search = require('./models/search');
require('dotenv').config();
require('colors');
const main = async() => {
    let opt = 0;
    const search = new Search();

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                console.log('Search city');
                let mean = await readInput('Enter the place name: ');
                let cities = await search.searchCity(mean);
                if (!cities.length > 0) {
                    console.log('No results found'.red.bold);
                    await pauseMenu();
                    continue;
                };
                let placeSelected = await listChoices(cities);
                placeSelected = cities.find(city => city.id === placeSelected);
                search.addHistory(placeSelected.name);
                let weather = await search.searchWeather(placeSelected.lat, placeSelected.lng);
                // console.log(weather.main)
                console.log('\nInfo of the city:\n '.green);
                console.log('City : ' + placeSelected.name);
                console.log('Lat : ' + placeSelected.lat)
                console.log('Long :' + placeSelected.lng);
                console.log('Desc : ' + weather.desc);
                console.log('Temperature :' + weather.temp)
                console.log('Min :' + weather.min);
                console.log('Max :' + weather.max);

                break;
            case 2:
                console.clear();
                console.log('History');
                search.historyCapitalized.forEach((place, index) => {
                    console.log(`${index+1}. ${place}`);
                });
                break;
            case 3:
                console.log('Exit');
                break;
        }
        if (opt !== 3) await pauseMenu();

    }
    while (opt !== 3);
    save(search.history);
};
main();