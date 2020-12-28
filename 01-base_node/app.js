const { argv } = require('./config/yargs');
const colors = require('colors');

let command = argv._[0];

switch (command) {
    case 'listar':
        console.log(`Entro en listar ${command}`.red);
        break;
    case 'crear':
        console.log("Entro en crear".green);
        break;
}