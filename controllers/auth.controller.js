const { response } = require("express");
const User = require("../models/user");
const { genereteJWT } = require("../helpers/genereteJWT");
const bcrypt = require("bcryptjs");

const login = async (req, res = response) => {
  const { password, email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Usuario no encontrado",
      });
    }

    if (!user.state) {
      return res.status(400).json({
        msg: "estado false",
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario no encontrado",
      });
    }

    const token = await genereteJWT(user.id);

    res.json({
      user,
      token
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  login,
};
