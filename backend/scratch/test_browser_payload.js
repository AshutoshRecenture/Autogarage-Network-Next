const testBrowserPayload = async () => {
  const payload = {
    userDetails: {
      fullName: "ashutosh",
      emailAddress: "",
      phoneNumber: "",
      companyName: ""
    },
    chatMessages: [
      { sender: "bot", text: "Hello! Welcome to Auto Garage Network Assistant. 👋", time: "02:45 pm" }
    ],
    selectedService: "Support Callback",
    leadStatus: "New"
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

testBrowserPayload();
