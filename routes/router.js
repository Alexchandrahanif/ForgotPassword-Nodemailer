const Controller = require("../controller/user");
const authentication = require("../middleware/authentication");

const router = require("express").Router();

router.get("/", Controller.getAllUsers);
router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.patch("/uploadPhoto", authentication, Controller.uploadPhoto);
router.patch("/changePassword", authentication, Controller.changePassword);
router.patch("/forgotPassword", authentication, Controller.forgotPassword);
router.patch(
  "/resetPassword/:uuid/:token",
  authentication,
  Controller.resetPassword
);

module.exports = router;
