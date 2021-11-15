
const { Router } = require("express")
const { check } = require("express-validator")
const { get, getById, deleteCategory, post, put } = require("../controllers/category.controller")
const { isCategoryExist } = require("../helpers/db-validators")
const { validateJWT, validateFields, esAdmin } = require("../middlewares")

const router = Router()

router.get("/", get)

router.get("/:id", [
    check('id','El campo es requerido'),
    check('id').custom( isCategoryExist),
    validateFields
],getById)

router.post("/", [
    validateJWT,
    check('name','El nombre es requerido').not().isEmpty(),
    validateFields
],post)

router.put("/:id", [
    validateJWT,
    check('name','El nombre es requerido'),
    check('id','El campo es requerido'),
    check('id').custom( isCategoryExist),
    validateFields
],put)

router.delete("/:id", [
    validateJWT,
    esAdmin,
    check('id','El campo es requerido'),
    check('id').custom( isCategoryExist),
    validateFields
],deleteCategory)

module.exports = router