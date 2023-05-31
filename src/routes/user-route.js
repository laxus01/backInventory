const express = require("express");
const router = express.Router();
const UsuariosController = require("../controllers/user-controller");

router.post("/", UsuariosController.getUser);
router.get("/", (req, res) => res.send('<h1>Logrado</h1>'));

module.exports = router;