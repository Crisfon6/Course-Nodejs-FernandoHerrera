const fs = require('fs');
const path = './db/data.json';
const save = (data) => {
    fs.writeFileSync(path, JSON.stringify(data));
}
const readDB = () => {
    if (!fs.existsSync(path)) {
        return null;
    }
    const info = fs.readFileSync(path, { encoding: 'utf8' });
    console.log(info)
    return JSON.parse(info);
}
module.exports = {
    save,
    readDB
};