const User = require("../models/user-model");

const controller = {
  async getUser (req, res) {
    await User.getUser(req, res);
  },
};

module.exports = controller;
