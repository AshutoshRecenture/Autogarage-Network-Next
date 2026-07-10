const testPost = async () => {
  const payload = {
    userDetails: {
      fullName: "Test Lead User",
      emailAddress: "testlead@example.com",
      phoneNumber: "07777777777",
      companyName: "Test Company Ltd",
    },
    chatMessages: [
      { sender: "bot", text: "Hello! Welcome to Auto Garage Network Assistant. 👋", time: "01:00 pm" },
      { sender: "user", text: "AI Solutions", time: "01:01 pm" },
      { sender: "bot", text: "Awesome choice! May I start with your Full Name, please?", time: "01:01 pm" },
      { sender: "user", text: "Test Lead User", time: "01:02 pm" },
      { sender: "bot", text: "Nice to meet you, Test Lead User! Can you please enter your Email Address?", time: "01:02 pm" },
      { sender: "user", text: "testlead@example.com", time: "01:03 pm" },
      { sender: "bot", text: "Got it. Could you please enter your Phone Number?", time: "01:03 pm" },
      { sender: "user", text: "07777777777", time: "01:04 pm" },
      { sender: "bot", text: "What is your Company Name?", time: "01:04 pm" },
      { sender: "user", text: "Test Company Ltd", time: "01:05 pm" },
      { sender: "bot", text: "Understood. What is your estimated Budget Range?", time: "01:05 pm" },
      { sender: "user", text: "£1,000 - £5,000", time: "01:06 pm" },
      { sender: "bot", text: "What is your desired Project Deadline?", time: "01:06 pm" },
      { sender: "user", text: "1 Month", time: "01:07 pm" },
      { sender: "bot", text: "Lastly, could you please write a short Project Description?", time: "01:07 pm" },
      { sender: "user", text: "We need an AI chatbot automated support.", time: "01:08 pm" }
    ],
    selectedService: "AI Solutions",
    budgetRange: "£1,000 - £5,000",
    projectDeadline: "1 Month",
    projectDescription: "We need an AI chatbot automated support.",
    leadStatus: "New",
  };

  try {
    const response = await fetch("http://localhost:5000/api/chat-submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const json = await response.json();
    console.log("POST Response status:", response.status);
    console.log("POST Response body:", JSON.stringify(json, null, 2));
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

testPost();
