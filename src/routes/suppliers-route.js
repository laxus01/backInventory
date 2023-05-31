const express = require("express");
const router = express.Router();
const SuppliersController = require("../controllers/suppliers-controller");

router.post("/", SuppliersController.saveSupplier);
router.get("/", SuppliersController.getSuppliers);

router.delete("/:id", SuppliersController.deleteSupplier);
router.put("/update/:id", SuppliersController.updateSupplier);
router.put("/inactivate/:id", SuppliersController.inactivateSupplier);

module.exports = router;