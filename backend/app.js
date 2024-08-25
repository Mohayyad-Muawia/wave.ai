const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const { GoogleGenerativeAI } = require('@google/generative-ai')
require('dotenv').config()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

const genAI = new GoogleGenerativeAI(process.env.API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-pro" })
let chat = model.startChat({
    history: [],
    generationConfig: {
        maxOutputTokens: 1024,
    }
})


app.post('/send', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        // Simple input validation and sanitization
        if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
            return res.status(400).json({ error: 'Invalid input. Please enter a valid prompt.' });
        }

        // Initialize chat if not already done
        if (!chat) {
            chat = model.startChat({
                history: [], // Optionally start with an empty history
                generationConfig: {
                    maxOutputTokens: 1024,
                }
            });
        }

        const result = await chat.sendMessage(prompt);
        const response = result.response.text();

        res.set('Cache-Control', 'no-cache');
        res.json({ response: response });

    } catch (error) {
        console.error('Error:', error.message); // Logging the detailed error
        res.status(500).json({ error: 'Something went wrong. Please try again later.' });

        // Optionally reset the chat if persistent errors are occurring
        chat = null;
    }
});

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}!`); 

})
