const Role = require("../models/rols");
const User = require("../models/user");

const validateRol = async (rol = "") => {
  const existingRol = await Role.findOne({ rol });
  if (!existingRol) {
    throw new Error("El rol no encontrado");
  }
};

const isEmailExist = async (email = "") => {
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new Error("El correo ya esta registrado");
  }
};

const isUserExist = async (id) => {
  const existingUser = await User.findById({ _id: id });
  if (!existingUser) {
    throw new Error("El usuario no existe");
  }
};

module.exports = {
  validateRol,
  isEmailExist,
  isUserExist
};
