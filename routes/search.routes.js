const { Router } = require("express")
const { check } = require("express-validator")
const { get } = require("../controllers/search.controller")
const { validateJWT } = require("../middlewares")
const { validateFields } = require("../middlewares/validate-fields")

const router = Router()

router.get("/:colleccion/:field",get)

module.exports = router