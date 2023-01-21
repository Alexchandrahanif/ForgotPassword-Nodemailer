const { User } = require("../models/index");

class Controller {
  // GET ALL USERS
  static async getAllUsers(req, res, next) {
    try {
      const dataUser = await User.findAll({
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      });
      res.status(200).json({
        statusCode: 200,
        message: "Data Users",
        data: dataUser,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // REGISTER
  static async register(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  // LOGIN
  static async login(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  // UPLOAD PHOTO
  static async uploadPhoto(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  // CHANGE PASSWORD
  static async changePassword(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  // FORGOT PASSWORD
  static async forgotPassword(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  // RESET PASSWORD
  static async resetPassword(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
