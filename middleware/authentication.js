const { verifyAccessToken } = require("../helper/helper");
const { User } = require("../models/index");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    let payload = verifyAccessToken(access_token);
    let dataUser = await User.findByPk(payload.id);
    if (!dataUser) {
      throw { name: "Invalid access_token" };
    }

    req.user = {
      id: dataUser.id,
      email: dataUser.email,
      uuid: dataUser.uuid,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
