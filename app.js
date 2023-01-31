require("dotenv").config();
const cors = require("cors");
const express = require("express");
const handleError = require("./middleware/handleError");
const router = require("./routes/router");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);
app.use("/upload", express.static("upload"));
app.use(handleError);

app.listen(port, () => {
  console.log(`Forgot Password Connect !!`);
});
