const { OpenAI } = require('openai');
require('dotenv').config();

// Initialize OpenAI directly with the API key
const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

module.exports = openai