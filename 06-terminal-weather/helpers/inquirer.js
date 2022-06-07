const inquirer = require('inquirer');
require('colors');

const menuOpts = [{
    type: 'list',
    name: 'option',
    messages: 'Select an option:',
    choices: [{
            value: 1,
            name: `${'1.'.green} Search city`
        },
        {
            value: 2,
            name: `${'2.'.green} History`
        },
        {

            value: 3,
            name: `${'3.'.green} Exit`
        },

    ]

}];

const pause = [{
    type: 'input',
    name: 'pause',
    message: `Press ${'ENTER'.green} to continue ...`,
}]
const inquirerMenu = async() => {

    console.clear();
    console.log('Welcome to the Weather App'.red.bold);
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
const listChoices = async(opts = []) => {
    let choices = [];
    opts.forEach((opt, i) => {
        choices.push({
            value: opt.id,
            name: `${i+1}. ${opt.name}`
        });
    });
    choices.unshift({
        value: '0',
        name: `${'0.'.green} Cancel`
    });
    const question = [{
        type: 'list',
        name: 'task',
        message: 'Select : ',
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
    listChoices,
    confirm,
    listCheckTasks
}