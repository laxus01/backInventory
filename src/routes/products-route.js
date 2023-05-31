const express = require("express");
const router = express.Router();
const ProductsController = require("../controllers/products-controller");

router.post("/", ProductsController.saveProduct);
router.get("/", ProductsController.getProducts);

router.delete("/:id", ProductsController.deletePayment);
router.put("/update/:id", ProductsController.updateProduct);
router.put("/inactivate/:id", ProductsController.inactivateProduct);

module.exports = router;