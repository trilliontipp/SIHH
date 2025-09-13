const fetch = require('node-fetch');

async function test() {
  try {
    console.log('Sending simple request...');
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [
          { role: 'user', content: 'Say hi in Hindi' }
        ]
      })
    });
    
    console.log('Status:', response.status);
    const text = await response.text();
    console.log('Raw response:', text);
    const data = JSON.parse(text);
    console.log('Parsed response:', data);
    if (data.choices && data.choices[0]) {
      console.log('Message:', data.choices[0].message.content);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

test();
