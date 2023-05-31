const suppliers = require("../models/suppliers-model");

const controller = {
  async saveSupplier(req, res) {
    await suppliers.saveSupplier(req, res);
  },

  async getSuppliers(req, res) {
    await suppliers.getSuppliers(req, res);
  },

  async deleteSupplier(req, res) {
    await suppliers.deleteSupplier(req, res);
  },

  async updateSupplier(req, res) {
    await suppliers.updateSupplier(req, res);
  },

  async inactivateSupplier(req, res) {
    await suppliers.inactivateSupplier(req, res);
  },
};

module.exports = controller;