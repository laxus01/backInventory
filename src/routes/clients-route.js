const express = require("express");
const router = express.Router();
const ClientsController = require("../controllers/clients-controller");

router.post("/", ClientsController.saveClient);
router.get("/", ClientsController.getClients);

router.delete("/:id", ClientsController.deleteClient);
router.put("/update/:id", ClientsController.updateClient);
router.put("/inactivate/:id", ClientsController.inactivateClient);

module.exports = router;