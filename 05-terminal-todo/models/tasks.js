const Task = require("./task");

class Tasks {
    _lists = {};
    constructor() {
        this._lists = {};
    }
    createTask(desc = '') {
        const task = new Task(desc);
        this._lists[task.id] = task;

    }
    loadTasks(tasks = {}) {
        this._lists = tasks;
    }
    deleteTask(id) {
        if (this._lists[id]) {
            delete this._lists[id];
        }
    }
    get listTasks() {
        const lists = [];
        Object.keys(this._lists).forEach(key => {
            lists.push(this._lists[key]);
        })
        return lists;
    }
    get listAllTask() {
        let output = '';
        this.listTasks.forEach((task, i) => {
            let status = task.doneAt ? 'Completed'.green : ' Pending'.red;
            output += `${i+1}.` + `${task.desc} :: ` + status + '\n';
        });
        return output;
    }
    listCompleteAndPending(completes = true) {
        let output = '';
        let count = 0;
        this.listTasks.forEach((task) => {

            if (completes && task.doneAt) {
                output += `${count+=1}.` + `${task.desc} :: ` + 'Completed. At: '.green + task.doneAt + '\n';
            } else if (!completes && !task.doneAt) {
                output += `${count+=1}.` + `${task.desc} :: ` + 'Pending'.red + '\n';
            }
        })
        return output;
    }
    toggleCompletes(ids = []) {
        ids.forEach(id => {
            const task = this._lists[id];
            if (!task.doneAt) {
                task.doneAt = new Date().toISOString();
            }
        });
        this.listTasks.forEach(task => {
            if (!ids.includes(task.id)) {
                task.doneAt = null;
            }
        });

    }
}
module.exports = Tasks;