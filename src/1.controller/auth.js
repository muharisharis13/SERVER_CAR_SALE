const models = require("../3.models");
const utils = require("../5.util");

const responseJson = utils.responseJson;
const createTokenAdmin = utils.token.createTokenAdmin;
// USER==========================

exports.authUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await models.user.findOne({
      where: {
        email,
        password: utils.crypto.hashPassword(password),
      },
    });

    utils.responseJson(res, result, 200);
  } catch (error) {
    utils.responseJson(res, error, 500);
  }
};

exports.registerUser = async (req, res) => {
  const { email, password, tel, name, role } = req.body;
  try {
    await models.user
      .create({
        email,
        password: utils.crypto.hashPassword(password),
        tel,
        name,
        role,
      })
      .then((result) => {
        const { email, name, tel, createdAt, updatedAt } = result;
        const data = {
          email,
          name,
          tel,
          createdAt,
          updatedAt,
        };

        utils.responseJson(res, data, 201);
      });
  } catch (error) {
    utils.responseJson(res, error, 500);
  }
};

exports.loginUser = async (req, res) => {
  const { email } = req.body;
  try {
    await models.user
      .findOne({
        where: {
          email,
        },
      })
      .then((result) => {
        if (result?.dataValues) {
          const { id, email, name, createdAt, updatedAt, role } =
            result.dataValues;
          result = {
            id,
            email,
            name,
            createdAt,
            updatedAt,
            role,
          };

          const token = utils.token.createToken(result);

          const resultWithToken = {
            ...result,
            token,
          };
          utils.responseJson(res, resultWithToken, 200);
        } else {
          const errorText = {
            message: "Email or Password Wrong ! Please try Again",
          };
          utils.responseJson(res, errorText, 200);
        }
      });
  } catch (error) {
    utils.responseJson(res, error, 500);
  }
};

// ADMIN ======================

exports.registerAdmin = async (req, res) => {
  const { email, password, tel, name } = req.body;

  try {
    const result = await models.user.create({
      email,
      password: utils.crypto.hashPassword(password),
      tel,
      name,
      role: "admin",
    });

    responseJson(res, result, 200);
  } catch (error) {
    responseJson(res, error.parent.sqlMessage, 500);
  }
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    await models.user
      .findOne({
        where: {
          email,
          password: utils.crypto.hashPassword(password),
          role: "admin",
        },
      })
      .then((result) => {
        const { id, email, name, createdAt, updatedAt, role } = result;

        result = {
          id,
          email,
          name,
          createdAt,
          updatedAt,
          role,
        };

        const token = createTokenAdmin(result);

        const resultFinal = {
          ...result,
          token,
        };
        responseJson(res, resultFinal, 200);
      })
      .catch((err) => {
        responseJson(res, err.message, 400);
      });
  } catch (error) {
    responseJson(res, error.parent.sqlMessage, 500);
  }
};
