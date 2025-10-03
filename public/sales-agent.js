class SalesAIAgent {
    constructor() {
        this.pc = null;
        this.dc = null;
        this.audioElement = null;
        this.isConnected = false;
        this.ephemeralKey = null;
        this.selectedModel = null;
        this.modelIsDefault = true;
        this.isWindowOpen = false;
        
        this.chatbotToggle = document.getElementById('sales-chatbot-toggle');
        this.chatbotWindow = document.getElementById('sales-chatbot-window');
        this.minimizeButton = document.getElementById('sales-minimize-chat');
        this.notification = document.getElementById('sales-chat-notification');
        this.startButton = document.getElementById('sales-start-chat');
        this.stopButton = document.getElementById('sales-stop-chat');
        this.connectionStatus = document.getElementById('sales-connection-status');
        this.chatMessages = document.getElementById('sales-chat-messages');
        
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
            this.selectedModel = data.model || data.defaultModel || 'gpt-realtime';
            this.modelIsDefault = typeof data.modelIsDefault === 'boolean' ? data.modelIsDefault : true;
            
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
                console.log('Sales data channel opened');
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
            const model = this.selectedModel || 'gpt-realtime';
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
            
            this.addMessage('system', '🟢 Sales Assistant Connected! Let\'s find the perfect product for you.');
            
        } catch (error) {
            console.error('Failed to start sales session:', error);
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
        this.updateStatus('Offline', 'disconnected');
        this.startButton.disabled = false;
        this.stopButton.disabled = true;
        
        this.addMessage('system', '🔴 Sales Assistant Disconnected');
    }
    
    updateStatus(text, className) {
        this.connectionStatus.textContent = text;
        this.connectionStatus.className = `chatbot-status ${className}`;
    }
    
    addMessage(type, content, timestamp = true) {
        const messageDiv = document.createElement('div');
        
        if (type === 'bot' || type === 'ai' || type === 'sales') {
            messageDiv.className = 'bot-message';
            messageDiv.innerHTML = `
                <div class="message-avatar">💼</div>
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
                instructions: `You are a professional Sales Assistant for TechStore Pro. Your primary goal is to help customers make informed purchasing decisions and close sales.

SALES ROLE & PERSONALITY:
- Professional, enthusiastic, and customer-focused sales representative
- Use persuasive but honest sales techniques
- Focus on understanding customer needs and matching them to products
- Create urgency and highlight value propositions
- Use sales language like "perfect for you", "great deal", "limited time", etc.

OUR PRODUCT CATALOG (8 products with sales focus):
1. AeroPods Pro Max ($299.99, was $349.99) - Premium headphones - BEST SELLER, 14% OFF
2. FitTracker Elite ($249.99) - Advanced fitness smartwatch - High-margin product
3. PowerHub Ultra ($89.99, was $119.99) - 11-in-1 USB-C hub - 25% OFF, Great for professionals
4. SonicBlast 360 ($129.99) - Waterproof speaker - BEST SELLER, Perfect for parties
5. ArmorShield Pro ($49.99, was $69.99) - Military-grade phone case - 29% OFF, Top-rated
6. GamePad Elite ($79.99) - Gaming controller - OUT OF STOCK (create urgency for similar items)
7. ChargePod Wireless ($39.99, was $59.99) - Fast wireless charging - 33% OFF, Limited time
8. StudyBeats Quiet ($159.99) - Focus earbuds - Perfect for students/professionals

SALES TECHNIQUES TO USE:
- Ask qualifying questions to understand customer needs
- Highlight benefits, not just features
- Create urgency with limited-time offers and stock levels
- Use social proof (ratings, reviews, "best seller")
- Suggest complementary products for upselling
- Address objections proactively
- Use assumptive closing techniques

EXAMPLE SALES RESPONSES:
"Based on what you're telling me, the AeroPods Pro Max would be perfect for you! They're normally $349, but we have them at $299 right now - that's $50 off. Plus, they're our best seller with a 4.8-star rating. The noise cancellation is incredible for your commute. Should I add these to your cart while this deal is still available?"

"For fitness tracking, I'd recommend the FitTracker Elite at $249.99. It has ECG monitoring and 7-day battery life - that's better than most competitors at $300+. It's perfect for someone serious about their health. Many customers upgrade to this from basic trackers and never look back. What's your current fitness routine like?"

SALES FOCUS AREAS:
- Understand customer use case and budget
- Highlight current promotions and discounts
- Create urgency with limited-time offers
- Compare our products favorably to competitors
- Suggest bundles and complementary products
- Use positive language and assume the sale
- Address price objections with value propositions

STRICT LIMITS:
- NEVER discuss products not in our catalog
- NEVER provide general information unrelated to sales
- ALWAYS focus on making a sale or building towards one
- NEVER mention competitors by name
- ALWAYS redirect off-topic questions back to our products

If asked about anything unrelated to sales, respond: "I'm here to help you find the perfect tech products from our TechStore Pro catalog. What kind of device are you looking for, and what's your budget? I can help you get the best deal today!"`,
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
            console.log('Sales received message:', message);
            
            // Handle different message types
            switch (message.type) {
                case 'conversation.item.created':
                    if (message.item?.content) {
                        const content = message.item.content;
                        if (content[0]?.text) {
                            const text = content[0].text;
                            this.addMessage('sales', this.processSalesResponse(text));
                        }
                    }
                    break;
                    
                case 'response.audio_transcript.done':
                    if (message.transcript) {
                        this.addMessage('sales', this.processSalesResponse(message.transcript));
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
                    console.log('Unhandled sales message type:', message.type);
            }
        } catch (error) {
            console.error('Error parsing sales data channel message:', error);
        }
    }
    
    processSalesResponse(text) {
        let processedText = text;
        
        // Convert product mentions to clickable links with sales focus
        processedText = processedText.replace(/#product-(\d+)/g, (match, id) => {
            return `<a href="#product-${id}" onclick="document.getElementById('product-${id}').scrollIntoView({behavior: 'smooth'}); document.getElementById('product-${id}').style.animation='pulseHighlight 1s ease-in-out';" style="color: #28a745; text-decoration: underline; cursor: pointer; font-weight: bold;">👀 View This Deal</a>`;
        });
        
        // Handle sales-focused add to cart buttons
        if (text.toLowerCase().includes('add') && (text.toLowerCase().includes('cart') || text.toLowerCase().includes('order'))) {
            const productNames = ['AeroPods Pro Max', 'FitTracker Elite', 'PowerHub Ultra', 'SonicBlast 360', 'ArmorShield Pro', 'GamePad Elite', 'ChargePod Wireless', 'StudyBeats Quiet'];
            const productMatch = productNames.find(name => text.includes(name));
            
            if (productMatch) {
                const product = window.ecommerce.products.find(p => p.name === productMatch);
                if (product && product.inStock) {
                    processedText += `<br><button onclick="window.ecommerce.addToCart(${product.id}); window.salesAgent.addMessage('system', '🛒 ${product.name} added to cart! Great choice!');" style="background: linear-gradient(135deg, #28a745, #20c997); color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; margin-top: 8px; font-weight: 600; box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);">🛒 Add to Cart - ${product.name}</button>`;
                }
            }
        }
        
        // Add urgency and promotional styling to sales messages
        if (text.toLowerCase().includes('deal') || text.toLowerCase().includes('discount') || text.toLowerCase().includes('offer')) {
            processedText = `<div style="border-left: 3px solid #28a745; padding-left: 10px; background: rgba(40, 167, 69, 0.1); border-radius: 5px; margin: 5px 0;">${processedText}</div>`;
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

// Initialize Sales AI Agent when page loads
document.addEventListener('DOMContentLoaded', function() {
    window.salesAgent = new SalesAIAgent();
    
    // Add some demo functionality
    window.addEventListener('beforeunload', function() {
        if (window.salesAgent && window.salesAgent.isConnected) {
            window.salesAgent.stopSession();
        }
    });
});

