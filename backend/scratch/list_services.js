const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Service = require("../src/models/Service");

dotenv.config({ path: path.join(__dirname, "../.env") });

async function query() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const services = await Service.find({});
    console.log("Services in DB:", JSON.stringify(services, null, 2));
  } catch (err) {
    console.error("DB Query error:", err);
  } finally {
    await mongoose.connection.close();
  }
}

query();
