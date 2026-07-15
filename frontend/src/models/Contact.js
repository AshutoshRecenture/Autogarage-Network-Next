import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    garageName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    interestedIn: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
export default Contact;
