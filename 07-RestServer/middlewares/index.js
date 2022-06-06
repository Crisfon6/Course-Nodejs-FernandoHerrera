const validatePlaces = require('../middlewares/validate-places');
const validateJwt = require('../middlewares/validate-jwt');
const validateRoles = require('../middlewares/validate-roles');
const validateFile = require('./validate-file');


module.exports = {
    ...validatePlaces,
    ...validateJwt,
    ...validateRoles,
    ...validateFile,
}