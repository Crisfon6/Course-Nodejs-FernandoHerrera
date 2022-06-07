const { v4: uuidv4 } = require('uuid');
class Task {
    id = '';
    desc = '';
    doneAt = '';

    constructor(desc) {
        this.id = uuidv4();
        this.desc = desc;
        this.doneAt = null
    }
}
module.exports = Task;