const dotenv = require("dotenv");
// Load environment variables first
dotenv.config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

// Establish Database Connection
connectDB().then(() => {
  const seedAdmin = require("./src/utils/seedAdmin");
  seedAdmin();
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Unhandled Rejection Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});// Force restart comment
