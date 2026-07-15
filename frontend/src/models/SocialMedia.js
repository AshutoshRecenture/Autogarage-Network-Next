import mongoose from 'mongoose';

const socialMediaSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    iconType: {
      type: String,
      default: "globe",
    },
  },
  {
    timestamps: true,
  }
);

const SocialMedia = mongoose.models.SocialMedia || mongoose.model('SocialMedia', socialMediaSchema);
export default SocialMedia;
