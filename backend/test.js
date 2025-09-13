const fetch = require('node-fetch');

async function testGroq() {
  try {
    console.log('Sending request...');
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [
          {
            role: 'system',
            content: 'You are a friendly Indian heritage guide. Answer in Hinglish.'
          },
          {
            role: 'user',
            content: 'Namaste! Khajuraho ke mandir ke baare mein batao'
          }
        ]
      })
    });
    
    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

testGroq();
