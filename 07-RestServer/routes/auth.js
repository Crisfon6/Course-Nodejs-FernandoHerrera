const { Router } = require('express');
const { check } = require('express-validator');
const { login, loginGoogle } = require('../controllers/auth');
const { validatePlaces } = require('../middlewares/validate-places');

const router = Router();

router.post('/login', [
    check('email', 'email is mandatory').isEmail(),
    check('email', 'email is mandatory').not().isEmpty(),
    check('password', 'password is mandatory').not().isEmpty(),
    validatePlaces
], login);

router.post('/google', [
    // check('idtoken', 'The idtoken is mandatory').not().isEmpty(),
    // validatePlaces
], loginGoogle);
module.exports = router;