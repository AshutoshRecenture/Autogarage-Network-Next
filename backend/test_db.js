const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dns = require("dns");

// Set DNS servers to public ones to ensure reliable MongoDB Atlas SRV resolution
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  // Ignore errors setting DNS
}

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
console.log("Testing MONGO_URI:", MONGO_URI);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("SUCCESS: Connected to MongoDB Atlas!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("ERROR: Failed to connect:", err.message);
    process.exit(1);
  });
