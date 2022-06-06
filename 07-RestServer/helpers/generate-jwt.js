const jwt = require('jsonwebtoken');
const generateJWT = (uid = '') => {
    // console.log(uid);
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.SECRETPRIVATEKEY, { expiresIn: '4h' }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Cant generate token');
            } else {
                resolve(token);
            }
        });

    });
}

module.exports = {
    generateJWT
}