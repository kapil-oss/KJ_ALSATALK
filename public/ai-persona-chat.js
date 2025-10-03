// AI Persona Chat System using OpenAI Realtime API

class AIPersonaChat {
    constructor() {
        this.pc = null;
        this.dc = null;
        this.audioElement = null;
        this.isConnected = false;
        this.ephemeralKey = null;
        this.selectedModel = null;
        this.modelIsDefault = true;
        this.currentPersona = null;
        this.isCreatingResponse = false;

        // UI elements - these may not exist, so we handle gracefully
        this.startButton = document.getElementById('persona-start-chat');
        this.stopButton = document.getElementById('persona-stop-chat');
        this.switchButton = document.getElementById('persona-switch-chat');
        this.connectionStatus = document.getElementById('persona-connection-status');
        this.chatMessages = document.getElementById('persona-chat-messages');
        this.voiceIndicator = document.getElementById('persona-voice-indicator');
        this.voiceStatus = document.getElementById('persona-voice-status');
        this.voiceLevel = document.getElementById('persona-voice-level');

        this.setupEventListeners();
    }

    setupEventListeners() {
        console.log('Setting up event listeners...', {
            startButton: this.startButton,
            stopButton: this.stopButton,
            switchButton: this.switchButton
        });

        if (this.startButton) {
            this.startButton.addEventListener('click', () => {
                console.log('Connect button clicked!');
                this.startSession();
            });
        }
        if (this.stopButton) {
            this.stopButton.addEventListener('click', () => this.stopSession());
        }
        if (this.switchButton) {
            this.switchButton.addEventListener('click', () => this.switchPersona());
        }
    }

    async startSession() {
        console.log('Starting session...', { personaManager, currentPersona: personaManager?.getCurrentPersona() });

        if (!personaManager || !personaManager.getCurrentPersona()) {
            this.addMessage('system', 'Please select a persona first!');
            return;
        }

        try {
            this.updateStatus('Connecting...', 'connecting');
            if (this.startButton) {
                this.startButton.disabled = true;
            }
            this.currentPersona = personaManager.getCurrentPersona();

            console.log('Selected persona:', this.currentPersona);

            // Get session token
            const tokenResponse = await fetch('/token');
            const data = await tokenResponse.json();
            this.ephemeralKey = data.value;
            this.selectedModel = data.model || data.defaultModel || 'gpt-realtime';
            this.modelIsDefault = typeof data.modelIsDefault === 'boolean' ? data.modelIsDefault : true;

            if (!this.ephemeralKey || this.ephemeralKey === 'your-openai-api-key-here') {
                throw new Error('Please set your OpenAI API key in the server environment');
            }

            // Create peer connection
            this.pc = new RTCPeerConnection({
                iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' }
                ]
            });

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
                        autoGainControl: true,
                        sampleRate: 24000
                    }
                });

                // Monitor microphone level
                this.setupAudioLevelMonitoring(ms);

                this.pc.addTrack(ms.getTracks()[0]);
            } catch (micError) {
                console.error('Microphone access error:', micError);
                throw new Error('Microphone access denied or not available. Please allow microphone permissions and try again.');
            }

            // Set up data channel for events
            this.dc = this.pc.createDataChannel('oai-events');
            this.dc.addEventListener('open', () => {
                console.log('Data channel opened');
                // Add slight delay to ensure connection is stable
                setTimeout(() => {
                    this.sendPersonaPrompt();
                }, 500);
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
                const errorText = await sdpResponse.text();
                throw new Error(`API request failed: ${sdpResponse.status} ${sdpResponse.statusText} - ${errorText}`);
            }

            const answer = {
                type: 'answer',
                sdp: await sdpResponse.text(),
            };

            await this.pc.setRemoteDescription(answer);

            this.isConnected = true;
            this.updateStatus('Connected', 'connected');
            if (this.stopButton) {
                this.stopButton.disabled = false;
            }
            this.updateVoiceStatus('Ready to listen...');

            this.addMessage('system', `🟢 Connected to ${this.currentPersona.name}! Start speaking...`);

        } catch (error) {
            console.error('Failed to start session:', error);
            this.addMessage('system', `❌ Connection failed: ${error.message}`);
            this.updateStatus('Connection failed', 'disconnected');
            if (this.startButton) {
                this.startButton.disabled = false;
            }
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
        if (this.startButton) {
            this.startButton.disabled = false;
        }
        if (this.stopButton) {
            this.stopButton.disabled = true;
        }
        this.updateVoiceStatus('Disconnected');

        const personaName = this.currentPersona ? this.currentPersona.name : 'AI Assistant';
        this.addMessage('system', `🔴 Disconnected from ${personaName}`);
    }

    switchPersona() {
        if (this.isConnected) {
            this.stopSession();
        }
        if (personaManager) {
            personaManager.showPersonaSelection();
        }
    }

    setupAudioLevelMonitoring(stream) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        microphone.connect(analyser);
        analyser.fftSize = 256;

        const updateLevel = () => {
            analyser.getByteFrequencyData(dataArray);
            const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
            const level = Math.min(100, (average / 128) * 100);

            if (this.voiceLevel) {
                this.voiceLevel.style.width = `${level}%`;
                this.voiceLevel.style.background = level > 20 ? '#10B981' : '#6B7280';
            }

            if (this.isConnected) {
                requestAnimationFrame(updateLevel);
            }
        };

        updateLevel();
    }

    updateStatus(text, className) {
        if (this.connectionStatus) {
            this.connectionStatus.textContent = text;
            this.connectionStatus.className = `chatbot-status ${className}`;
        }
    }

    updateVoiceStatus(text) {
        if (this.voiceStatus) {
            this.voiceStatus.textContent = text;
        }
    }

    addMessage(type, content, timestamp = true) {
        if (!this.chatMessages) return;

        const messageDiv = document.createElement('div');
        const timeStr = timestamp ? new Date().toLocaleTimeString() : '';
        const avatar = this.currentPersona ? this.currentPersona.avatar : '🤖';

        if (type === 'bot' || type === 'ai') {
            messageDiv.className = 'message bot-message';
            messageDiv.innerHTML = `
                <div class="message-avatar">${avatar}</div>
                <div class="message-content">
                    <div>${content}</div>
                    ${timestamp ? `<small style="opacity: 0.7; font-size: 0.8em; margin-top: 0.5rem; display: block;">${timeStr}</small>` : ''}
                </div>
            `;
        } else if (type === 'user') {
            messageDiv.className = 'message user-message';
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div>${content}</div>
                    ${timestamp ? `<small style="opacity: 0.7; font-size: 0.8em; margin-top: 0.5rem; display: block;">${timeStr}</small>` : ''}
                </div>
            `;
        } else {
            messageDiv.className = 'message system-message';
            messageDiv.textContent = content;
        }

        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    sendPersonaPrompt() {
        console.log("zzzzzzzzzzzzzzzzzzzzz")
        console.log(this.currentPersona)
        console.log(personaManager)
        console.log("xxxxxxxxxxxxxxxxx")
        if (!this.currentPersona && personaManager) {
            this.currentPersona = personaManager.getCurrentPersona();
        }

        if (!this.currentPersona) {
            console.error('No current persona available!');
            return;
        }

        console.log('Sending persona prompt:', {
            name: this.currentPersona.name,
            voice: this.currentPersona.voice,
            promptLength: this.currentPersona.prompt.length
        });
        console.log("::::::::::::::", this.currentPersona.prompt)

        // Use the official OpenAI Realtime implementation format
        const systemPrompt = {
            type: 'session.update',
            session: {
                type: 'realtime',
                model: this.selectedModel || 'gpt-realtime',
                output_modalities: ['audio'],
                audio: {
                    input: {
                        format: {
                            type: 'audio/pcm',
                            rate: 24000
                        },
                        turn_detection: {
                            type: 'server_vad',
                            threshold: 0.5,
                            prefix_padding_ms: 300,
                            silence_duration_ms: 800
                        }
                    },
                    output: {
                        format: {
                            type: 'audio/pcm',
                            rate: 24000
                        },
                        voice: this.currentPersona.voice || 'alloy'
                    }
                },
                instructions: this.currentPersona.prompt,
            }
        };

        if (this.dc && this.dc.readyState === 'open') {
            this.dc.send(JSON.stringify(systemPrompt));
            console.log('Sent persona prompt for:', this.currentPersona.name);

            // Send an initial greeting to trigger the persona immediately
            setTimeout(() => {
                this.sendInitialGreeting();
            }, 1000);
        } else {
            console.error('Data channel not ready');
        }
    }

    handleDataChannelMessage(event) {
        try {
            const message = JSON.parse(event.data);
            console.log('Received message:', message);

            switch (message.type) {
                case 'conversation.item.created':
                    if (message.item?.content) {
                        const content = message.item.content;
                        if (content[0]?.text) {
                            this.addMessage('ai', content[0].text);
                        }
                    }
                    break;

                case 'response.audio_transcript.done':
                    if (message.transcript) {
                        this.addMessage('ai', message.transcript);
                    }
                    break;

                case 'conversation.item.input_audio_transcription.completed':
                    if (message.transcript) {
                        this.addMessage('user', message.transcript);
                    }
                    break;

                case 'input_audio_buffer.speech_started':
                    this.updateVoiceStatus('🎤 Listening...');
                    break;

                case 'input_audio_buffer.speech_stopped':
                    this.updateVoiceStatus('⏸️ Processing...');
                    break;

                case 'response.audio.delta':
                    this.updateVoiceStatus('🔊 Speaking...');
                    break;

                case 'response.output_audio_transcript.delta':
                    // Handle audio transcript delta - just log for now
                    console.log('Audio transcript delta received');
                    break;

                case 'response.done':
                    this.updateVoiceStatus('Ready to listen...');
                    this.isCreatingResponse = false; // Reset flag when response is done

                    // Track token usage if available
                    if (message.response?.usage) {
                        const usage = message.response.usage;
                        const totalTokens = (usage.input_tokens || 0) + (usage.output_tokens || 0);

                        if (totalTokens > 0) {
                            // Send token usage to backend
                            this.trackTokenUsage(totalTokens);
                        }
                    }
                    break;

                case 'session.updated':
                    console.log('Session updated successfully:', message);
                    this.addMessage('system', '✅ Persona loaded successfully!');
                    break;

                case 'error':
                    console.error('API Error:', message);
                    this.addMessage('system', `❌ Error: ${message.error?.message || 'Unknown error'}`);

                    // If it's a session error, try to reconnect
                    if (message.error?.message?.includes('session')) {
                        console.log('Session error detected, attempting to resend persona prompt...');
                        setTimeout(() => {
                            this.sendPersonaPrompt();
                        }, 2000);
                    }
                    break;

                default:
                    console.log('Unhandled message type:', message.type);
            }
        } catch (error) {
            console.error('Error parsing data channel message:', error);
        }
    }

    sendInitialGreeting() {
        if (!this.dc || this.dc.readyState !== 'open') {
            console.error('Data channel not ready for initial greeting');
            return;
        }

        if (this.isCreatingResponse) {
            console.log('Already creating a response, skipping initial greeting');
            return;
        }

        this.isCreatingResponse = true;
        console.log('Sending initial greeting to trigger persona introduction...');

        const greetingMessage = {
            type: 'conversation.item.create',
            item: {
                type: 'message',
                role: 'user',
                content: [{
                    type: 'input_text',
                    text: 'Hello! Please introduce yourself and tell me how you can help me.'
                }]
            }
        };

        this.dc.send(JSON.stringify(greetingMessage));

        // Trigger response generation after a short delay
        setTimeout(() => {
            if (this.dc && this.dc.readyState === 'open') {
                const responseEvent = {
                    type: 'response.create'
                };
                this.dc.send(JSON.stringify(responseEvent));
                console.log('Triggered AI response generation');
            }
        }, 300);
    }

    sendTextMessage(text) {
        if (!this.dc || this.dc.readyState !== 'open') {
            this.addMessage('system', 'Not connected. Please start a session first.');
            return;
        }

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

        // Trigger response generation
        const responseEvent = {
            type: 'response.create'
        };
        this.dc.send(JSON.stringify(responseEvent));
    }

    async trackTokenUsage(tokensUsed) {
        try {
            const response = await fetch('/api/track-tokens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tokensUsed })
            });

            if (!response.ok) {
                console.error('Failed to track token usage:', await response.text());
            } else {
                const data = await response.json();
                console.log(`✅ Tracked ${tokensUsed} tokens. Total: ${data.tokens_used}/${data.token_limit}`);
            }
        } catch (error) {
            console.error('Error tracking token usage:', error);
        }
    }
}

// Initialize AI Persona Chat when page loads
document.addEventListener('DOMContentLoaded', function() {
    window.aiPersonaChat = new AIPersonaChat();

    // Handle page unload
    window.addEventListener('beforeunload', function() {
        if (window.aiPersonaChat && window.aiPersonaChat.isConnected) {
            window.aiPersonaChat.stopSession();
        }
    });
});


