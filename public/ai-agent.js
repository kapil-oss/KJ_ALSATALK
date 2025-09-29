class AIAgent {
    constructor() {
        this.pc = null;
        this.dc = null;
        this.audioElement = null;
        this.isConnected = false;
        this.ephemeralKey = null;
        this.isWindowOpen = false;
        
        this.chatbotToggle = document.getElementById('chatbot-toggle');
        this.chatbotWindow = document.getElementById('chatbot-window');
        this.minimizeButton = document.getElementById('minimize-chat');
        this.notification = document.getElementById('chat-notification');
        this.startButton = document.getElementById('start-chat');
        this.stopButton = document.getElementById('stop-chat');
        this.connectionStatus = document.getElementById('connection-status');
        this.chatMessages = document.getElementById('chat-messages');
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.chatbotToggle.addEventListener('click', () => this.toggleChatbot());
        this.minimizeButton.addEventListener('click', () => this.minimizeChatbot());
        this.startButton.addEventListener('click', () => this.startSession());
        this.stopButton.addEventListener('click', () => this.stopSession());
        
        // Hide notification after first interaction
        this.chatbotToggle.addEventListener('click', () => {
            this.notification.style.display = 'none';
        }, { once: true });
    }
    
    toggleChatbot() {
        if (this.isWindowOpen) {
            this.minimizeChatbot();
        } else {
            this.openChatbot();
        }
    }
    
    openChatbot() {
        this.chatbotWindow.classList.add('show');
        this.isWindowOpen = true;
        this.notification.style.display = 'none';
    }
    
    minimizeChatbot() {
        this.chatbotWindow.classList.remove('show');
        this.isWindowOpen = false;
    }
    
    async startSession() {
        try {
            this.updateStatus('Connecting...', 'connecting');
            this.startButton.disabled = true;
            
            // Get session token
            const tokenResponse = await fetch('/token');
            const data = await tokenResponse.json();
            this.ephemeralKey = data.value;
            
            if (this.ephemeralKey === 'your-openai-api-key-here') {
                throw new Error('Please set your OpenAI API key in the server environment');
            }
            
            // Create peer connection
            this.pc = new RTCPeerConnection();
            
            // Set up audio element for remote audio
            this.audioElement = document.createElement('audio');
            this.audioElement.autoplay = true;
            this.pc.ontrack = (e) => {
                this.audioElement.srcObject = e.streams[0];
            };
            
            // Add local audio track for microphone
            try {
                const ms = await navigator.mediaDevices.getUserMedia({ 
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        autoGainControl: true
                    }
                });
                this.pc.addTrack(ms.getTracks()[0]);
            } catch (micError) {
                console.error('Microphone access error:', micError);
                throw new Error('Microphone access denied or not available. Please allow microphone permissions and try again.');
            }
            
            // Set up data channel for events
            this.dc = this.pc.createDataChannel('oai-events');
            this.dc.addEventListener('open', () => {
                console.log('Data channel opened');
                this.sendInitialPrompt();
            });
            
            this.dc.addEventListener('message', (event) => {
                this.handleDataChannelMessage(event);
            });
            
            // Create offer and set local description
            const offer = await this.pc.createOffer();
            await this.pc.setLocalDescription(offer);
            
            // Send offer to OpenAI Realtime API
            const baseUrl = 'https://api.openai.com/v1/realtime/calls';
            const model = 'gpt-realtime';
            const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
                method: 'POST',
                body: offer.sdp,
                headers: {
                    'Authorization': `Bearer ${this.ephemeralKey}`,
                    'Content-Type': 'application/sdp',
                },
            });
            
            if (!sdpResponse.ok) {
                throw new Error(`API request failed: ${sdpResponse.status} ${sdpResponse.statusText}`);
            }
            
            const answer = {
                type: 'answer',
                sdp: await sdpResponse.text(),
            };
            
            await this.pc.setRemoteDescription(answer);
            
            this.isConnected = true;
            this.updateStatus('Connected', 'connected');
            this.stopButton.disabled = false;
            
            this.addMessage('system', '🟢 Connected to AI Assistant! Start speaking...');
            
        } catch (error) {
            console.error('Failed to start session:', error);
            this.addMessage('system', `❌ Connection failed: ${error.message}`);
            this.updateStatus('Connection failed', 'disconnected');
            this.startButton.disabled = false;
        }
    }
    
    stopSession() {
        if (this.pc) {
            this.pc.close();
            this.pc = null;
        }
        
        if (this.dc) {
            this.dc.close();
            this.dc = null;
        }
        
        if (this.audioElement) {
            this.audioElement.srcObject = null;
            this.audioElement = null;
        }
        
        this.isConnected = false;
        this.updateStatus('Disconnected', 'disconnected');
        this.startButton.disabled = false;
        this.stopButton.disabled = true;
        
        this.addMessage('system', '🔴 Disconnected from AI Assistant');
    }
    
    updateStatus(text, className) {
        this.connectionStatus.textContent = text;
        this.connectionStatus.className = `chatbot-status ${className}`;
    }
    
    addMessage(type, content, timestamp = true) {
        const messageDiv = document.createElement('div');
        
        if (type === 'bot' || type === 'ai') {
            messageDiv.className = 'bot-message';
            messageDiv.innerHTML = `
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <div>${content}</div>
                    ${timestamp ? `<small style="opacity: 0.7; font-size: 0.8em; margin-top: 0.5rem; display: block;">${new Date().toLocaleTimeString()}</small>` : ''}
                </div>
            `;
        } else if (type === 'user') {
            messageDiv.className = 'user-message';
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div>${content}</div>
                    ${timestamp ? `<small style="opacity: 0.7; font-size: 0.8em; margin-top: 0.5rem; display: block;">${new Date().toLocaleTimeString()}</small>` : ''}
                </div>
            `;
        } else {
            messageDiv.className = 'system-message';
            messageDiv.textContent = content;
        }
        
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    sendInitialPrompt() {
        const systemPrompt = {
            type: 'session.update',
            session: {
                modalities: ['text', 'audio'],
                instructions: `You are the Support Assistant for TechStore Pro. You focus on website navigation, account help, and general customer support (NOT sales).

YOUR ROLE:
- Help customers navigate the website and find information
- Provide technical support and account assistance  
- Answer questions about orders, shipping, returns, and policies
- Guide users to the right sections of the website
- Provide basic product information (features, specs, compatibility)
- Direct sales-focused questions to the Sales Assistant

WEBSITE SECTIONS YOU CAN NAVIGATE:
- Categories: Audio, Wearables, Accessories, Gaming (#categories)
- Products: Featured products with filtering (#products)  
- About: Store information and features (#about)
- Contact: Customer support information (#contact)

BASIC PRODUCT INFO (8 products - provide specs, not sales pitches):
1. AeroPods Pro Max ($299.99) - Audio - Specs: Noise cancellation, 40h battery, spatial audio
2. FitTracker Elite ($249.99) - Wearables - Specs: ECG, GPS, 7-day battery, water resistant
3. PowerHub Ultra ($89.99) - Accessories - Specs: 11-in-1, dual 4K HDMI, 100W PD, Ethernet
4. SonicBlast 360 ($129.99) - Audio - Specs: 360° sound, LED lights, 24h battery, IPX7
5. ArmorShield Pro ($49.99) - Accessories - Specs: 15ft drop protection, wireless charging
6. GamePad Elite ($79.99) - Gaming - Specs: Customizable, haptic feedback, 40h battery (OUT OF STOCK)
7. ChargePod Wireless ($39.99) - Accessories - Specs: Fast charging, cooling fan, case compatible
8. StudyBeats Quiet ($159.99) - Audio - Specs: Study mode, ambient control, 8h battery

SUPPORT TOPICS YOU HANDLE:
- Website navigation and how to use features
- Order status, shipping, and return policies  
- Account setup and login issues
- Technical compatibility questions
- Product specifications and feature explanations
- Troubleshooting website or app issues
- General store policies and information

WHAT TO REDIRECT TO SALES ASSISTANT:
- Purchase decisions and product recommendations
- Pricing discussions and deal negotiations
- Questions about "which product should I buy"
- Budget-based product suggestions
- Comparison shopping for purchase decisions

RESPONSE FORMAT:
- Provide helpful, informative responses
- Include navigation links when relevant: "Go to About: #about"
- Offer specific help: "I can help you navigate to [section] or answer questions about [topic]"
- For sales questions: "For product recommendations and purchasing decisions, our Sales Assistant (green chat button on the left) can help you better!"

EXAMPLES:
"I can help you navigate to our Audio category to see all headphones and speakers. Go to Categories: #categories, then click Audio, or I can filter them for you."

"The FitTracker Elite is compatible with both iOS and Android. It has ECG monitoring and 7-day battery life. For help choosing between fitness trackers, our Sales Assistant can provide personalized recommendations!"

STRICT LIMITS:
- DON'T make sales pitches or push products
- DON'T discuss pricing strategies or negotiate deals  
- DON'T provide purchase recommendations
- ALWAYS redirect sales questions to the Sales Assistant
- NEVER answer general knowledge questions unrelated to our store

If asked about anything unrelated to support, respond: "I'm your TechStore Pro support assistant. I can help with website navigation, account issues, order questions, or product specifications. For product recommendations and purchasing decisions, try our Sales Assistant (green button on the left)!"`,
                voice: 'alloy',
                turn_detection: {
                    type: 'server_vad',
                    threshold: 0.5,
                    prefix_padding_ms: 300,
                    silence_duration_ms: 500
                }
            }
        };
        
        if (this.dc && this.dc.readyState === 'open') {
            this.dc.send(JSON.stringify(systemPrompt));
        }
    }
    
    handleDataChannelMessage(event) {
        try {
            const message = JSON.parse(event.data);
            console.log('Received message:', message);
            
            // Handle different message types
            switch (message.type) {
                case 'conversation.item.created':
                    if (message.item?.content) {
                        const content = message.item.content;
                        if (content[0]?.text) {
                            const text = content[0].text;
                            this.addMessage('ai', this.processAIResponse(text));
                        }
                    }
                    break;
                    
                case 'response.audio_transcript.done':
                    if (message.transcript) {
                        this.addMessage('ai', this.processAIResponse(message.transcript));
                    }
                    break;
                    
                case 'input_audio_buffer.speech_started':
                    this.addMessage('system', '🎤 Listening...');
                    break;
                    
                case 'input_audio_buffer.speech_stopped':
                    this.addMessage('system', '⏸️ Processing...');
                    break;
                    
                case 'response.done':
                    // Response completed
                    break;
                    
                default:
                    console.log('Unhandled message type:', message.type);
            }
        } catch (error) {
            console.error('Error parsing data channel message:', error);
        }
    }
    
    processAIResponse(text) {
        let processedText = text;
        
        // Convert #product-X links to clickable links
        processedText = processedText.replace(/#product-(\d+)/g, (match, id) => {
            return `<a href="#product-${id}" onclick="document.getElementById('product-${id}').scrollIntoView({behavior: 'smooth'}); document.getElementById('product-${id}').style.animation='pulse 1s ease-in-out';" style="color: #ffffff; text-decoration: underline; cursor: pointer;">View Product</a>`;
        });
        
        // Handle section navigation
        processedText = processedText.replace(/#(categories|products|about|contact)/g, (match, section) => {
            return `<a href="#${section}" onclick="document.getElementById('${section}').scrollIntoView({behavior: 'smooth'});" style="color: #ffffff; text-decoration: underline; cursor: pointer;">Go to ${section.charAt(0).toUpperCase() + section.slice(1)}</a>`;
        });
        
        // Handle category filtering
        const categoryRegex = /(show|filter|browse|view)\s+(audio|wearables|accessories|gaming)\s+(products|category)?/gi;
        if (categoryRegex.test(text)) {
            const categoryMatch = text.match(categoryRegex);
            if (categoryMatch) {
                const category = categoryMatch[0].match(/(audio|wearables|accessories|gaming)/i)[0].toLowerCase();
                processedText += `<br><button onclick="window.ecommerce.filterProducts('${category}'); document.querySelector('[data-filter=\\"${category}\\"]').click(); document.getElementById('products').scrollIntoView({behavior: 'smooth'});" style="background: rgba(255, 255, 255, 0.2); color: white; border: 1px solid rgba(255, 255, 255, 0.3); padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-top: 8px;">Show ${category.charAt(0).toUpperCase() + category.slice(1)} Products</button>`;
            }
        }
        
        // Check if AI is asking to add to cart and create interactive buttons
        if (text.toLowerCase().includes('add this to your cart') || text.toLowerCase().includes('add to cart')) {
            const productNames = ['AeroPods Pro Max', 'FitTracker Elite', 'PowerHub Ultra', 'SonicBlast 360', 'ArmorShield Pro', 'GamePad Elite', 'ChargePod Wireless', 'StudyBeats Quiet'];
            const productMatch = productNames.find(name => text.includes(name));
            
            if (productMatch) {
                const product = window.ecommerce.products.find(p => p.name === productMatch);
                if (product && product.inStock) {
                    processedText += `<br><button onclick="window.ecommerce.addToCart(${product.id}); window.aiAgent.addMessage('system', '✅ ${product.name} added to cart!');" style="background: rgba(40, 167, 69, 0.9); color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-top: 8px;">Add ${product.name} to Cart</button>`;
                }
            }
        }
        
        return processedText;
    }
    
    sendCartUpdate(message) {
        if (this.dc && this.dc.readyState === 'open') {
            const cartEvent = {
                type: 'conversation.item.create',
                item: {
                    type: 'message',
                    role: 'user',
                    content: [{
                        type: 'input_text',
                        text: message
                    }]
                }
            };
            this.dc.send(JSON.stringify(cartEvent));
        }
    }
    
    sendTextMessage(text) {
        if (this.dc && this.dc.readyState === 'open') {
            const textEvent = {
                type: 'conversation.item.create', 
                item: {
                    type: 'message',
                    role: 'user',
                    content: [{
                        type: 'input_text',
                        text: text
                    }]
                }
            };
            this.dc.send(JSON.stringify(textEvent));
            this.addMessage('user', text);
        }
    }
}

// Initialize AI Agent when page loads
document.addEventListener('DOMContentLoaded', function() {
    window.aiAgent = new AIAgent();
    
    // Add some demo functionality
    window.addEventListener('beforeunload', function() {
        if (window.aiAgent && window.aiAgent.isConnected) {
            window.aiAgent.stopSession();
        }
    });
});