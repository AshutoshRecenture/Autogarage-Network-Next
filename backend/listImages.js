const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "n4okswsd",
  api_key: "486597874886138",
  api_secret: "EEvDim6of-ojrnom8owK3Xid3b8"
});

async function run() {
  try {
    const result = await cloudinary.search
      .expression("folder:Blog")
      .execute();
    
    console.log("Found", result.resources.length, "images");
    result.resources.forEach(res => {
      console.log(res.secure_url);
    });
  } catch (err) {
    console.error(err);
  }
}
run();
