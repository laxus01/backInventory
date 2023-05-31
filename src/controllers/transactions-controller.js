const transactions = require("../models/transactions-model");

const controller = {
  async saveShopping(req, res) {
    await transactions.saveShopping(req, res);
  },

  async getShopping(req, res) {
    await transactions.getShopping(req, res);
  },

  async updateShopping(req, res) {
    await transactions.updateShopping(req, res);
  },

  async inactivateShopping(req, res) {
    await transactions.inactivateShopping(req, res);
  }, 

  async saveSale(req, res) {
    await transactions.saveSale(req, res);
  },

  async getSales(req, res) {
    await transactions.getSales(req, res);
  },

  async updateSale(req, res) {
    await transactions.updateSale(req, res);
  },

  async inactivateSale(req, res) {
    await transactions.inactivateSale(req, res);
  }, 

  async getIncomeExpenses(req, res) {
    await transactions.getIncomeExpenses(req, res);
  }, 

  async getUtilities(req, res) {
    await transactions.getUtilities(req, res);
  }, 

  async getReceivables(req, res) {
    await transactions.getReceivables(req, res);
  }, 

  async savePaidReceivable(req, res) {
    await transactions.savePaidReceivable(req, res);
  }, 

  async getPayables(req, res) {
    await transactions.getPayables(req, res);
  }, 

  async savePaidPayable(req, res) {
    await transactions.savePaidPayable(req, res);
  }, 
};

module.exports = controller;