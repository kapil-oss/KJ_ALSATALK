/**
 * Script to generate AI-to-AI conversation audio for Enterprise Demo Suite
 * Uses OpenAI's TTS API to create realistic enterprise conversations
 */

const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Extract conversations from demo data based on the HTML transcripts
const enterpriseDemoConversations = {
    1: {
        // Cross-Department Workflow - CEO Approval Call
        title: 'Executive Approval Call',
        voice_ai: 'shimmer',
        voice_human: 'onyx',
        conversation: [
            { speaker: 'ai', text: "Hi John, this is AlsaTalk calling on behalf of Sarah Chen. I need your executive approval for the Acme Manufacturing contract - $475K annual, 3-year term." },
            { speaker: 'human', text: "Acme Manufacturing? Give me the quick summary." },
            { speaker: 'ai', text: "500-employee manufacturer, 4A1 credit rating, excellent payment history. Finance approved it automatically. Legal cleared the contract. It's a strategic account with 320% projected ROI." },
            { speaker: 'human', text: "Any red flags?" },
            { speaker: 'ai', text: "None. They requested EU data residency which we added. All compliance checks passed. They're ready to sign today." },
            { speaker: 'human', text: "Sounds good. Approved." }
        ]
    },
    2: {
        // Inventory Crisis - Emergency Call
        title: 'Production Emergency Call',
        voice_ai: 'shimmer',
        voice_human: 'onyx',
        conversation: [
            { speaker: 'human', text: "We need part number A8472 immediately! Our assembly line is down and we ordered 500 units but your system shows out of stock! We're losing $2,500 per hour. Can you help?" },
            { speaker: 'ai', text: "I understand the urgency, Tom. Let me check our 12 warehouses right now. Give me just one moment." },
            { speaker: 'ai', text: "Great news! I found your parts. We have 320 units in Dallas and 180 in Toronto - that's your full 500 units. I'm upgrading you to next-day air shipping at no charge. Your parts ship today and arrive tomorrow morning at 10 AM." },
            { speaker: 'human', text: "That's perfect! Thank you so much. You just saved us." },
            { speaker: 'ai', text: "You're very welcome. I'm sending tracking numbers to your email right now. Your production line will be back up tomorrow!" }
        ]
    },
    4: {
        // Churn Prevention - CSM Intervention
        title: 'Customer Success Intervention',
        voice_ai: 'sage',
        voice_human: 'nova',
        conversation: [
            { speaker: 'ai', text: "Hi Michael, I'm Jessica from AlsaTalk. I noticed some changes in how TechFlow is using our platform and wanted to make sure we're still delivering value. I see you joined as CTO recently - congrats! I'd love to understand your priorities and ensure our platform aligns with your goals." },
            { speaker: 'human', text: "Thanks for reaching out. To be honest, we've been struggling. Our previous CTO set this up, and I'm not fully up to speed. We've also had some integration issues causing data sync problems." },
            { speaker: 'ai', text: "I completely understand. Let me help. I've scheduled dedicated onboarding sessions for you and your team, and our engineering team is already working on fixing the integration issues. We value your partnership and want to make sure you're successful." },
            { speaker: 'human', text: "That would be great. We were actually considering switching vendors, but if you can help us get back on track, I'd prefer to stick with AlsaTalk." },
            { speaker: 'ai', text: "Wonderful! I'm also offering you a 20% renewal discount, 3 months of free usage credits, and a dedicated Technical Account Manager. We're committed to your success." }
        ]
    },
    5: {
        // Sales Lead Follow-Up
        title: 'Lead Follow-Up Call',
        voice_ai: 'shimmer',
        voice_human: 'nova',
        conversation: [
            { speaker: 'ai', text: "Hi Jessica, this is Alex from AlsaTalk. I just sent you an email about your demo request. Do you have a quick minute?" },
            { speaker: 'human', text: "Oh hi! Yes, I just filled out your form. I'm interested in your data visualization platform." },
            { speaker: 'ai', text: "Great! I'd love to show you how AlsaTalk helps companies like Snowflake and Databricks build real-time dashboards that handle massive scale. Are you available for a 30-minute demo this Friday at 10 AM Pacific?" },
            { speaker: 'human', text: "Friday at 10 works perfect. Can you send me a calendar invite?" },
            { speaker: 'ai', text: "Absolutely! I'll send that right now to jessica.park@dataflow-analytics.com. You'll receive a Zoom link and a brief agenda. Looking forward to Friday!" }
        ]
    },
    6: {
        // Customer Support - Delayed Shipment
        title: 'Support Call - Delayed Order',
        voice_ai: 'sage',
        voice_human: 'onyx',
        conversation: [
            { speaker: 'human', text: "I ordered part number XYZ-1234 two weeks ago and it hasn't arrived yet! Our assembly line is down!" },
            { speaker: 'ai', text: "I sincerely apologize for the delay, Michael. I can see your order shipped on time but got delayed in Memphis due to Hurricane Francine. The good news is, it's moving again and will arrive tomorrow by 5 PM." },
            { speaker: 'ai', text: "I know this caused inconvenience, so I'd like to offer you a $500 credit on your account as a goodwill gesture. You'll also receive an email with the tracking link so you can monitor it in real-time. Does that work for you?" },
            { speaker: 'human', text: "Oh, okay. That makes sense. The credit is appreciated. Thank you!" }
        ]
    },
    7: {
        // Client Onboarding - Welcome Call
        title: 'Welcome Call - New Client',
        voice_ai: 'shimmer',
        voice_human: 'onyx',
        conversation: [
            { speaker: 'ai', text: "Hi David, this is Alex from AlsaTalk. Congrats on becoming a customer! I wanted to personally welcome you and confirm that your 1,200 user licenses are now active at globaltech.alsatalk.com." },
            { speaker: 'human', text: "Great! We're excited to get started." },
            { speaker: 'ai', text: "Perfect! I've scheduled your kickoff meeting for October 15 at 10 AM. You'll meet Maria, your dedicated Customer Success Manager. She'll walk you through the implementation plan. You should have received a calendar invite and login instructions via email." },
            { speaker: 'human', text: "Got it. Thanks for the call!" }
        ]
    },
    8: {
        // Order Status Update
        title: 'Order Status Update Call',
        voice_ai: 'shimmer',
        voice_human: 'nova',
        conversation: [
            { speaker: 'ai', text: "Hi Lisa, this is Alex from AlsaTalk. I'm calling on behalf of Jennifer Smith to give you an update on your order." },
            { speaker: 'human', text: "Oh great! I was actually wondering about that." },
            { speaker: 'ai', text: "Good news! Your order for 50 Enterprise licenses is out for delivery right now. FedEx shows it should arrive at your office today by 3:00 PM. The tracking number is FX-9284-7364-8473." },
            { speaker: 'human', text: "Perfect! Thanks for the heads up." },
            { speaker: 'ai', text: "You're welcome! I'll send you an email with the tracking link so you can monitor it in real-time. If you have any questions, feel free to reach out to Jennifer. Have a great day!" }
        ]
    }
};

async function generateDemoConversationAudio(demoNum, config) {
    console.log(`\n🎙️ Generating audio for Demo ${demoNum}: ${config.title}...`);

    const audioDir = path.join(__dirname, '..', 'public', 'audio', 'enterprise-demos');
    if (!fs.existsSync(audioDir)) {
        fs.mkdirSync(audioDir, { recursive: true });
    }

    const audioSegments = [];

    for (let i = 0; i < config.conversation.length; i++) {
        const segment = config.conversation[i];
        const voice = segment.speaker === 'ai' ? config.voice_ai : config.voice_human;

        console.log(`  → Generating segment ${i + 1}/${config.conversation.length} (${segment.speaker})...`);

        try {
            const mp3 = await openai.audio.speech.create({
                model: 'tts-1-hd', // Use HD for better quality
                voice: voice,
                input: segment.text,
                speed: 1.0
            });

            const buffer = Buffer.from(await mp3.arrayBuffer());
            const segmentPath = path.join(audioDir, `demo${demoNum}-segment-${i}.mp3`);
            fs.writeFileSync(segmentPath, buffer);
            audioSegments.push(segmentPath);

            console.log(`    ✓ Saved: demo${demoNum}-segment-${i}.mp3`);
        } catch (error) {
            console.error(`    ✗ Error generating segment ${i}:`, error.message);
        }
    }

    console.log(`  ✓ Generated ${audioSegments.length} audio segments for Demo ${demoNum}`);
    return audioSegments;
}

async function generateAllEnterpriseDemoAudio() {
    console.log('🎵 Starting Enterprise Demo Audio Generation...\n');
    console.log('Creating realistic AI-to-AI conversations for enterprise use cases\n');

    if (!process.env.OPENAI_API_KEY) {
        console.error('❌ Error: OPENAI_API_KEY not found in environment variables');
        console.error('Please add your OpenAI API key to the .env file');
        process.exit(1);
    }

    const results = {};

    for (const [demoNum, config] of Object.entries(enterpriseDemoConversations)) {
        try {
            const segments = await generateDemoConversationAudio(parseInt(demoNum), config);
            results[demoNum] = {
                success: true,
                segments: segments.length
            };
        } catch (error) {
            console.error(`❌ Failed to generate audio for Demo ${demoNum}:`, error.message);
            results[demoNum] = {
                success: false,
                error: error.message
            };
        }
    }

    // Generate metadata file
    const metadataPath = path.join(__dirname, '..', 'public', 'audio', 'enterprise-demos', 'metadata.json');
    const metadata = {
        generated: new Date().toISOString(),
        demos: {}
    };

    for (const [demoNum, config] of Object.entries(enterpriseDemoConversations)) {
        metadata.demos[demoNum] = {
            title: config.title,
            segments: config.conversation.length,
            voices: {
                ai: config.voice_ai,
                human: config.voice_human
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

    for (const [demoNum, result] of Object.entries(results)) {
        const status = result.success ? '✅' : '❌';
        const detail = result.success
            ? `${result.segments} segments`
            : result.error;
        const title = enterpriseDemoConversations[demoNum].title;
        console.log(`${status} Demo ${demoNum} (${title}): ${detail}`);
    }

    console.log('\n✨ Enterprise demo audio generation complete!\n');
    console.log('Next steps:');
    console.log('1. Add audio player to demo-suite-premium.html');
    console.log('2. Implement live transcript display as audio plays');
    console.log('3. Test audio playback in browser\n');
}

// Run the script
if (require.main === module) {
    generateAllEnterpriseDemoAudio()
        .then(() => process.exit(0))
        .catch(error => {
            console.error('Fatal error:', error);
            process.exit(1);
        });
}

module.exports = { generateAllEnterpriseDemoAudio, enterpriseDemoConversations };
