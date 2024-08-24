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
const chat = model.startChat({
    history: [],
    generationConfig: {
        maxOutputTokens: 1024,
    }
})

app.post('/send', async (req, res) => {
    try{
        const prompt = req.body.prompt
        const result = await chat.sendMessage(prompt)
        const response = result.response.text()
        
        res.set('Cache-Control', 'no-cache');
        res.json({ response: response })
        
    }catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
})

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}!`); 

})