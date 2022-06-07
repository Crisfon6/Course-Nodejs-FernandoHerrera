const { pauseMenu, inquirerMenu, readInput, listDeleteTasks, confirm, listCheckTasks } = require('./helpers/inquirer');
const { save, readDB } = require('./helpers/save_file');


const Tasks = require('./models/tasks');

require('colors')
const main = async() => {
    let opt = '';

    const taskLoaded = readDB();
    const tasks = new Tasks();
    if (taskLoaded) {

        tasks.loadTasks(taskLoaded);

    }
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await readInput('Description')
                tasks.createTask(desc);
                break;
            case '2':
                console.log(tasks.listAllTask);
                break;
            case '3':
                console.log(tasks.listCompleteAndPending(true));
                break;
            case '4':
                console.log(tasks.listCompleteAndPending(false));
                break;
            case '5':
                let tasksSelected = await listCheckTasks(tasks.listTasks);
                tasks.toggleCompletes(tasksSelected);
                break;
            case '6':
                let id = await listDeleteTasks(tasks.listTasks);
                if (id !== '0') {
                    const ok = await confirm('Are you sure to delete this task?');
                    if (ok) {
                        tasks.deleteTask(id);
                    }
                }
                break;
        }
        save(tasks._lists);

        if (opt !== '0') await pauseMenu();
    } while (opt !== '0');
};
main();