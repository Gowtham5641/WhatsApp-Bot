import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from './config.js';

let genAI;
let model;

// Initialize Gemini with the API key and set up the generative model
export function initGemini() {
    genAI = new GoogleGenerativeAI(config.geminiApiKey);
    model = genAI.getGenerativeModel({ model: 'gemini-pro' });
}

// Generate a response using the Gemini model
export async function generateResponse(message) {
    try {
        const prompt = `You are a helpful WhatsApp assistant. 
        Please respond to this message: "${message}"
        Keep your response natural, helpful, and concise.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();  // Ensure this returns the text response
    } catch (error) {
        console.error('Gemini API error:', error);
        return 'I apologize, but I encountered an error while processing your message.';
    }
}
