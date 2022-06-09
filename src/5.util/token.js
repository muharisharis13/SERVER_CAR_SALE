const jwt = require("jsonwebtoken");
const responseJson = require("./responseJson");
const jwt_key = process.env.JWT_KEY;
const jwt_key_admin = "admin2022";
const models = include("/src/3.models");

const ModelUser = models.user;

exports.checkToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, jwt_key);
    const { email, role } = decoded;
    await ModelUser.findOne({
      where: {
        email: email,
        role,
      },
    }).then((resultUser) => {
      if (resultUser) {
        res.userData = decoded;

        next();
      } else {
        const errText = {
          message: "Authentication User Error !",
        };
        responseJson(res, errText, 401);
      }
    });
  } catch (err) {
    const errText = {
      message: "Authentication Error !",
    };

    responseJson(res, errText, 401);
  }
};

exports.createToken = (result) => {
  return jwt.sign(result, jwt_key);
};

exports.checkTokenAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, jwt_key_admin);
    const { email, role } = decoded;

    await ModelUser.findOne({
      where: {
        email,
        role,
      },
    }).then((resultAdmin) => {
      if (resultAdmin) {
        res.useData = decoded;
        next();
      }
    });
  } catch (error) {
    responseJson(res, error.message, 401);
  }
};

exports.createTokenAdmin = (result) => {
  return jwt.sign(result, jwt_key_admin);
};
