const User = require("../models/User");

exports.register = async (req, res, next) => {
  const { fullName, email, password } = req.body;
  try {
    const user = await User.create({
      fullName,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      token: user.getSignedToken(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        error: "Provide email and password.",
      });
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found.",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (isMatch) {
      return res.status(200).json({
        success: true,
        token: user.getSignedToken(),
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "incorrect password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "server error.",
    });
  }
};

exports.forgotPassword = (req, res, next) => {
  res.send("forgotPassword Route");
};

exports.resetPassword = (req, res, next) => {
  res.send("resetPassword Route");
};
