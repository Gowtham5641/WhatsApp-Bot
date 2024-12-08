import dotenv from 'dotenv';

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is required in .env file');
}

export const config = {
    geminiApiKey: process.env.GEMINI_API_KEY,
    responseDelay: 1000, // Delay before responding (ms)
    offlineOnly: true    // Only respond when user is offline
};