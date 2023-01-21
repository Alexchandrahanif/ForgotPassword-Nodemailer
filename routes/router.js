const Controller = require("../controller/user");

const router = require("express").Router();

router.get("/", Controller.getAllUsers);
router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.patch("/uploadPhoto", Controller.uploadPhoto);
router.patch("/changePassword", Controller.changePassword);
router.patch("/forgotPassword", Controller.forgotPassword);
router.patch("/resetPassword", Controller.resetPassword);

module.exports = router;
