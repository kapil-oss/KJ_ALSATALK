/**
 * Enterprise Demo Audio Player with Live Transcript
 * Plays AI-to-AI conversations with synchronized transcript display
 */

class EnterpriseDemoAudioPlayer {
    constructor() {
        this.currentDemo = null;
        this.currentSegment = 0;
        this.isPlaying = false;
        this.metadata = null;
        this.audioElement = null;
        this.loadMetadata();
    }

    async loadMetadata() {
        try {
            const response = await fetch('/audio/enterprise-demos/metadata.json');
            this.metadata = await response.json();
            console.log('Enterprise demo audio metadata loaded:', this.metadata);
        } catch (error) {
            console.error('Failed to load enterprise demo audio metadata:', error);
        }
    }

    async playDemo(demoNumber) {
        if (this.isPlaying) {
            this.stopDemo();
        }

        this.currentDemo = demoNumber;
        this.currentSegment = 0;
        this.isPlaying = true;

        const demoMeta = this.metadata?.demos?.[demoNumber];
        if (!demoMeta) {
            console.error('No metadata found for demo:', demoNumber);
            return;
        }

        // Clear existing transcript content (but don't recreate container)
        let transcriptContainer = document.getElementById('demo-transcript-' + demoNumber + '-tabOverview');
        if (!transcriptContainer) {
            transcriptContainer = document.getElementById('demo-transcript-' + demoNumber + '-step');
        }

        if (transcriptContainer) {
            console.log('Clearing transcript container:', transcriptContainer.id);
            transcriptContainer.innerHTML = '';
        }

        // Start playing segments
        await this.playNextSegment();
    }

    prepareTranscriptContainer(demoNumber, targetTab = 'tabOverview') {
        console.log('prepareTranscriptContainer called for demo:', demoNumber, 'in tab:', targetTab);

        // Create or clear the transcript container
        let transcriptContainer = document.getElementById('demo-transcript-' + demoNumber + '-' + targetTab);

        if (!transcriptContainer) {
            console.log('Transcript container not found, creating it');
            // Try to find a suitable place to insert it (in the demo detail view)
            const tabContent = document.getElementById(targetTab);
            console.log(targetTab + ' element:', tabContent);

            if (tabContent) {
                // Create transcript section at the top of overview
                const transcriptSection = document.createElement('div');
                transcriptSection.className = 'mb-6 bg-bg-secondary/80 rounded-2xl p-6 border-2 border-primary/30';
                transcriptSection.innerHTML = `
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-xl font-bold text-primary flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            ${this.metadata.demos[demoNumber].title}
                        </h3>
                        <div class="flex gap-2">
                            <button id="play-demo-audio-${demoNumber}" class="px-4 py-2 bg-primary rounded-lg hover:bg-primary-dark transition flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                                <span>Play Conversation</span>
                            </button>
                            <button id="stop-demo-audio-${demoNumber}" class="px-4 py-2 bg-danger rounded-lg hover:bg-danger/80 transition hidden items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/></svg>
                                <span>Stop</span>
                            </button>
                        </div>
                    </div>
                    <div id="demo-transcript-${demoNumber}-${targetTab}" class="space-y-1 min-h-[200px] max-h-[500px] overflow-y-auto">
                        <p class="text-text-secondary text-center py-8">Click "Play Conversation" to hear the AI-to-AI dialogue</p>
                    </div>
                `;

                tabContent.insertBefore(transcriptSection, tabContent.firstChild);
                transcriptContainer = document.getElementById('demo-transcript-' + demoNumber + '-' + targetTab);

                // Reinitialize Lucide icons
                if (window.lucide) {
                    window.lucide.createIcons();
                }

                // Add event listeners
                document.getElementById('play-demo-audio-' + demoNumber)?.addEventListener('click', () => {
                    this.playDemo(demoNumber);
                });

                document.getElementById('stop-demo-audio-' + demoNumber)?.addEventListener('click', () => {
                    this.stopDemo();
                });
            }
        } else {
            // Clear existing transcript
            transcriptContainer.innerHTML = '';
        }

        return transcriptContainer;
    }

    injectIntoStep(demoNumber, stepIndex) {
        console.log('injectIntoStep called for demo:', demoNumber, 'step:', stepIndex);

        const targetDiv = document.getElementById('audio-player-step-' + demoNumber);
        if (!targetDiv) {
            console.error('Audio player target div not found');
            return;
        }

        const demoMeta = this.metadata?.demos?.[demoNumber];
        if (!demoMeta) {
            console.error('No metadata for demo:', demoNumber);
            return;
        }

        // Create audio player widget
        targetDiv.innerHTML = `
            <div class="bg-bg-secondary/80 rounded-xl p-4 border-2 border-primary/30 mb-4">
                <div class="flex items-center justify-between mb-3">
                    <h4 class="text-lg font-bold text-primary flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        ${demoMeta.title}
                    </h4>
                    <div class="flex gap-2">
                        <button id="play-demo-audio-step-${demoNumber}" class="px-3 py-1.5 bg-primary rounded-lg hover:bg-primary-dark transition flex items-center gap-2 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                            <span>Play</span>
                        </button>
                        <button id="stop-demo-audio-step-${demoNumber}" class="px-3 py-1.5 bg-danger rounded-lg hover:bg-danger/80 transition hidden items-center gap-2 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/></svg>
                            <span>Stop</span>
                        </button>
                    </div>
                </div>
                <div id="demo-transcript-${demoNumber}-step" class="space-y-1 min-h-[150px] max-h-[400px] overflow-y-auto bg-black/10 rounded-lg p-3">
                    <p class="text-text-secondary text-center py-4 text-sm">Click "Play" to hear the conversation with live transcript</p>
                </div>
            </div>
        `;

        // Add event listeners
        document.getElementById('play-demo-audio-step-' + demoNumber)?.addEventListener('click', () => {
            this.currentDemo = demoNumber;
            this.playDemo(demoNumber);
        });

        document.getElementById('stop-demo-audio-step-' + demoNumber)?.addEventListener('click', () => {
            this.stopDemo();
        });
    }

    async playNextSegment() {
        if (!this.isPlaying || !this.currentDemo) return;

        const demoMeta = this.metadata?.demos?.[this.currentDemo];
        if (!demoMeta) return;

        if (this.currentSegment >= demoMeta.segments) {
            // All segments played
            this.stopDemo();
            console.log('Demo conversation complete');
            return;
        }

        const segment = demoMeta.conversation[this.currentSegment];
        const audioPath = `/audio/enterprise-demos/demo${this.currentDemo}-segment-${this.currentSegment}.mp3`;

        // Show play/stop button states
        this.updateButtonStates(true);

        // Add message to transcript with typing animation
        console.log('🔍 Looking for transcript container for demo:', this.currentDemo, 'segment:', this.currentSegment);

        // PRIORITY: Check step container first (more specific), then fall back to tabs
        let transcriptContainer = document.getElementById('demo-transcript-' + this.currentDemo + '-step');
        console.log('  → step container:', transcriptContainer ? 'FOUND' : 'NOT FOUND');

        // Check if step container exists AND is visible (parent accordion is expanded)
        if (transcriptContainer && transcriptContainer.offsetParent !== null) {
            console.log('  → step container is VISIBLE, using it!');
        } else {
            console.log('  → step container not visible, checking tabs...');
            transcriptContainer = null;
        }

        // Fall back to tab containers if step isn't visible
        if (!transcriptContainer) {
            transcriptContainer = document.getElementById('demo-transcript-' + this.currentDemo + '-tabOverview');
            console.log('  → tabOverview container:', transcriptContainer ? 'FOUND' : 'NOT FOUND');
        }

        if (!transcriptContainer) {
            transcriptContainer = document.getElementById('demo-transcript-' + this.currentDemo + '-tabSteps');
            console.log('  → tabSteps container:', transcriptContainer ? 'FOUND' : 'NOT FOUND');
        }

        if (transcriptContainer) {
            console.log('✅ Using transcript container:', transcriptContainer.id);
            const messageDiv = this.createTranscriptMessage(segment);
            console.log('📝 Adding message:', segment.speaker, segment.text.substring(0, 50) + '...');
            transcriptContainer.appendChild(messageDiv);

            // Scroll to bottom
            transcriptContainer.scrollTop = transcriptContainer.scrollHeight;

            // Animate message appearance
            setTimeout(() => {
                messageDiv.classList.add('opacity-100', 'translate-y-0');
            }, 50);
        } else {
            console.error('❌ NO TRANSCRIPT CONTAINER FOUND! Checked:',
                'demo-transcript-' + this.currentDemo + '-tabOverview',
                'demo-transcript-' + this.currentDemo + '-tabSteps',
                'demo-transcript-' + this.currentDemo + '-step'
            );
            console.log('Available elements with "demo-transcript":',
                Array.from(document.querySelectorAll('[id*="demo-transcript"]')).map(el => el.id)
            );
        }

        // Play audio
        if (this.audioElement) {
            this.audioElement.pause();
        }

        this.audioElement = new Audio(audioPath);

        this.audioElement.addEventListener('ended', () => {
            this.currentSegment++;
            // Wait 800ms before playing next segment for natural pacing
            setTimeout(() => {
                this.playNextSegment();
            }, 800);
        });

        this.audioElement.addEventListener('error', (e) => {
            console.error('Error playing audio segment:', audioPath, e);
            this.currentSegment++;
            // Try next segment after error
            setTimeout(() => {
                this.playNextSegment();
            }, 500);
        });

        try {
            await this.audioElement.play();
        } catch (error) {
            console.error('Failed to play audio:', error);
            this.currentSegment++;
            setTimeout(() => {
                this.playNextSegment();
            }, 500);
        }
    }

    createTranscriptMessage(segment) {
        const messageDiv = document.createElement('div');
        const isAI = segment.speaker === 'ai';

        // AI on left, Human on right (like chat apps)
        const alignment = isAI ? 'justify-start' : 'justify-end';
        const bgColor = isAI ? 'bg-success/20 border-success/40' : 'bg-primary/20 border-primary/40';
        const textColor = isAI ? 'text-success' : 'text-primary';
        const label = isAI ? 'AI Agent' : 'Human';

        messageDiv.className = `flex ${alignment} mb-4 opacity-0 translate-y-2 transition-all duration-300`;

        if (isAI) {
            // AI message - left side
            messageDiv.innerHTML = `
                <div class="flex gap-3 max-w-[80%]">
                    <div class="flex-shrink-0">
                        <div class="w-10 h-10 rounded-full ${bgColor} flex items-center justify-center border-2 ${bgColor}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${textColor}"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
                        </div>
                    </div>
                    <div class="flex-1">
                        <div class="font-semibold ${textColor} mb-1 text-sm">${label}</div>
                        <div class="p-3 rounded-lg border-2 ${bgColor} text-text-primary">
                            ${segment.text}
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Human message - right side
            messageDiv.innerHTML = `
                <div class="flex gap-3 max-w-[80%]">
                    <div class="flex-1 text-right">
                        <div class="font-semibold ${textColor} mb-1 text-sm">${label}</div>
                        <div class="p-3 rounded-lg border-2 ${bgColor} text-text-primary text-left">
                            ${segment.text}
                        </div>
                    </div>
                    <div class="flex-shrink-0">
                        <div class="w-10 h-10 rounded-full ${bgColor} flex items-center justify-center border-2 ${bgColor}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${textColor}"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        </div>
                    </div>
                </div>
            `;
        }

        return messageDiv;
    }

    updateButtonStates(playing) {
        if (!this.currentDemo) return;

        // Update Overview tab buttons
        const playBtn = document.getElementById('play-demo-audio-' + this.currentDemo);
        const stopBtn = document.getElementById('stop-demo-audio-' + this.currentDemo);

        if (playBtn && stopBtn) {
            if (playing) {
                playBtn.classList.add('hidden');
                stopBtn.classList.remove('hidden');
                stopBtn.style.display = 'flex';
            } else {
                playBtn.classList.remove('hidden');
                stopBtn.classList.add('hidden');
            }
        }

        // Update Step tab buttons
        const playBtnStep = document.getElementById('play-demo-audio-step-' + this.currentDemo);
        const stopBtnStep = document.getElementById('stop-demo-audio-step-' + this.currentDemo);

        if (playBtnStep && stopBtnStep) {
            if (playing) {
                playBtnStep.classList.add('hidden');
                stopBtnStep.classList.remove('hidden');
                stopBtnStep.style.display = 'flex';
            } else {
                playBtnStep.classList.remove('hidden');
                stopBtnStep.classList.add('hidden');
            }
        }
    }

    stopDemo() {
        this.isPlaying = false;
        if (this.audioElement) {
            this.audioElement.pause();
            this.audioElement = null;
        }
        this.updateButtonStates(false);
        this.currentSegment = 0;
    }

    pauseDemo() {
        this.isPlaying = false;
        if (this.audioElement) {
            this.audioElement.pause();
        }
        this.updateButtonStates(false);
    }
}

// Initialize global enterprise demo audio player immediately
console.log('Initializing enterprise demo audio player...');
let enterpriseDemoAudioPlayer = new EnterpriseDemoAudioPlayer();
window.enterpriseDemoAudioPlayer = enterpriseDemoAudioPlayer;

// Function to inject audio player into a specific demo
window.injectAudioPlayer = function(demoNumber) {
    console.log('injectAudioPlayer called for demo:', demoNumber);

    if (!window.enterpriseDemoAudioPlayer) {
        console.error('enterpriseDemoAudioPlayer not initialized');
        return;
    }

    if (!window.enterpriseDemoAudioPlayer.metadata) {
        console.log('Audio player metadata not loaded yet');
        return;
    }

    const hasAudio = window.enterpriseDemoAudioPlayer.metadata.demos[demoNumber];
    if (!hasAudio) {
        console.log('No audio available for demo', demoNumber);
        return;
    }

    console.log('Preparing transcript container for demo', demoNumber);
    window.enterpriseDemoAudioPlayer.prepareTranscriptContainer(demoNumber);
};
