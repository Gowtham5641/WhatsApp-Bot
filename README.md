# WhatsApp Gemini Bot

A WhatsApp bot that uses Google's Gemini AI to respond to messages when you're offline.

## Setup Instructions

1. Create a Heroku account and install Heroku CLI
2. Clone this repository
3. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```
4. Set up environment variables on Heroku:
   ```bash
   heroku config:set GEMINI_API_KEY=your_api_key
   ```
5. Deploy to Heroku:
   ```bash
   git push heroku main
   ```
6. Enable the Heroku worker:
   ```bash
   heroku ps:scale web=1
   ```
7. View logs:
   ```bash
   heroku logs --tail
   ```

## First-Time Setup
1. After deploying, check the Heroku logs
2. You'll see a QR code in the logs
3. Scan the QR code with your WhatsApp to authenticate
4. The bot will now respond to messages when you're offline

## Important Notes
- The WhatsApp session will persist between Heroku dynos restarts
- If you need to reset the session, use: `heroku restart`