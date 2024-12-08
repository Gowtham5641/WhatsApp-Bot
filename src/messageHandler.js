import { generateResponse } from './geminiService.js';
import { config } from './config.js';

let userOnline = false;

export function setUserOnline(status) {
    userOnline = status;
}

export async function handleMessage(message) {
    try {
        // Ignore if it's a status message
        if (message.isStatus) return;

        // Only respond when user is offline (if offlineOnly is true)
        if (config.offlineOnly && userOnline) return;

        // Generate response using Gemini
        const response = await generateResponse(message.body);
        
        // Add a natural delay before responding
        await new Promise(resolve => setTimeout(resolve, config.responseDelay));
        
        // Send the response
        await message.reply(response);
    } catch (error) {
        console.error('Error handling message:', error);
    }
}