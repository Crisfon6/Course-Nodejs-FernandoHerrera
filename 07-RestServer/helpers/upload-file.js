const { v4: uuidv4 } = require('uuid');
const path = require('path');


const uploadFile = (files, extValides = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {
    return new Promise((resolve, reject) => {
        // console.log('req.files >>>', files); // eslint-disable-line

        const { file } = files;
        const cutname = file.name.split('.')
        const ext = cutname[cutname.length - 1];

        //ext valide

        if (!extValides.includes(ext)) {
            return reject(`the extension .${ext} is no allowed`);

        }
        //rename images
        const nameTemp = `${uuidv4()}.${ext}`;

        uploadPath = path.join(__dirname, '../uploads/', folder, nameTemp);

        file.mv(uploadPath, (err) => {
            if (err) {
                return reject(err)

            }
            resolve(nameTemp);

        });
    })


}

module.exports = {
    uploadFile
}