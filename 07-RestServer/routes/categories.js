const { Router } = require("express");
const { validateJWT, validatePlaces } = require("../middlewares");
const { haveRole } = require("../middlewares/validate-roles");
const { categoryExist } = require("../helpers/db-validators");

const {
    getAllCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/category");
const { check } = require("express-validator");
const router = Router();
//get all categorys
router.get("/", getAllCategory);
//get one category by id
router.get(
    "/:id", [check("id").isMongoId(), check("id").custom(categoryExist), validatePlaces],
    getCategoryById
);

// create category
router.post(
    "/", [validateJWT, check("name").not().isEmpty(), validatePlaces],
    createCategory
);
//update category
router.put(
    "/:id", [
        validateJWT,
        check("id").isMongoId(),
        check("name").not().isEmpty(),
        validatePlaces,
    ],
    updateCategory
);

//delete category
router.delete(
    "/:id", [
        validateJWT,
        check("id").isMongoId(),
        haveRole("ADMIN_ROLE"),
        validatePlaces,
    ],
    deleteCategory
);

module.exports = router;