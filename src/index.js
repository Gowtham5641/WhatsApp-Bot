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

// Initialize Gemini
initGemini();

// Handle QR Code
client.on('qr', (qr) => {
    console.log('Scan this QR code to login:');
    qrcode.generate(qr, { small: true });
});

// Ready event
client.on('ready', () => {
    console.log('WhatsApp bot is ready!');
});

// Handle authentication failures
client.on('auth_failure', (msg) => {
    console.error('Authentication failed:', msg);
});

// Handle disconnects
client.on('disconnected', (reason) => {
    console.log('Client was disconnected:', reason);
});

// Handle incoming messages
client.on('message', handleMessage);

// Initialize client
client.initialize().catch(err => {
    console.error('Failed to initialize client:', err);
});

// Handle process termination
process.on('SIGINT', async () => {
    console.log('Shutting down...');
    await client.destroy();
    process.exit(0);
});