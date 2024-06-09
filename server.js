const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files from the src directory
app.use(express.static('src'));

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(bodyParser.json());

app.get('/trivia', async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Give me a random trivia question." }],
      max_tokens: 100,
      temperature: 0.7,
    });
    const question = response.choices[0].message.content.trim();
    res.json({ question });
  } catch (error) {
    console.error('Error fetching trivia question:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/evaluate', async (req, res) => {
  const { question, answer } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: `Question: ${question}\nAnswer: ${answer}\nIs this answer correct?` }
      ],
      max_tokens: 100,
      temperature: 0.7,
    });
    const evaluation = response.choices[0].message.content.trim();
    res.json({ evaluation });
  } catch (error) {
    console.error('Error evaluating answer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
