const handleError = (err, req, res, next) => {
  let code = 500;
  let message = "Internal Server Error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name == "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = [];
    err.errors.forEach((el) => {
      message.push(el.message);
    });
  } else if (err.name === "Invalid email/password") {
    code = 401;
    message = "Invalid email/password";
  } else if (err.name === "Invalid access_token") {
    code = 401;
    message = "Unauthorized";
  } else if (err.name === "Password is required") {
    code = 400;
    message = "Password is required";
  } else if (err.name === "Email is required") {
    code = 400;
    message = "Email is required";
  } else if (err.name === "JsonWebTokenError") {
    code = 401;
    message = "Invalid token";
  } else if (err.name === "Forbidden") {
    code = 403;
    message = "Your Unauthorized";
  } else if (err.name === "Old Password Not Found") {
    code = 400;
    message = "Old Password Not Found";
  } else if (err.name === "New Password Not Found") {
    code = 400;
    message = "New Password Not Found";
  } else if (err.name === "Confirm New Password Not Found") {
    code = 400;
    message = "Confirm New Password Not Found";
  } else if (err.name === "Account Not Found") {
    code = 400;
    message = "Account Not Found";
  } else if (err.name === "Password Not Match") {
    code = 400;
    message = "Password Not Match";
  }
  res.status(code).json({
    message: message,
  });
};

module.exports = handleError;
