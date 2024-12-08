import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import { config } from './config.js';
import { handleMessage } from './messageHandler.js';
import { initGemini } from './geminiService.js';

// Initialize WhatsApp client with local authentication
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Function to initialize Gemini service
async function initializeGemini() {
    try {
        console.log('Initializing Gemini...');
        await initGemini();  // Assuming this is an async function that connects to Gemini
        console.log('Gemini Initialized');
    } catch (error) {
        console.error('Error initializing Gemini:', error);
    }
}

// Handle QR Code for authentication
client.on('qr', (qr) => {
    console.log('Scan this QR code to login:');
    qrcode.generate(qr, { small: true });
});

// Ready event: Client is ready after successful authentication
client.on('ready', () => {
    console.log('WhatsApp bot is ready!');
});

// Handle authentication failures
client.on('auth_failure', (msg) => {
    console.error('Authentication failed:', msg);
});

// Handle disconnections
client.on('disconnected', (reason) => {
    console.log('Client was disconnected:', reason);
});

// Handle incoming messages
client.on('message', (message) => {
    handleMessage(message); // Process each message using the handler function
});

// Initialize the client and Gemini service
async function initializeClient() {
    try {
        // Initialize Gemini first
        await initializeGemini();

        // Now initialize WhatsApp client
        await client.initialize();
        console.log('WhatsApp client initialized');
    } catch (error) {
        console.error('Failed to initialize client:', error);
    }
}

// Start the initialization
initializeClient();

// Handle process termination gracefully
process.on('SIGINT', async () => {
    console.log('Shutting down...');
    await client.destroy();
    process.exit(0);
});
