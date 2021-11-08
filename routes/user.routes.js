const { Router } = require("express")
const { check } = require("express-validator")
const {
  get,
  deleteUser,
  post,
  put,
} = require("../controllers/user.controller")
const { validateRol, isEmailExist, isUserExist } = require("../helpers/db-validators")
const { validateFields } = require("../middlewares/validate-fields")

const router = Router()

router.get("/", get)

router.post(
  "/",
  [
    check("name", "El name es obligatorio").not().isEmpty(),
    check("password", "El password debe tener min 6 caracteres").isLength({
      min: 6,
    }),
    check("email", "El email no es validado").isEmail(),
    // check('rol', 'No es un rol valido').isIn(['ADMIN','ROL']),
    check("rol").custom(validateRol),
    check("email").custom(isEmailExist),
    validateFields,
  ],
  post
);

router.put("/:id", [
    check("id","No es un ID valido").isMongoId(),
    check("id").custom(isUserExist),
    check("rol").custom(validateRol),
    validateFields
],put)

router.delete("/:id", [
  check("id","No es un ID valido").isMongoId(),
  check("id").custom(isUserExist),
  validateFields
],deleteUser)

module.exports = router
