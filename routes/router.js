const Controller = require("../controller/user");
const authentication = require("../middleware/authentication");

const router = require("express").Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/images/");
  },
  filename: function (req, file, cb) {
    const tanggal = new Date().getTime().toString();
    cb(null, `${tanggal}${file.originalname}`);
  },
});

const uploadImg = multer({ storage: storage });

router.get("/", Controller.getAllUsers);
router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.patch(
  "/uploadPhoto",
  authentication,
  uploadImg.single("photo"),
  Controller.uploadPhoto
);
router.patch("/changePassword", authentication, Controller.changePassword);
router.patch("/forgotPassword", authentication, Controller.forgotPassword);
router.patch(
  "/resetPassword/:uuid/:token",
  authentication,
  Controller.resetPassword
);

router.get("/company", Controller.get);
router.get("/direktur", Controller.getDirektur);

router.post("/direktur", Controller.createDirektur);
router.post("/company", Controller.createCompany);

module.exports = router;
