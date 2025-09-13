const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is working ");
});

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;
  console.log("Received message:", userMessage);

  if (!userMessage) {
    console.log("Error: No message provided");
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    console.log("Sending request to Groq API...");
    console.log("API Key present:", !!process.env.GROQ_API_KEY);
    
    const payload = {
      model: "mixtral-8x7b-32768",
      messages: [
        { role: "system", content: "You are a friendly Indian heritage guide. Answer in Hinglish, and if possible use data from monuments API provided." },
        { role: "user", content: userMessage }
      ]
    };
    
    console.log("Request payload:", JSON.stringify(payload, null, 2));
    
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("API Response:", JSON.stringify(data, null, 2));
    
    if (data.error) {
      throw new Error(data.error.message || "Unknown API error");
    }
    
    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: error.message || "Failed to get response from Groq" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
