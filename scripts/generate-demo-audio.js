/**
 * Script to generate AI-to-AI conversation audio for demo cards
 * Uses OpenAI's TTS API to create realistic conversations
 */

const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Define the conversations for each persona
const demoConversations = {
    'astrologer': {
        voice1: 'nova',  // User voice
        voice2: 'shimmer', // Astrologer voice
        conversation: [
            { speaker: 'user', text: "Hi, I've been feeling a bit lost lately. Can you help me understand what the stars might be saying?" },
            { speaker: 'ai', text: "Welcome, seeker of light. The cosmos has much to share with you. Tell me, what sign were you born under, and what weighs most heavily on your heart right now?" },
            { speaker: 'user', text: "I'm a Leo, and I've been struggling with some career decisions." },
            { speaker: 'ai', text: "Ah, Leo — the lion, bold and radiant. The stars suggest you're in a transformative phase. Jupiter's current alignment encourages you to trust your inner fire and take courageous steps forward." }
        ]
    },
    'health': {
        voice1: 'nova',
        voice2: 'sage',
        conversation: [
            { speaker: 'user', text: "I want to start eating healthier, but I don't know where to begin." },
            { speaker: 'ai', text: "That's wonderful! Healthy living starts with small, sustainable changes. Tell me, what does a typical day of eating look like for you right now?" },
            { speaker: 'user', text: "Usually skip breakfast, grab fast food for lunch, and have a big dinner." },
            { speaker: 'ai', text: "I appreciate your honesty! Let's start simple: adding a nutritious breakfast can boost your energy and metabolism. How about trying overnight oats or a smoothie? Small steps lead to big changes!" }
        ]
    },
    'counselor': {
        voice1: 'nova',
        voice2: 'sage',
        conversation: [
            { speaker: 'user', text: "I've been feeling really overwhelmed with everything going on." },
            { speaker: 'ai', text: "I hear you, and I'm really glad you're sharing this with me. It sounds like you're carrying a lot right now. What feels most overwhelming to you in this moment?" },
            { speaker: 'user', text: "Just... everything. Work, relationships, trying to keep up with it all." },
            { speaker: 'ai', text: "That makes complete sense. When everything feels heavy at once, it's natural to feel overwhelmed. You don't have to handle it all alone. Let's take this one piece at a time, together." }
        ]
    },
    'hospital-desk': {
        voice1: 'nova',
        voice2: 'sage',
        conversation: [
            { speaker: 'user', text: "Hello, I need to schedule an appointment with a cardiologist." },
            { speaker: 'ai', text: "Good morning! I'd be happy to help you schedule that appointment. Do you have a preferred doctor, or would you like me to recommend one of our cardiologists?" },
            { speaker: 'user', text: "I'd like to see Dr. Martinez if possible." },
            { speaker: 'ai', text: "Perfect! Dr. Martinez has availability next Tuesday at 2 PM or Thursday at 10 AM. Which time works better for you? I'll also need your insurance information to confirm the booking." }
        ]
    },
    'salon-desk': {
        voice1: 'nova',
        voice2: 'shimmer',
        conversation: [
            { speaker: 'user', text: "Hi! I'm looking to get a haircut and maybe some highlights." },
            { speaker: 'ai', text: "Welcome to our salon! How exciting! We'd love to give you a fresh new look. Do you have a preferred stylist, or would you like me to match you with someone who specializes in color?" },
            { speaker: 'user', text: "I haven't been here before, so I'd appreciate a recommendation." },
            { speaker: 'ai', text: "Perfect! I recommend Sarah — she's amazing with highlights and cuts. She has an opening this Saturday at 11 AM. The full service would take about 2 hours. Would that work for you?" }
        ]
    },
    'general': {
        voice1: 'nova',
        voice2: 'onyx',
        conversation: [
            { speaker: 'user', text: "I'm thinking about starting my own business, but I'm not sure where to begin." },
            { speaker: 'ai', text: "That's an exciting journey you're considering! Starting a business is both challenging and rewarding. What type of business are you thinking about, and what's driving this decision for you?" },
            { speaker: 'user', text: "I want to open a coffee shop. I love coffee culture and community spaces." },
            { speaker: 'ai', text: "What a wonderful vision! Coffee shops can be incredible community hubs. Have you thought about location, your unique selling point, or your target customers? These foundations will help shape your business plan." }
        ]
    }
};

async function generateConversationAudio(personaId, config) {
    console.log(`\n🎙️ Generating audio for ${personaId}...`);

    const audioDir = path.join(__dirname, '..', 'public', 'audio', 'demos');
    if (!fs.existsSync(audioDir)) {
        fs.mkdirSync(audioDir, { recursive: true });
    }

    const audioSegments = [];

    for (let i = 0; i < config.conversation.length; i++) {
        const segment = config.conversation[i];
        const voice = segment.speaker === 'user' ? config.voice1 : config.voice2;

        console.log(`  → Generating segment ${i + 1}/${config.conversation.length} (${segment.speaker})...`);

        try {
            const mp3 = await openai.audio.speech.create({
                model: 'tts-1',
                voice: voice,
                input: segment.text,
                speed: 1.0
            });

            const buffer = Buffer.from(await mp3.arrayBuffer());
            const segmentPath = path.join(audioDir, `${personaId}-segment-${i}.mp3`);
            fs.writeFileSync(segmentPath, buffer);
            audioSegments.push(segmentPath);

            console.log(`    ✓ Saved: ${segmentPath}`);
        } catch (error) {
            console.error(`    ✗ Error generating segment ${i}:`, error.message);
        }
    }

    console.log(`  ✓ Generated ${audioSegments.length} audio segments for ${personaId}`);
    return audioSegments;
}

async function generateAllDemoAudio() {
    console.log('🎵 Starting AI-to-AI conversation audio generation...\n');
    console.log('This will create realistic demo conversations using OpenAI TTS\n');

    if (!process.env.OPENAI_API_KEY) {
        console.error('❌ Error: OPENAI_API_KEY not found in environment variables');
        console.error('Please add your OpenAI API key to the .env file');
        process.exit(1);
    }

    const results = {};

    for (const [personaId, config] of Object.entries(demoConversations)) {
        try {
            const segments = await generateConversationAudio(personaId, config);
            results[personaId] = {
                success: true,
                segments: segments.length
            };
        } catch (error) {
            console.error(`❌ Failed to generate audio for ${personaId}:`, error.message);
            results[personaId] = {
                success: false,
                error: error.message
            };
        }
    }

    // Generate metadata file
    const metadataPath = path.join(__dirname, '..', 'public', 'audio', 'demos', 'metadata.json');
    const metadata = {
        generated: new Date().toISOString(),
        conversations: {}
    };

    for (const [personaId, config] of Object.entries(demoConversations)) {
        metadata.conversations[personaId] = {
            segments: config.conversation.length,
            voices: {
                user: config.voice1,
                ai: config.voice2
            },
            conversation: config.conversation
        };
    }

    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    console.log(`\n📝 Metadata saved to: ${metadataPath}`);

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 GENERATION SUMMARY');
    console.log('='.repeat(60));

    for (const [personaId, result] of Object.entries(results)) {
        const status = result.success ? '✅' : '❌';
        const detail = result.success
            ? `${result.segments} segments`
            : result.error;
        console.log(`${status} ${personaId}: ${detail}`);
    }

    console.log('\n✨ Audio generation complete!\n');
    console.log('Next steps:');
    console.log('1. Update the demo cards in index.html to play these audio files');
    console.log('2. Add audio player controls to the demo interface');
    console.log('3. Test the audio playback in the browser\n');
}

// Run the script
if (require.main === module) {
    generateAllDemoAudio()
        .then(() => process.exit(0))
        .catch(error => {
            console.error('Fatal error:', error);
            process.exit(1);
        });
}

module.exports = { generateAllDemoAudio, demoConversations };
