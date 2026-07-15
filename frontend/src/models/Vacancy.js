import mongoose from 'mongoose';

const vacancySchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      default: "",
    },
    workingHours: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Vacancy = mongoose.models.Vacancy || mongoose.model('Vacancy', vacancySchema);
export default Vacancy;
