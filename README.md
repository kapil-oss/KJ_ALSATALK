# AI Shopping Assistant - Realtime Demo

A demo ecommerce website with an AI shopping assistant powered by OpenAI's Realtime API. The AI can help users find products, answer questions, and navigate the website through voice conversation.

## Features

- 🛒 **Ecommerce Website**: Browse and add products to cart
- 🤖 **AI Voice Assistant**: Real-time voice conversation with AI
- 🎯 **Smart Recommendations**: AI suggests products based on user needs  
- 🗣️ **Voice Navigation**: Ask AI to help navigate the website
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Prerequisites

- Node.js (v14 or higher)
- OpenAI API key with Realtime API access
- Modern web browser with WebRTC support

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set OpenAI API Key

Set your OpenAI API key as an environment variable:

**Windows:**
```cmd
set OPENAI_API_KEY=your_actual_openai_api_key_here
```

**macOS/Linux:**
```bash
export OPENAI_API_KEY=your_actual_openai_api_key_here
```

**Or create a .env file:**
```
OPENAI_API_KEY=your_actual_openai_api_key_here
```

### 3. Start the Server

```bash
npm start
```

The server will start at `http://localhost:3000`

## How to Use

1. **Browse Products**: Scroll down to see the product catalog
2. **Start AI Chat**: Click "Start Voice Chat" to connect to the AI assistant  
3. **Voice Interaction**: Speak naturally to the AI:
   - "Show me wireless headphones"
   - "What's the best laptop stand?"
   - "Add the Bluetooth speaker to my cart"
   - "Navigate to the about section"
4. **Add to Cart**: Click product "Add to Cart" buttons or ask the AI
5. **Stop Chat**: Click "Stop Chat" to disconnect

## AI Assistant Capabilities

The AI can help with:

- **Product Search**: "Find me something for working from home"
- **Recommendations**: "What's good for fitness tracking?"  
- **Product Info**: "Tell me about the wireless headphones"
- **Navigation**: "Go to the products section"
- **Cart Management**: "Add the smart watch to my cart"
- **General Shopping**: "What's on sale?" or "What's under $50?"

## Project Structure

```
├── server.js              # Express server with token endpoint
├── package.json           # Project dependencies
├── README.md             # This file
└── public/
    ├── index.html        # Main HTML page
    ├── styles.css        # CSS styling  
    ├── ecommerce.js      # Product catalog and shopping cart
    └── ai-agent.js       # OpenAI Realtime API integration
```

## Technical Details

- **Backend**: Node.js with Express
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **AI Integration**: OpenAI Realtime API with WebRTC
- **Voice Processing**: Browser's Web Audio API
- **Real-time Communication**: WebRTC data channels

## Troubleshooting

**"Please set your OpenAI API key"**
- Make sure you've set the OPENAI_API_KEY environment variable
- Restart the server after setting the key

**"Connection failed"** 
- Check your internet connection
- Verify your OpenAI API key is valid and has Realtime API access
- Try refreshing the page and reconnecting

**No audio input/output**
- Allow microphone permissions in your browser
- Check your system audio settings
- Try using headphones to avoid feedback

**Browser compatibility issues**
- Use a modern browser (Chrome, Firefox, Safari, Edge)
- Ensure WebRTC is enabled in browser settings

## Development

To modify the AI assistant's behavior, edit the system prompt in `public/ai-agent.js` in the `sendInitialPrompt()` method.

To add more products, update the `products` array in `public/ecommerce.js`.

## License

This is a demo project for educational purposes.