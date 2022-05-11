exports.getUser = (req, res) => {
  try {
    res.status(200).send("muharis");
  } catch (error) {
    res.status(500).json(error);
  }
};
