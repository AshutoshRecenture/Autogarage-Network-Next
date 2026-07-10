const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Blog = require("./src/models/Blog");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to DB, clearing blogs...");
    await Blog.deleteMany({});
    console.log("Blogs cleared. The backend will re-seed them on the next request.");
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
