const db = require("../database");
const jwt = require("jsonwebtoken");
const llave = require("../configs/config");

const payload = {
  check: true,
};
const token = jwt.sign(payload, llave.llave, {
  expiresIn: 1440,
});

const getUser = async (req, res) => {
  const { login, password } = req.body;
  return res.status(200).send({
    res: {
      message: "Autenticación correcta",
      login: login,
      pass: password
    },
  });
};

module.exports = {
  getUser,
};
