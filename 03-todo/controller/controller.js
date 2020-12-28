const fs = require('fs');

let listToDo = [];

const saveDb = () => {
    let data = JSON.stringify(listToDo);
    fs.writeFile('./db/data.json', data, (err) => {
        if (err) {
            throw new Error("Error saving");
        }
    });
}
const cargarDb = () => {
    try {

        listToDo = require('../db/data.json');
    } catch (error) {
        listToDo = []
    }
}

const create = (description) => {
    cargarDb()
    let toDo = {
        description,
        completed: false
    };
    listToDo.push(toDo);
    saveDb();
    return toDo;
}
const getTasks = () => {
    cargarDb()
    return listToDo;
}
const removeTask = (description) => {
    cargarDb();


    let newListToDo = listToDo.filter(task => {
        return task.description != description
    });
    if (listToDo.length === newListToDo.length) {
        return false;
    } else {
        listToDo = newListToDo;
        saveDb();
        return true;
    }

}
const update = (description, completed = true) => {
    cargarDb();
    let index = listToDo.findIndex(task => task.description === description);
    if (index >= 0) {
        listToDo[index].completed = completed;
        saveDb();
        return true;
    } else {
        return false;
    }

}

module.exports = {
    create,
    cargarDb,
    getTasks,
    update,
    removeTask
}