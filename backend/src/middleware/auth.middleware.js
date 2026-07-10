const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

const admin = (req, res, next) => {
  if (req.user && (req.user.role === "admin" || req.user.role === "super_admin")) {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};

const superAdmin = (req, res, next) => {
  if (req.user && req.user.role === "super_admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized. Super Admin privileges required." });
  }
};

const checkPermission = (moduleName, action) => {
  return (req, res, next) => {
    // Super admins bypass all permission checks
    if (req.user && req.user.role === "super_admin") {
      return next();
    }

    // Check specific module and read/write permission
    if (
      req.user &&
      req.user.permissions &&
      req.user.permissions[moduleName] &&
      req.user.permissions[moduleName][action] === true
    ) {
      return next();
    }

    res.status(403).json({
      message: `Access denied. You do not have '${action}' permission for ${moduleName}.`,
    });
  };
};

module.exports = { protect, admin, superAdmin, checkPermission };
