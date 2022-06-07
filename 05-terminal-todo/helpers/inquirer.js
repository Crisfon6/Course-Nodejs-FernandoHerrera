const inquirer = require('inquirer');
require('colors');

const menuOpts = [{
    type: 'list',
    name: 'option',
    messages: 'Select an option:',
    choices: [{
            value: '1',
            name: `${'1.'.green} Create task`
        },
        {
            value: '2',
            name: `${'2.'.green} List tasks`
        },
        {

            value: '3',
            name: `${'3.'.green} List completed task`
        },
        {
            value: '4',
            name: `${'4.'.green} List pending tasks`
        },
        {
            value: '5',
            name: `${'5.'.green} Complete tasks`
        }, {
            value: '6',
            name: `${'6.'.green} Delete tasks`
        },
        {
            value: '0',
            name: `${'0.'.red} Exit`
        }
    ]

}];

const pause = [{
    type: 'input',
    name: 'pause',
    message: `Press ${'ENTER'.green} to continue ...`,
}]
const inquirerMenu = async() => {

    console.clear();
    console.log('Welcome to the Todo App'.red.bold);
    console.log('==========================================='.green)
    console.log('Select an option:'.green);
    console.log('===========================================\n'.green)

    const opt = await inquirer.prompt(menuOpts);
    return opt.option;
}
const pauseMenu = async() => {
    const opt = await inquirer.prompt(pause);
    return opt.pause;
}
const readInput = async(message) => {
    const question = [{
        type: 'input',
        message,
        name: 'desc',
        validate: (value) => {
            if (value.length) {
                return true;
            } else {
                return 'Please enter a description';
            }
        }
    }];
    const { desc } = await inquirer.prompt(question);
    return desc
}
const listDeleteTasks = async(tasks = []) => {
    let choices = [];
    tasks.forEach((task, i) => {
        choices.push({
            value: task.id,
            name: `${i+1}. ${task.desc}`
        });
    });
    choices.unshift({
        value: '0',
        name: `${'0.'.green} Cancel`
    });
    const question = [{
        type: 'list',
        name: 'task',
        message: 'Select a task to delete:',
        choices
    }];
    const { task } = await inquirer.prompt(question);
    return task;
}

const listCheckTasks = async(tasks = []) => {
    let choices = [];
    tasks.forEach((task, i) => {
        choices.push({
            value: task.id,
            name: `${i+1}. ${task.desc}`,
            checked: (task.doneAt) ? true : false
        });
    });

    const question = [{
        type: 'checkbox',
        name: 'task',
        message: 'Select tasks:',
        choices
    }];
    const { task } = await inquirer.prompt(question);
    return task;
}
const confirm = async(message) => {
    const question = [{
        type: 'confirm',
        name: 'confirm',
        message
    }];
    return await inquirer.prompt(question);
}
module.exports = {
    inquirerMenu,
    pauseMenu,
    readInput,
    listDeleteTasks,
    confirm,
    listCheckTasks
}