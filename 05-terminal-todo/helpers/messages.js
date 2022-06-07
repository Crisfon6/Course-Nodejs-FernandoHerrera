require('colors');

const showMenu = () => {
    return new Promise((resolve, reject) => {

        console.clear();
        console.log('Welcome to the Todo App'.red.bold);
        console.log('==========================================='.green)
        console.log('Select an option:'.green);
        console.log('===========================================\n'.green)

        console.log(`${'1.'.green} Create task`);
        console.log(`${'2.'.green} List tasks`);
        console.log(`${'3.'.green} List completed task`);
        console.log(`${'4.'.green} List pending tasks`);
        console.log(`${'5.'.green} Complete tasks`);
        console.log(`${'6.'.green} Delete tasks`);
        console.log(`${'7.'.green} Exit \n`);

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readLine.question('Select an option: ', (opt) => {
            readLine.close();
            resolve(opt)
        })
    });

}
const pause = () => {
    return new Promise((resolve, reject) => {
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readLine.question(`\n Press ${'Enter'.green.bold} for continue \n`, (opt) => {
            resolve()
            readLine.close();
        });
    });

}
module.exports = {
    showMenu,
    pause
}