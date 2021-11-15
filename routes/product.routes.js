const { Router } = require("express")
const { check } = require("express-validator")
const { get, deleteProduct, getById, post, put } = require("../controllers/product.controller")
const { validateJWT } = require("../middlewares")
const { validateFields } = require("../middlewares/validate-fields")

const router = Router()

router.get("/",get)

router.get("/:id",getById)

router.post("/", [
    validateJWT
],post)

router.put("/:id", [
    validateJWT
],put)
 
router.delete("/:id",deleteProduct)

module.exports = router