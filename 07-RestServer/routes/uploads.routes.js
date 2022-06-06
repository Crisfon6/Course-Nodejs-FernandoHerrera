const { Router } = require('express');
const { check } = require('express-validator');
const { loadFile, updatePhoto, showImage, updatePhotoCloudDinary } = require('../controllers/upload.ctrl');
const { validatePlaces, validateFile } = require('../middlewares');
const { allowedCollections } = require('../helpers');

const router = Router();

router.post('/', validateFile, loadFile);
router.put('/:collection/:id', [
    validateFile,
    check('id', 'Mandatory mongoID').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validatePlaces
], updatePhotoCloudDinary);

router.get('/:collection/:id', [check('id', 'Mandatory mongoID').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validatePlaces
], showImage);

module.exports = router;