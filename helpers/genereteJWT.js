const jwt = require("jsonwebtoken");

const genereteJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: "6h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("no se pudo generar el jwt");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { genereteJWT };
