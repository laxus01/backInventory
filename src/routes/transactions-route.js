const express = require("express");
const router = express.Router();
const TransactionsController = require("../controllers/transactions-controller");

router.post("/saveShopping", TransactionsController.saveShopping);
router.get("/getShopping", TransactionsController.getShopping);
router.put("/updateShopping/:id", TransactionsController.updateShopping);
router.put("/inactivateShopping/:id", TransactionsController.inactivateShopping);

router.post("/saveSale", TransactionsController.saveSale);
router.get("/getSales", TransactionsController.getSales);
router.put("/updateSale/:id", TransactionsController.updateSale);
router.put("/inactivateSale/:id", TransactionsController.inactivateSale);

router.get("/getReceivables", TransactionsController.getReceivables);
router.post("/savePaidReceivable", TransactionsController.savePaidReceivable);
router.get("/getPayables", TransactionsController.getPayables);
router.post("/savePaidPayable", TransactionsController.savePaidPayable);

router.get("/getIncomeExpenses/:date1/date2/:date2", TransactionsController.getIncomeExpenses);
router.get("/getUtilities/:date1/date2/:date2", TransactionsController.getUtilities);

module.exports = router;