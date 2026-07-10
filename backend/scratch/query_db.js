const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Media = require("../src/models/Media");

dotenv.config({ path: path.join(__dirname, "../.env") });

async function query() {
  await mongoose.connect(process.env.MONGO_URI);
  const img = await Media.findOne({ original_filename: "website-for-garages.png" });
  console.log("Image record in DB:", JSON.stringify(img, null, 2));
  await mongoose.connection.close();
}

query();
