const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({
  origin: 'https://sihh-pi.vercel.app',
  methods: ['GET', 'POST'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  if (req.method === 'POST' && req.url === '/api/chat') {
    console.log('Chat request body:', req.body);
  }
  next();
});

// Enhanced monuments database with more details
const monuments = [
  { 
    id: 1, 
    name: "Khajuraho Temples", 
    location: "Khajuraho, Madhya Pradesh", 
    year: 950,
    type: "Temple Complex",
    significance: "UNESCO World Heritage Site famous for intricate sculptures",
    visitTime: "October to March",
    timings: "6:00 AM - 6:00 PM",
    entryFee: "₹40 (Indian), ₹600 (Foreign)",
    nearbyAttractions: ["Raneh Falls", "Panna National Park"]
  },
  { 
    id: 2, 
    name: "Sanchi Stupa", 
    location: "Sanchi, Madhya Pradesh", 
    year: 3,
    type: "Buddhist Monument",
    significance: "Ancient Buddhist complex and UNESCO World Heritage Site",
    visitTime: "November to March",
    timings: "9:00 AM - 5:00 PM",
    entryFee: "₹30 (Indian), ₹500 (Foreign)",
    nearbyAttractions: ["Udayagiri Caves", "Vidisha"]
  },
  { 
    id: 3, 
    name: "Gwalior Fort", 
    location: "Gwalior, Madhya Pradesh", 
    year: 8,
    type: "Hill Fort",
    significance: "One of India's most impregnable forts, known as Gibraltar of India",
    visitTime: "October to March",
    timings: "8:00 AM - 6:00 PM",
    entryFee: "₹75 (Indian), ₹250 (Foreign)",
    nearbyAttractions: ["Jai Vilas Palace", "Tomb of Tansen"]
  },
  { 
    id: 4, 
    name: "Orchha Fort", 
    location: "Orchha, Madhya Pradesh", 
    year: 16,
    type: "Fort Complex",
    significance: "Medieval fort with stunning Mughal and Rajput architecture",
    visitTime: "October to March",
    timings: "8:00 AM - 6:00 PM",
    entryFee: "₹35 (Indian), ₹250 (Foreign)",
    nearbyAttractions: ["Betwa River", "Chaturbhuj Temple"]
  },
  { 
    id: 5, 
    name: "Mahakaleshwar Temple", 
    location: "Ujjain, Madhya Pradesh", 
    year: 6,
    type: "Hindu Temple",
    significance: "One of the 12 Jyotirlingas, sacred to Lord Shiva",
    visitTime: "Throughout the year",
    timings: "4:00 AM - 11:00 PM",
    entryFee: "Free (Darshan charges may apply)",
    nearbyAttractions: ["Ram Ghat", "Vedh Shala Observatory"]
  },
  // Add more monuments with detailed info...
  { 
    id: 6, 
    name: "Taj Mahal", 
    location: "Agra, Uttar Pradesh", 
    year: 1632,
    type: "Mausoleum",
    significance: "UNESCO World Heritage Site, Symbol of Love",
    visitTime: "October to March",
    timings: "6:00 AM - 6:30 PM",
    entryFee: "₹50 (Indian), ₹1100 (Foreign)",
    nearbyAttractions: ["Agra Fort", "Mehtab Bagh", "Itimad-ud-Daula"]
  },
  { 
    id: 7, 
    name: "Red Fort", 
    location: "Delhi", 
    year: 1638,
    type: "Mughal Fort",
    significance: "UNESCO World Heritage Site, Symbol of Indian Independence",
    visitTime: "October to March",
    timings: "9:30 AM - 4:30 PM",
    entryFee: "₹35 (Indian), ₹500 (Foreign)",
    nearbyAttractions: ["Jama Masjid", "Chandni Chowk", "India Gate"]
  },
  { 
    id: 8, 
    name: "Hampi", 
    location: "Karnataka", 
    year: 1336,
    type: "Ruins of Vijayanagara Empire",
    significance: "UNESCO World Heritage Site, Ancient temple city",
    visitTime: "October to February",
    timings: "6:00 AM - 6:00 PM",
    entryFee: "₹40 (Indian), ₹600 (Foreign)",
    nearbyAttractions: ["Vittala Temple", "Lotus Mahal", "Elephant Stables"]
  }
];

// Language detection helper
const detectLanguage = (message) => {
  const hindiWords = ['है', 'हैं', 'का', 'की', 'के', 'में', 'पर', 'से', 'को', 'ने', 'और', 'या', 'क्या', 'कैसे', 'कहाँ', 'कब'];
  const hinglishWords = ['bhai', 'yaar', 'kya', 'hai', 'hain', 'mein', 'par', 'se', 'ko', 'aur', 'kaise', 'kahan', 'kab'];
  
  const lowerMessage = message.toLowerCase();
  let hindiCount = 0;
  let hinglishCount = 0;
  
  hindiWords.forEach(word => {
    if (message.includes(word)) hindiCount++;
  });
  
  hinglishWords.forEach(word => {
    if (lowerMessage.includes(word)) hinglishCount++;
  });
  
  if (hindiCount > 0) return 'hindi';
  if (hinglishCount > 0) return 'hinglish';
  return 'english';
};

// Enhanced system prompts based on detected language
const getSystemPrompt = (language, userMessage) => {
  const basePersonality = `You are Dharohar, a friendly and knowledgeable Indian heritage guide. You're passionate about Indian culture, history, and monuments. You love sharing stories and interesting facts.`;
  
  const languageInstructions = {
    hindi: `${basePersonality}
    
    Reply in Hindi (Devanagari script). Be warm, respectful, and use "आप" for addressing. Use cultural expressions like "धन्यवाद", "नमस्ते", "अरे वाह!" etc. Include interesting historical anecdotes and cultural context.`,
    
    hinglish: `${basePersonality}
    
    Reply in Hinglish (Hindi+English mix) in Roman script. Be friendly and casual like talking to a dost. Use expressions like "Yaar", "Bhai", "Arre", "Kya baat hai", "Ekdum mast", "Gazab ka", etc. Mix Hindi and English naturally. Be enthusiastic and relatable.`,
    
    english: `${basePersonality}
    
    Reply in friendly, conversational English. Be informative yet engaging. Use expressions that show enthusiasm like "Amazing!", "Fascinating!", "You'll love this!". Include cultural context and interesting stories.`
  };
  
  const contextPrompt = `
  
  CONVERSATION CONTEXT:
  - Always be helpful and encouraging about travel and heritage exploration
  - If asked about monuments, provide detailed information including timings, fees, best time to visit
  - Share interesting historical stories and cultural significance
  - Suggest nearby attractions and travel tips
  - Be enthusiastic about Indian culture and heritage
  - If someone asks about planning trips, offer practical advice
  - If they seem confused or need help, be extra patient and supportive
  
  SPECIAL FEATURES:
  - Can provide travel planning assistance
  - Can suggest itineraries based on interests
  - Can explain historical significance in simple terms
  - Can recommend food, accommodation, and transportation
  - Can share cultural etiquette and customs
  
  USER MESSAGE ANALYSIS: "${userMessage}"
  - Respond appropriately to their query
  - If they're greeting, greet back warmly
  - If they're asking about specific places, provide detailed info
  - If they need travel advice, be comprehensive
  - If they're just chatting, be conversational and friendly`;
  
  return languageInstructions[language] + contextPrompt;
};

// API Routes
app.get("/", (req, res) => {
  res.json({ status: 'ok', message: "Dharohar Heritage Guide Backend is working!" });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: 'ok',
    service: 'Dharohar Heritage Guide',
    time: new Date().toISOString(),
    features: ['Multilingual Chat', 'Monument Database', 'Travel Planning', 'Cultural Guidance'],
    env: {
      groqApiKey: process.env.GROQ_API_KEY ? "Present" : "Missing",
      port: PORT
    }
  });
});

app.get("/api/monuments", (req, res) => {
  const { search, location, type } = req.query;
  let filteredMonuments = monuments;
  
  if (search) {
    filteredMonuments = filteredMonuments.filter(monument => 
      monument.name.toLowerCase().includes(search.toLowerCase()) ||
      monument.location.toLowerCase().includes(search.toLowerCase()) ||
      monument.significance.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  if (location) {
    filteredMonuments = filteredMonuments.filter(monument => 
      monument.location.toLowerCase().includes(location.toLowerCase())
    );
  }
  
  if (type) {
    filteredMonuments = filteredMonuments.filter(monument => 
      monument.type.toLowerCase().includes(type.toLowerCase())
    );
  }
  
  res.json({
    success: true,
    count: filteredMonuments.length,
    monuments: filteredMonuments,
    searchParams: { search, location, type }
  });
});

// Get specific monument details
app.get("/api/monuments/:id", (req, res) => {
  const monumentId = parseInt(req.params.id);
  const monument = monuments.find(m => m.id === monumentId);
  
  if (!monument) {
    return res.status(404).json({ 
      success: false, 
      error: "Monument not found" 
    });
  }
  
  res.json({
    success: true,
    monument: monument
  });
});

// Enhanced Chat API with personality and language detection
app.post("/api/chat", async (req, res) => {
  console.log("=== Dharohar Chat API Request Started ===");

  const { message, userId, sessionId } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ 
      error: "Message is required and cannot be empty",
      success: false
    });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({
      error: "GROQ_API_KEY is not configured. Please add it to your .env file",
      success: false
    });
  }

  try {
    console.log("Analyzing message:", message);
    
    // Detect language preference
    const detectedLanguage = detectLanguage(message);
    console.log("Detected language:", detectedLanguage);
    
    // Create contextual system prompt
    const systemPrompt = getSystemPrompt(detectedLanguage, message);
    
    const payload = {
      model: "llama-3.1-70b-versatile", // Using more powerful model
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: message.trim()
        }
      ],
      temperature: 0.8, // More creative responses
      max_tokens: 1500, // Longer responses for detailed info
      top_p: 0.9,
      stream: false
    };

    console.log("Sending request to Groq API with enhanced context...");

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      payload,
      {
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 45000, // Increased timeout for longer responses
        validateStatus: function (status) {
          return status < 500;
        }
      }
    );

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
    console.log("Successfully got enhanced reply from Groq API");

    res.json({
      success: true,
      reply: botReply,
      metadata: {
        detectedLanguage,
        userId: userId || 'anonymous',
        sessionId: sessionId || 'default',
        timestamp: new Date().toISOString(),
        responseTime: `${Date.now()}ms`
      }
    });

  } catch (error) {
    console.error("=== Groq API Error ===");
    console.error("Error message:", error.message);

    let errorResponse = {
      error: "Dharohar assistant is temporarily unavailable",
      success: false,
      timestamp: new Date().toISOString(),
      suggestion: "Please try again in a moment. Our heritage guide will be back soon!"
    };

    if (error.response) {
      console.error("Response Status:", error.response.status);
      console.error("Response Data:", error.response.data);

      if (error.response.status === 401) {
        errorResponse.error = "Authentication failed. Please check API configuration.";
      } else if (error.response.status === 429) {
        errorResponse.error = "Too many people are exploring heritage right now! Please try again in a minute.";
      } else if (error.response.status === 400) {
        errorResponse.error = "Invalid request. Please try rephrasing your question.";
      }
    } else if (error.code === 'ECONNABORTED') {
      errorResponse.error = "Response took too long. Please try asking a simpler question.";
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      errorResponse.error = "Network connection issue. Please check your internet connection.";
    }

    res.status(500).json(errorResponse);
  }
});

// Travel Planning API (New Feature)
app.post("/api/plan-trip", async (req, res) => {
  const { destination, days, interests, budget } = req.body;
  
  try {
    const planningPrompt = `Create a ${days}-day travel itinerary for ${destination}. 
    Interests: ${interests}. 
    Budget: ${budget}.
    Include monuments, local food, accommodation suggestions, and cultural experiences.
    Be practical and detailed.`;
    
    // Use the same Groq API call but with travel planning context
    const payload = {
      model: "llama-3.1-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a travel planning expert specializing in Indian heritage tourism. Create detailed, practical itineraries with cultural insights."
        },
        {
          role: "user",
          content: planningPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      top_p: 0.9,
      stream: false
    };

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      payload,
      {
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 45000
      }
    );

    const itinerary = response.data.choices[0].message.content;
    
    res.json({
      success: true,
      itinerary,
      planDetails: { destination, days, interests, budget },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to generate travel plan",
      message: error.message
    });
  }
});

// Cultural Tips API (New Feature)
app.get("/api/cultural-tips/:location", async (req, res) => {
  const { location } = req.params;
  
  try {
    const tipsPrompt = `Provide cultural etiquette, customs, and practical tips for visiting ${location} in India. Include do's and don'ts, local customs, food culture, and respectful behavior guidelines.`;
    
    const payload = {
      model: "llama-3.1-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a cultural etiquette expert for Indian tourism. Provide respectful, practical advice for visitors."
        },
        {
          role: "user",
          content: tipsPrompt
        }
      ],
      temperature: 0.6,
      max_tokens: 1200
    };

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      payload,
      {
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 30000
      }
    );

    const tips = response.data.choices[0].message.content;
    
    res.json({
      success: true,
      location,
      culturalTips: tips,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to get cultural tips",
      message: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  if (process.env.NODE_ENV === 'production') {
    res.status(500).json({ 
      error: 'An unexpected error occurred.',
      success: false,
      service: 'Dharohar Heritage Guide'
    });
  } else {
    res.status(500).json({ 
      error: err.message,
      success: false
    });
  }
});

// Handle 404 routes
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    availableEndpoints: [
      'GET /',
      'GET /api/health',
      'GET /api/monuments',
      'GET /api/monuments/:id',
      'POST /api/chat',
      'POST /api/plan-trip',
      'GET /api/cultural-tips/:location'
    ],
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

// Export for Vercel
module.exports = app;

// Local development server
if (process.env.NODE_ENV !== 'production') {
  const startLocalServer = () => {
    const server = app.listen(PORT, () => {
      console.log('\n🏛️  === Dharohar Heritage Guide Backend === 🏛️');
      console.log(`✅ Server running on port ${PORT}`);
      console.log('\n📡 API Endpoints:');
      console.log(`   Health Check:    GET  http://localhost:${PORT}/api/health`);
      console.log(`   All Monuments:   GET  http://localhost:${PORT}/api/monuments`);
      console.log(`   Monument Detail: GET  http://localhost:${PORT}/api/monuments/:id`);
      console.log(`   Heritage Chat:   POST http://localhost:${PORT}/api/chat`);
      console.log(`   Trip Planning:   POST http://localhost:${PORT}/api/plan-trip`);
      console.log(`   Cultural Tips:   GET  http://localhost:${PORT}/api/cultural-tips/:location`);
      console.log('\n🌟 Features:');
      console.log('   • Multilingual support (English/Hindi/Hinglish)');
      console.log('   • Smart language detection');
      console.log('   • Enhanced monument database');
      console.log('   • Travel planning assistance');
      console.log('   • Cultural etiquette guidance');
      console.log('   • Friendly conversational AI');
      console.log('\n🔑 Environment:');
      console.log(`   GROQ_API_KEY: ${process.env.GROQ_API_KEY ? '✅ Present' : '❌ Missing'}`);
      console.log('\nPress Ctrl+C to stop the server\n');
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use. Please try another port.`);
      } else {
        console.error('❌ Server error:', error);
      }
      process.exit(1);
    });
  };
  startLocalServer();
}
