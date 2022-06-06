const description = {
    demand: true,
    alias: 'd'
}
const completed = {
    default: true,
    alias: 'c',
    desc: 'Mark task completed'
}

let create = {
    description
}
let list = {

};
let update = {
    description,
    completed
};
let remove = {
    description,
}
const argv = require('yargs').command("create", "Create task", create)
    .command('list', 'List all your tasks', list)
    .command('update', 'update tasks', update)
    .command('remove', 'remove task', remove)
    .help()
    .argv;

module.exports = {
    argv
}