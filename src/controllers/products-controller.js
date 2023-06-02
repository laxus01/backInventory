const products = require("../models/products-model");

const controller = {
  async saveProduct(req, res) {
    await products.saveProduct(req, res);
  },

  async getProducts(req, res) {
    await products.getProducts(req, res);
  },

  async deletePayment(req, res) {
    await products.deletePayment(req, res);
  },

  async updateProduct(req, res) {
    await products.updateProduct(req, res);
  },

  async inactivateProduct(req, res) {
    await products.inactivateProduct(req, res);
  },

  async getProductsByBarcode(req, res) {
    await products.getProductsByBarcode(req, res);
  },

  async saveNewBarcode(req, res) {
    await products.saveNewBarcode(req, res);
  },
};

module.exports = controller;