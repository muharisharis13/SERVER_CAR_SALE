const responseTypes = require("./responseType");

const responseJson = (res, data, code) => {
  switch (code) {
    case 200:
      return res.status(200).json({
        status: responseTypes(200),
        data,
      });
    case 201:
      return res.status(201).json({
        status: responseTypes(201),
        data,
      });
    case 500:
      return res.status(500).json({
        status: responseTypes(500),
        error: data,
      });
    case 400:
      return res.status(400).json({
        status: responseTypes(400),
        error: data,
      });
    case 401:
      return res.status(401).json({
        status: responseTypes(401),
        error: data,
      });

    default:
      return res.status(404).json({
        status: responseTypes(404),
        error: "Data Tidak Di Temukan!",
      });
  }
};

module.exports = responseJson;
