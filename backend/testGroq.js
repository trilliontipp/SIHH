const axios = require("axios");
require("dotenv").config();

console.log("Starting Groq API direct test...");

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  console.error("Error: GROQ_API_KEY is not set in the .env file.");
  process.exit(1);
}

console.log("Groq API Key is present.");

const payload = {
  model: "llama-3.1-8b-instant",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "what is gwalior fort" }
  ]
};

console.log("Sending request to Groq API...");

axios.post("https://api.groq.com/openai/v1/chat/completions", payload, {
  headers: {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json"
  }
}).then(response => {
  console.log("Success! API responded.");
  console.log("Response data:", JSON.stringify(response.data, null, 2));
}).catch(error => {
  console.error("--- TEST FAILED ---");
  console.error("Axios Error:", error.message);
  if (error.response) {
    console.error("Status Code:", error.response.status);
    console.error("Response Body:", JSON.stringify(error.response.data, null, 2));
  } else if (error.request) {
    console.error("No response received. This indicates a network or firewall issue.");
    console.error("Request details:", error.request);
  } else {
    console.error("An unexpected error occurred during the request setup.");
  }
  console.error("-------------------");
});
