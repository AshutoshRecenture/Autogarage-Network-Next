const User = require("../models/User");

// @desc    Get all admin users
// @route   GET /api/users
// @access  Private/SuperAdmin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new admin user
// @route   POST /api/users
// @access  Private/SuperAdmin
const createUser = async (req, res) => {
  try {
    const { name, email, password, permissions, role } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || "admin",
      permissions: permissions || {
        contacts: { read: false, write: false },
        chatLeads: { read: false, write: false },
        blogs: { read: false, write: false },
        faqs: { read: false, write: false },
        media: { read: false, write: false },
        settings: { read: false, write: false },
        socialMedia: { read: false, write: false },
        vacancies: { read: false, write: false },
        pages: { read: false, write: false },
      },
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an admin user
// @route   PUT /api/users/:id
// @access  Private/SuperAdmin
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    const { name, email, password, permissions, role } = req.body || {};

    user.name = name !== undefined ? name : user.name;
    user.email = email !== undefined ? email : user.email;
    user.role = role !== undefined ? role : user.role;
    
    if (password && password.trim() !== "") {
      user.password = password; // pre-save hook will automatically hash this
    }

    if (permissions) {
      user.permissions = permissions;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      permissions: updatedUser.permissions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an admin user
// @route   DELETE /api/users/:id
// @access  Private/SuperAdmin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    if (user.role === "super_admin") {
      return res.status(400).json({ message: "Super Admin account cannot be deleted" });
    }

    await user.deleteOne();
    res.json({ message: "Admin user removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
