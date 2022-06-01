const models = require('../../3.models');
const utils = require("../../5.util")

exports.getUser = (req, res) => {
  try {
    res.status(200).send("Fitur User");
  } catch (error) {
    res.status(500).json(error);
  }
};


exports.editUser = (req, res) => {
  const { id } = req.params;
  try {
    res.status(200).send(`Edit User ${id}`);
  } catch (error) {
    res.status(500).json(error);
  }
}

exports.hapusUser = (req, res) => {
  const { id } = req.params;
  try {
    res.status(200).send(`Hapus User ${id}`);
  } catch (error) {
    res.status(500).json(error);
  }
}
