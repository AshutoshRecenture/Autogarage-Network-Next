const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });

const ChatLead = require("../src/models/ChatLead");

async function runTest() {
  const sessionId = "test-session-hinglish-" + Date.now();
  console.log("Starting multi-step Hinglish test with Session ID:", sessionId);

  const steps = [
    {
      msg: "chahiye Website for Garages",
      desc: "Step 1: Selecting service in Hinglish",
    },
    {
      msg: "Mera naam Ashutosh Kumar hai",
      desc: "Step 2: Providing name in Hinglish",
    },
    {
      msg: "ashutosh@example.com aur phone number hai +44123456789",
      desc: "Step 3: Providing email & phone in Hinglish",
    },
    {
      msg: "Mera ek repair shop hai jiske liye custom site chahiye",
      desc: "Step 4: Providing purpose in Hinglish",
    },
    {
      msg: "Budget kareeb 3000 pounds hai",
      desc: "Step 5: Providing budget in Hinglish",
    }
  ];

  const messagesHistory = [
    { role: "assistant", content: "Hello! How can I help you today?" }
  ];

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    console.log(`\n--- Running ${step.desc} ---`);
    messagesHistory.push({ role: "user", content: step.msg });

    try {
      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          mode: "text",
          messages: messagesHistory
        })
      });

      console.log("Status:", res.status);
      const headerVal = res.headers.get("X-Selected-Service");
      console.log("Header 'X-Selected-Service' returned:", `"${headerVal}"`);
      
      const responseText = await res.text();
      console.log("Assistant Response:", `"${responseText}"`);

      messagesHistory.push({ role: "assistant", content: responseText });

    } catch (err) {
      console.error("Step failed with error:", err.message);
    }
  }

  // Final verification from DB
  try {
    console.log("\n--- Checking database for saved details ---");
    await mongoose.connect(process.env.MONGO_URI);
    
    const leadInDb = await ChatLead.findOne({ sessionId });
    if (leadInDb) {
      console.log("SUCCESS: Lead found in 'chatleads' collection.");
      console.log("DB Record Fields:");
      console.log({
        selectedService: leadInDb.selectedService,
        fullName: leadInDb.fullName,
        email: leadInDb.email,
        phone: leadInDb.phone,
        purpose: leadInDb.purpose,
        budget: leadInDb.budget,
        chatMessagesCount: leadInDb.chatMessages.length
      });
      
      // Cleanup
      await ChatLead.deleteOne({ sessionId });
      console.log("Cleanup: Test record deleted.");
    } else {
      console.log("ERROR: Lead was not found in the database.");
    }
  } catch (dbErr) {
    console.error("DB check failed:", dbErr.message);
  } finally {
    await mongoose.connection.close();
  }
}

runTest();
