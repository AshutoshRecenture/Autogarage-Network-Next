import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["super_admin", "admin"],
      default: "admin",
    },
    permissions: {
      contacts: {
        read: { type: Boolean, default: false },
        write: { type: Boolean, default: false },
      },
      chatLeads: {
        read: { type: Boolean, default: false },
        write: { type: Boolean, default: false },
      },
      blogs: {
        read: { type: Boolean, default: false },
        write: { type: Boolean, default: false },
      },
      faqs: {
        read: { type: Boolean, default: false },
        write: { type: Boolean, default: false },
      },
      media: {
        read: { type: Boolean, default: false },
        write: { type: Boolean, default: false },
      },
      settings: {
        read: { type: Boolean, default: false },
        write: { type: Boolean, default: false },
      },
      socialMedia: {
        read: { type: Boolean, default: false },
        write: { type: Boolean, default: false },
      },
      vacancies: {
        read: { type: Boolean, default: false },
        write: { type: Boolean, default: false },
      },
      pages: {
        read: { type: Boolean, default: false },
        write: { type: Boolean, default: false },
      },
      websiteRegister: {
        read: { type: Boolean, default: false },
        write: { type: Boolean, default: false },
      },
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
