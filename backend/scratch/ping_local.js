const http = require("http");

http.get("http://localhost:5000", (res) => {
  console.log("Response status:", res.statusCode);
  res.on("data", (chunk) => {
    console.log("Body:", chunk.toString());
  });
}).on("error", (err) => {
  console.error("Ping error:", err.message);
});
