const { Router } = require("express")
const { check } = require("express-validator")
const { login, googleSignIn } = require("../controllers/auth.controller")
const { validateFields } = require("../middlewares/validate-fields")

const router = Router()

router.post("/login", [
    check('email','Email es requerido').isEmail(),
    check('password','Password es requerido').not().isEmpty(),
    validateFields
],login)

router.post("/google", [
    check('id_token','Token es requerido').not().isEmpty(),
    validateFields
],googleSignIn)

module.exports = router