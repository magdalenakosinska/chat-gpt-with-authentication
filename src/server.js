const PORT = 8000;
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config()

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const API_KEY = process.env.API_KEY;
app.post('/completions', async (req, res) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: req.body.messages,
      max_tokens:100
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
