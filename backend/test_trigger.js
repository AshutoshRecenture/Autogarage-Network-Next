const http = require("http");

const postData = JSON.stringify({
  name: "Ranjeet Test Lead",
  email: "ranjeet.test@example.com",
  phone: "9876543210",
  garageName: "Ranjeet's Express Garage",
  interestedIn: "SEO / Marketing / Branding",
  message: "I need marketing help ASAP!",
});

console.log("Submitting new contact form request...");

const req = http.request(
  {
    hostname: "127.0.0.1",
    port: 5000,
    path: "/api/contact",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(postData),
    },
  },
  (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.setEncoding("utf8");
    res.on("data", (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on("end", () => {
      console.log("Submit finished.");
      process.exit(0);
    });
  }
);

req.on("error", (e) => {
  console.error(`Problem with request: ${e.message}`);
  process.exit(1);
});

req.write(postData);
req.end();
