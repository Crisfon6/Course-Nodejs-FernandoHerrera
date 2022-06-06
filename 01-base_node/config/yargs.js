/// You can execute severals commands using yargs
// in this file i have 2 commands for use
/// using => node yargs listar --base 3 -l 5
/// listar es el commando que recibe estos dos elementos como params
let listar = { //esto ayuda a crear el --help
    base: {
        demand: true,
        alias: 'b',
        default: 10
    },
    limite: {
        demand: true,
        alias: 'l',

    }
};
let crear = { //esto ayuda a crear el --help
    name: {
        demand: true,
        alias: 'n',
        default: "cristhian"
    },
    typeUser: {
        demand: true,
        alias: 's',

    }
};
const argv =
    require('yargs')
    .command('listar', 'Imprime en console la tabla', listar).command('crear', 'Execute the block create', crear)

.help()
    .argv;

module.exports = {
    argv
};