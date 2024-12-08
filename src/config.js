import dotenv from 'dotenv';

dotenv.config();

// Ensure Gemini API key is present in environment variables
if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is required in .env file');
}

export const config = {
    geminiApiKey: process.env.GEMINI_API_KEY,
    responseDelay: 1000, // Delay before responding (in milliseconds)
    offlineOnly: true    // Only respond when the user is offline
};
