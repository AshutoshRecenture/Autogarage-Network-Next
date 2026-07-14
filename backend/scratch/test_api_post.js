async function testPost() {
  const payload = {
    sessionId: "test-voice-session-unique-123",
    mode: "voice",
    messages: [
      { role: "assistant", content: "Hello! I'm the Auto Garage Network Assistant. What service can I help you with today?" },
      { role: "user", content: "neha verma" },
      { role: "assistant", content: "Understood! You're interested in the \"neha verma\". Could you please tell me your full name to start?" },
      { role: "user", content: "hello I am Ashutosh I want to know your website what is WhatsApp website to" }
    ]
  };

  try {
    console.log("Sending POST to http://localhost:3000/api/chat...");
    const res = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    console.log("Response Status:", res.status);
    const text = await res.text();
    console.log("Response Content:\n", text);
  } catch (err) {
    console.error("Error making POST request:", err);
  }
}

testPost();
