const PORT = 8000;
import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const API_KEY = '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';
app.post('/completions', async (req, res) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{role:"user", content: "how are you?"}],
      max_tokens:40
    })
  };
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', options)
    const data = await response.json();

    res.send(data)
  } catch (error) {
    console.error(error);
  }
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
