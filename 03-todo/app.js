const { argv } = require("./config/yargs");
const { create, getTasks, update, removeTask } = require('./controller/controller');
const colors = require('colors');

switch (argv._[0]) {
    case ('update'):
        let updated = update(argv.d, argv.c);
        console.log(updated);
        break;
    case ('list'):
        let listTodo = getTasks();
        listTodo.forEach((task) => {
            console.log("=========To Do========".green);
            console.log(`Task: ${task.description}`);
            console.log(`Completed: ${task.completed}`);
            console.log("======================".green);
        });
        break;
    case ('remove'):
        console.log(removeTask(argv.d));
        break;
    case ('create'):
        console.log(create(argv.d));

        break;
}