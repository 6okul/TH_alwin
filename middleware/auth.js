const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authorize = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    // console.log(token);
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: "Not authorized, no token." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Not authorized, no user." });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server error." });
  }
};
