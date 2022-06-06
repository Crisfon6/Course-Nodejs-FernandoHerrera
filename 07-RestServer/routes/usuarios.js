const { Router } = require('express');
const { check } = require('express-validator');
const { isValidRole, validateEmailAlreadyRegister, existUserById } = require('../helpers/db-validators');

const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
} = require('../controllers/usuarios');

const {
    validatePlaces,
    validateJWT,
    haveRole,
} = require('../middlewares');

const router = Router();


router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'id no valide').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(isValidRole),
    validatePlaces
], usuariosPut);

router.post('/', [
    check('email', 'The email is no validate').isEmail(),
    check('email').custom(validateEmailAlreadyRegister),
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password is required and should have more that 4 words').isLength({ min: 5 }),
    // check('role','The role isnt valid').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(isValidRole),
    validatePlaces
], usuariosPost);

router.delete('/:id', [
    validateJWT,
    // isAdminRole,
    haveRole('ADMIN_ROLE', 'SELLER_ROLE'),
    check('id', 'id no valide').isMongoId(),
    check('id').custom(existUserById),
    validatePlaces
], usuariosDelete);

router.patch('/', usuariosPatch);





module.exports = router;