const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Media = require("../src/models/Media");

dotenv.config({ path: path.join(__dirname, "../.env") });

async function check() {
  await mongoose.connect(process.env.MONGO_URI);
  const result = await Media.deleteMany({ original_filename: "Agn_01.mp4" });
  console.log("Deleted broken video records:", result);
  await mongoose.connection.close();
}

check();
