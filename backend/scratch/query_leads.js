const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const ChatLead = require("../src/models/ChatLead");

dotenv.config({ path: path.join(__dirname, "../.env") });

async function query() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const leads = await ChatLead.find({}).sort({ createdAt: -1 });
    console.log("All Lead records in DB:", JSON.stringify(leads, null, 2));
  } catch (err) {
    console.error("DB Query error:", err);
  } finally {
    await mongoose.connection.close();
  }
}

query();
