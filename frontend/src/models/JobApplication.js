import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    applyFor: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    resumeUrl: {
      type: String,
      required: true, // Resume is required
    },
    message: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const JobApplication = mongoose.models.JobApplication || mongoose.model('JobApplication', jobApplicationSchema);
export default JobApplication;
