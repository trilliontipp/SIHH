const axios = require('axios');

async function testChatEndpoint() {
  try {
    console.log('Testing chat endpoint...');
    const response = await axios.post('http://localhost:3000/api/chat', {
      message: 'Tell me about Khajuraho Temples'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Success! Response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
  }
}

testChatEndpoint();