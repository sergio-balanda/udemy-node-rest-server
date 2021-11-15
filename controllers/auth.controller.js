const { response } = require("express");
const User = require("../models/user");
const { genereteJWT } = require("../helpers/genereteJWT");
const bcrypt = require("bcryptjs");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body

  try {
    const { email, name, picture } = await googleVerify(id_token)

    let user = await User.findOne({ email })

    if(!user){
      const data = { 
        name,
        email,
        password:':P',
        img: picture,
        google:true,
        rol:'USER'
      }
      user = new User(data)
      await user.save()
    }

    if(!user.state){
      res.status(401).json({
        msg: 'No autorizado',
        email
      })
    }

    const token = await genereteJWT(user.id);

    res.status(200).json({
      msg: 'ok',
      user,
      token
    })
  } catch (error) {
    res.status(400).json({
      ok:false,
      msg: error.message
    })
  }
};


module.exports = {
  login,
  googleSignIn
};
