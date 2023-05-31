const clients = require("../models/clients-model");

const controller = {
  async saveClient(req, res) {
    await clients.saveClient(req, res);
  },

  async getClients(req, res) {
    await clients.getClients(req, res);
  },

  async deleteClient(req, res) {
    await clients.deleteClient(req, res);
  },

  async updateClient(req, res) {
    await clients.updateClient(req, res);
  },

  async inactivateClient(req, res) {
    await clients.inactivateClient(req, res);
  },
};

module.exports = controller;