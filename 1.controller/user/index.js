exports.getUser = (req, res) => {
  try {
    res.status(200).send("tes");
  } catch (error) {
    res.status(500).json(error);
  }
};
