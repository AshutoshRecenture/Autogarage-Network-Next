import jwt from "jsonwebtoken";
import User from "@/models/User";
import connectDB from "@/lib/db";

export const protect = async (req) => {
  await connectDB();
  const authHeader = req.headers.get("authorization");
  
  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      
      if (!user) {
        return { error: "Not authorized, user not found", status: 401 };
      }
      return { user };
    } catch (error) {
      return { error: "Not authorized, token failed", status: 401 };
    }
  }
  return { error: "Not authorized, no token", status: 401 };
};

export const admin = (user) => {
  if (user && (user.role === "admin" || user.role === "super_admin")) {
    return true;
  }
  return false;
};

export const superAdmin = (user) => {
  if (user && user.role === "super_admin") {
    return true;
  }
  return false;
};

export const checkPermission = (user, moduleName, action) => {
  if (user && user.role === "super_admin") return true;
  
  if (
    user &&
    user.permissions &&
    user.permissions[moduleName] &&
    user.permissions[moduleName][action] === true
  ) {
    return true;
  }
  
  return false;
};
