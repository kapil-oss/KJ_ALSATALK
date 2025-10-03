/**
 * Demo Audio Player for AI-to-AI Conversations
 * Plays pre-generated conversation audio when demo cards are activated
 */

class DemoAudioPlayer {
    constructor() {
        this.currentPersona = null;
        this.currentSegment = 0;
        this.audioSegments = [];
        this.isPlaying = false;
        this.metadata = null;
        this.loadMetadata();
    }

    async loadMetadata() {
        try {
            const response = await fetch('/audio/demos/metadata.json');
            this.metadata = await response.json();
            console.log('Demo audio metadata loaded:', this.metadata);
        } catch (error) {
            console.error('Failed to load demo audio metadata:', error);
        }
    }

    async playDemo(personaId) {
        if (this.isPlaying) {
            this.stopDemo();
        }

        this.currentPersona = personaId;
        this.currentSegment = 0;
        this.isPlaying = true;

        const personaMeta = this.metadata?.conversations?.[personaId];
        if (!personaMeta) {
            console.error('No metadata found for persona:', personaId);
            return;
        }

        // Clear existing chat messages
        const chatContainer = document.querySelector(`#demo-${personaId} .demo-chat`);
        if (chatContainer) {
            chatContainer.innerHTML = '';
        }

        // Play segments sequentially
        await this.playNextSegment();
    }

    async playNextSegment() {
        if (!this.isPlaying || !this.currentPersona) return;

        const personaMeta = this.metadata?.conversations?.[this.currentPersona];
        if (!personaMeta) return;

        if (this.currentSegment >= personaMeta.segments) {
            // All segments played
            this.isPlaying = false;
            console.log('Demo conversation complete');
            return;
        }

        const segment = personaMeta.conversation[this.currentSegment];
        const audioPath = `/audio/demos/${this.currentPersona}-segment-${this.currentSegment}.mp3`;

        // Add message to chat
        this.addMessageToChat(this.currentPersona, segment.text, segment.speaker === 'user');

        // Play audio
        const audio = new Audio(audioPath);

        audio.addEventListener('ended', () => {
            this.currentSegment++;
            // Wait 1 second before playing next segment
            setTimeout(() => {
                this.playNextSegment();
            }, 1000);
        });

        audio.addEventListener('error', (e) => {
            console.error('Error playing audio segment:', audioPath, e);
            this.currentSegment++;
            // Try next segment after error
            setTimeout(() => {
                this.playNextSegment();
            }, 500);
        });

        try {
            await audio.play();
        } catch (error) {
            console.error('Failed to play audio:', error);
            this.currentSegment++;
            setTimeout(() => {
                this.playNextSegment();
            }, 500);
        }
    }

    addMessageToChat(personaId, message, isUser = false) {
        const chatContainer = document.querySelector(`#demo-${personaId} .demo-chat`);
        if (!chatContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user-message' : 'ai-message'}`;

        if (isUser) {
            messageDiv.innerHTML = `
                <div class="message-content">${message}</div>
            `;
        } else {
            const iconMap = {
                'astrologer': 'moon-star',
                'health': 'apple',
                'counselor': 'heart',
                'hospital-desk': 'hospital',
                'salon-desk': 'scissors',
                'general': 'users'
            };

            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <i data-lucide="${iconMap[personaId] || 'bot'}"></i>
                </div>
                <div class="message-content">${message}</div>
            `;
        }

        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Reinitialize Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    stopDemo() {
        this.isPlaying = false;
        this.currentSegment = 0;
    }

    pauseDemo() {
        this.isPlaying = false;
    }

    resumeDemo() {
        if (this.currentPersona && !this.isPlaying) {
            this.isPlaying = true;
            this.playNextSegment();
        }
    }
}

// Initialize global demo audio player
let demoAudioPlayer;
window.addEventListener('DOMContentLoaded', () => {
    demoAudioPlayer = new DemoAudioPlayer();
});

// Enhanced demo chat functions
window.startDemoChat = function(personaId) {
    console.log('Starting demo for:', personaId);

    // Update button states
    const startBtn = document.querySelector(`#demo-${personaId} .start-btn`);
    const stopBtn = document.querySelector(`#demo-${personaId} .stop-btn`);
    const statusText = document.querySelector(`#demo-${personaId} .demo-status span`);
    const voiceStatus = document.querySelector(`#demo-${personaId} .voice-status`);

    if (startBtn) startBtn.disabled = true;
    if (stopBtn) stopBtn.disabled = false;
    if (statusText) statusText.textContent = 'Conversation Active';
    if (voiceStatus) voiceStatus.textContent = 'Playing conversation...';

    // Start audio demo
    if (demoAudioPlayer) {
        demoAudioPlayer.playDemo(personaId);
    }
};

window.stopDemoChat = function() {
    console.log('Stopping demo');

    // Find active demo
    const activeDemos = document.querySelectorAll('.demo-interface');
    activeDemos.forEach(demo => {
        const demoId = demo.id.replace('demo-', '');
        const startBtn = demo.querySelector('.start-btn');
        const stopBtn = demo.querySelector('.stop-btn');
        const statusText = demo.querySelector('.demo-status span');
        const voiceStatus = demo.querySelector('.voice-status');

        if (startBtn) startBtn.disabled = false;
        if (stopBtn) stopBtn.disabled = true;
        if (statusText) statusText.textContent = `${demoId.charAt(0).toUpperCase() + demoId.slice(1)} Active`;
        if (voiceStatus) voiceStatus.textContent = 'Ready to listen...';
    });

    // Stop audio demo
    if (demoAudioPlayer) {
        demoAudioPlayer.stopDemo();
    }
};

// Toggle demo visibility (if needed)
window.toggleDemo = function(personaId) {
    const demoInterface = document.getElementById(`demo-${personaId}`);
    if (demoInterface) {
        demoInterface.classList.toggle('active');
    }
};
