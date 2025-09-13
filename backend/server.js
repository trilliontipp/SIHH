const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  methods: ['GET', 'POST'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  if (req.method === 'POST' && req.url === '/api/chat') {
    console.log('Chat request body:', req.body);
  }
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message });
});

// Health check route
app.get("/", (req, res) => {
  res.json({ status: 'ok', message: "Backend is working" });
});

// API health check
app.get("/api/health", (req, res) => {
  res.json({ 
    status: 'ok',
    time: new Date().toISOString(),
    env: {
      groqApiKey: process.env.GROQ_API_KEY ? "Present" : "Missing",
      port: PORT
    }
  });
});

// Monuments API
const monuments = [
  { id: 1, name: "Khajuraho Temples", location: "Khajuraho", year: 950 },
  { id: 2, name: "Sanchi Stupa", location: "Sanchi", year: 3 },
  { id: 3, name: "Gwalior Fort", location: "Gwalior", year: 8 },
  { id: 4, name: "Orchha Fort", location: "Orchha", year: 16 },
  { id: 5, name: "Ujjain Mahakaleshwar", location: "Ujjain", year: 6 },
  { id: 6, name: "Indore Rajwada", location: "Indore", year: 1747 },
  { id: 7, name: "Chanderi Fort", location: "Chanderi", year: 11 },
  { id: 8, name: "Maheshwar Fort", location: "Maheshwar", year: 18 },
  { id: 9, name: "Bandhavgarh Fort", location: "Bandhavgarh", year: 10 },
  { id: 10, name: "Pachmarhi Caves", location: "Pachmarhi", year: 10 },
  { id: 11, name: "Bhimbetka Rock Shelters", location: "Raisen", year: 30000 },
  { id: 12, name: "Chitrakoot Falls", location: "Chitrakoot", year: 1780 },
  { id: 13, name: "Omkareshwar Temple", location: "Khandwa", year: 11 },
  { id: 14, name: "Bateshwar Temples", location: "Gwalior", year: 8 },
  { id: 15, name: "Rajgarh Fort", location: "Rajgarh", year: 12 }
];

app.get("/api/monuments", (req, res) => {
  res.json(monuments);
});

// Chatbot API (Groq) - Fixed version
app.post("/api/chat", async (req, res) => {
  console.log("=== Chat API Request Started ===");
  
  const { message } = req.body;
  
  if (!message || message.trim() === '') {
    console.log("Error: No message provided");
    return res.status(400).json({ error: "Message is required and cannot be empty" });
  }

  // Check if API key exists
  if (!process.env.GROQ_API_KEY) {
    console.log("Error: GROQ_API_KEY not found in environment variables");
    return res.status(500).json({ 
      error: "GROQ_API_KEY is not configured. Please add it to your .env file" 
    });
  }

  try {
    console.log("Sending request to Groq API...");
    console.log("Message:", message);
    
    // Updated payload with correct model and structure
    const payload = {
      model: "llama-3.1-8b-instant",
      messages: [
        { 
          role: "system", 
          content: "You are a friendly Indian heritage guide specializing in Madhya Pradesh monuments. Answer in Hinglish (mix of Hindi and English) and be informative about Indian culture and heritage. Keep responses conversational and helpful."
        },
        { 
          role: "user", 
          content: message.trim()
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
      stream: false
    };
    
    console.log("Payload:", JSON.stringify(payload, null, 2));
    
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions", 
      payload,
      {
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 30000, // 30 second timeout
        validateStatus: function (status) {
          return status < 500; // Accept any status code less than 500
        }
      }
    );

    console.log("Groq API Response Status:", response.status);
    
    if (response.status !== 200) {
      console.error("Non-200 response:", response.data);
      throw new Error(`API returned status ${response.status}: ${JSON.stringify(response.data)}`);
    }

    const data = response.data;
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("Invalid response structure:", data);
      throw new Error("Invalid response format from Groq API");
    }

    const botReply = data.choices[0].message.content;
    console.log("Successfully got reply from Groq API");
    
    res.json({ 
      success: true,
      reply: botReply,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("=== Groq API Error ===");
    console.error("Error message:", error.message);
    
    let errorResponse = {
      error: "Failed to get response from chatbot",
      success: false,
      timestamp: new Date().toISOString()
    };

    if (error.response) {
      console.error("Response Status:", error.response.status);
      console.error("Response Data:", error.response.data);
      
      // Handle specific error cases
      if (error.response.status === 401) {
        errorResponse.error = "Invalid API key. Please check your GROQ_API_KEY";
      } else if (error.response.status === 429) {
        errorResponse.error = "Rate limit exceeded. Please try again later";
      } else if (error.response.status === 400) {
        errorResponse.error = "Invalid request format";
      } else {
        errorResponse.error = `API Error: ${error.response.data?.error?.message || error.message}`;
      }
    } else if (error.code === 'ECONNABORTED') {
      errorResponse.error = "Request timeout. Please try again";
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      errorResponse.error = "Network error. Please check your internet connection";
    }

    res.status(500).json(errorResponse);
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
    timestamp: new Date().toISOString()
  });
});

// Handle 404 routes
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

// Process error handlers
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Server startup
const startServer = async () => {
  try {
    console.log('\n=== Starting Server ===');
    
    const server = app.listen(PORT, () => {
      console.log('\n=== Server Started Successfully ===');
      console.log(`  Server listening on port ${PORT}`);
      console.log('\nAPI Endpoints:');
      console.log(`  Health:    GET  http://localhost:${PORT}/api/health`);
      console.log(`  Monuments: GET  http://localhost:${PORT}/api/monuments`);
      console.log(`  Chat:      POST http://localhost:${PORT}/api/chat`);
      console.log('\nEnvironment:');
      console.log(`  GROQ_API_KEY: ${process.env.GROQ_API_KEY ? '✓ Present' : '✗ Missing'}`);
      console.log('\nPress Ctrl+C to stop\n');

      // Test Groq API after server starts
      setTimeout(() => {
        testGroqConnection();
      }, 2000);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use. Please try a different port.`);
      } else {
        console.error('❌ Server error:', error);
      }
      process.exit(1);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Test Groq API connection
const testGroqConnection = async () => {
  console.log('\n=== Testing Groq API Connection ===');
  
  if (!process.env.GROQ_API_KEY) {
    console.error('❌ GROQ_API_KEY not found in environment variables');
    console.log('Please create a .env file with: GROQ_API_KEY=your_api_key_here');
    return;
  }

  try {
    const payload = {
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "user", content: "what is gwalior fort" }
      ],
      max_tokens: 1024
    };

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      payload,
      {
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 10000
      }
    );

    if (response.status === 200 && response.data.choices) {
      console.log('✅ Groq API connection successful!');
      console.log('Test response for "what is gwalior fort":', response.data.choices[0].message.content);
    } else {
      console.log('⚠️  Groq API responded but with unexpected format');
    }
  } catch (error) {
    console.error('❌ Groq API connection failed:');
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Error: ${JSON.stringify(error.response.data, null, 2)}`);
    } else {
      console.error(`Error: ${error.message}`);
    }
  }
  console.log('=================================\n');
};

// Start the server
startServer();