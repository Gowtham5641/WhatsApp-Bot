import { generateResponse } from './geminiService.js';
import { config } from './config.js';

let userOnline = false;

// Set the user's online status (this can be updated dynamically)
export function setUserOnline(status) {
    userOnline = status;
}

// Handle incoming message and generate a response
export async function handleMessage(message) {
    try {
        // Ignore if it's a status message (e.g., "is typing" or "left the group")
        if (message.isStatus) return;

        // Only respond when user is offline (if offlineOnly is true)
        if (config.offlineOnly && userOnline) return;

        // Generate a response using Gemini
        const response = await generateResponse(message.body);
        
        // Add a natural delay before responding
        await new Promise(resolve => setTimeout(resolve, config.responseDelay));
        
        // Send the response back to the user
        await message.reply(response);
    } catch (error) {
        console.error('Error handling message:', error);
    }
}
