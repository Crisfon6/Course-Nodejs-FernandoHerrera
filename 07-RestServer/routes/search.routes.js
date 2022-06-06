const { Router } = require('express');
const { search } = require('../controllers/search.ctrl');

const router = Router();


router.get('/:collection/:mean', [

], search);


module.exports = router;