const { Router } = require('express');
const { validateJWT, validatePlaces } = require('../middlewares');
const { haveRole } = require('../middlewares/validate-roles');
const { productExist, categoryExist } = require('../helpers/db-validators');

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/product.ctrl');
const { check } = require('express-validator');




const router = Router();
//get all categorys
router.get('/', getAllProducts);
//get one category by id
router.get('/:id', [
    check('id').isMongoId(),
    check('id').custom(productExist),
    validatePlaces
], getProductById);

// create category
router.post('/', [
    validateJWT,
    check('name').not().isEmpty(),
    check('price').not().isEmpty(),
    check('price').isNumeric(),
    check('category').custom(categoryExist),
    check('category').isMongoId(),
    check('description').isString(),
    validatePlaces,
], createProduct);


//update category
router.put('/:id', [
    validateJWT,
    check('id').isMongoId(),
    check('id').custom(productExist),

    validatePlaces
], updateProduct);

//delete category
router.delete('/:id', [
    validateJWT,
    check('id').custom(productExist),
    check('id').isMongoId(),
    haveRole('ADMIN_ROLE'),

    validatePlaces

], deleteProduct);

module.exports = router;