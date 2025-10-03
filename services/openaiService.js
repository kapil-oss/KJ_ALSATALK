// Helpers for interacting with OpenAI APIs from the server layer
// Updated list of all OpenAI Realtime models (as of 2025)
const DEFAULT_REALTIME_MODELS = [
    'gpt-4o-realtime-preview',
    'gpt-4o-realtime-preview-2024-10-01',
    'gpt-4o-realtime-preview-2024-12-17',
    'gpt-4o-mini-realtime-preview',
    'gpt-4o-mini-realtime-preview-2024-12-17'
];

async function fetchRealtimeModelsFromOpenAI() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return {
            models: DEFAULT_REALTIME_MODELS,
            source: 'fallback',
            error: 'OpenAI API key not configured'
        };
    }

    if (typeof fetch !== 'function') {
        return {
            models: DEFAULT_REALTIME_MODELS,
            source: 'fallback',
            error: 'Fetch API is unavailable in this runtime'
        };
    }

    try {
        const response = await fetch('https://api.openai.com/v1/models', {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`OpenAI API responded with ${response.status}`);
        }

        const payload = await response.json();
        const realtimeModels = (payload.data || [])
            .map(item => item.id)
            .filter(id => typeof id === 'string' && id.toLowerCase().includes('realtime'));

        const uniqueModels = [...new Set(realtimeModels)].sort();

        if (uniqueModels.length === 0) {
            return {
                models: DEFAULT_REALTIME_MODELS,
                source: 'fallback',
                warning: 'No realtime models returned by API, using defaults'
            };
        }

        return {
            models: uniqueModels,
            source: 'openai'
        };
    } catch (error) {
        console.error('Failed to fetch realtime models from OpenAI:', error.message);
        return {
            models: DEFAULT_REALTIME_MODELS,
            source: 'fallback',
            error: error.message
        };
    }
}

module.exports = {
    fetchRealtimeModelsFromOpenAI,
    DEFAULT_REALTIME_MODELS
};
