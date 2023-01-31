const {
  comparePassword,
  createAccessToken,
  hashingPassword,
  verifyAccessToken,
} = require("../helper/helper");
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
      const { username, email, password, photo, address } = req.body;
      const dataUser = await User.create({
        username,
        email,
        password,
        photo,
        address,
      });
      res.status(201).json({
        statusCode: 201,
        message: "Create New Account Successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  // LOGIN
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const dataUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!email) {
        throw { name: "Email is required" };
      }

      if (!password) {
        throw { name: "Password is required" };
      }

      if (!dataUser) {
        throw { name: "Invalid email/password" };
      }

      if (!comparePassword(password, dataUser.password)) {
        throw { name: "Invalid email/password" };
      }

      const payload = {
        id: dataUser.id,
        email: dataUser.email,
      };

      const access_token = createAccessToken(payload);

      res.status(200).json({
        statusCode: 200,
        message: "Login Successfully",
        access_token: access_token,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // UPLOAD PHOTO
  static async uploadPhoto(req, res, next) {
    try {
      // Request
      const { uuid } = req.user;
      const { photo } = req.body;

      // Validasi
      // if (!req.file) {
      //   throw { name: "Photo is required" };
      // }

      await User.update(
        {
          photo: photo,
        },
        {
          where: {
            uuid: uuid,
          },
        }
      );
      res.status(200).json({
        statusCode: 200,
        message: "Update photo User Successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // CHANGE PASSWORD
  static async changePassword(req, res, next) {
    try {
      const { uuid } = req.user;
      const { oldPassword, newPassword, confirmPassword } = req.body;

      const dataUser = await User.findOne({
        where: {
          uuid: uuid,
        },
      });
      console.log(dataUser.password);

      // Validasi
      if (!oldPassword) {
        throw { name: "Old Password Not Found" };
      }
      if (!newPassword) {
        throw { name: "New Password Not Found" };
      }
      if (!confirmPassword) {
        throw { name: "Confirm New Password Not Found" };
      }
      if (!comparePassword(oldPassword, dataUser.password)) {
        throw { name: "Forbidden" };
      }
      if (newPassword !== confirmPassword) {
        throw { name: "Password Not Same" };
      }

      // Update Password
      const data = await User.update(
        {
          password: hashingPassword(confirmPassword),
        },
        {
          where: {
            uuid: uuid,
          },
        }
      );

      res.status(200).json({
        statusCode: 200,
        message: "Update Password Successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // FORGOT PASSWORD
  static async forgotPassword(req, res, next) {
    try {
      const { uuid } = req.user;
      const { email } = req.body;
      let link = "";

      const dataUser = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!dataUser) {
        throw { name: "Account Not Found" };
      }
      if (dataUser) {
        const payload = {
          id: dataUser.id,
          email: dataUser.email,
          uuid: dataUser.uuid,
        };
        const token = createAccessToken(payload);
        link = `http://localhost:3000/resetPassword/${uuid}/${token}`;
        console.log(link);
      }

      res.status(200).json({
        statusCode: 200,
        message: `Proses Change Password`,
        link: link,
      });
    } catch (error) {
      next(error);
    }
  }

  // RESET PASSWORD
  static async resetPassword(req, res, next) {
    try {
      const { uuid, token } = req.params;
      const { newPassword, confirmPassword } = req.body;
      const user = verifyAccessToken(token);
      if (!user) {
        throw { name: "Access Token is Wrong" };
      }
      if (!newPassword) {
        throw { name: "New Password Not Found" };
      }
      if (!confirmPassword) {
        throw { name: "Confirm New Password Not Found" };
      }

      if (newPassword !== confirmPassword) {
        throw { name: "Password Not Match" };
      }
      console.log(user);

      if (user) {
        await User.update(
          {
            password: hashingPassword(confirmPassword),
          },
          {
            where: {
              uuid: uuid,
            },
          }
        );
      }

      res.status(200).json({
        statusCode: 200,
        message: "Update Password Successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
