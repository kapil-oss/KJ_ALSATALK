// Application settings model for storing configurable options
const { query } = require('../database/db');

const REALTIME_MODEL_KEY = 'openai_realtime_model';
const DEFAULT_REALTIME_MODEL = 'gpt-realtime';

class Settings {
    static async getSetting(key) {
        const sql = 'SELECT key, value, updated_at FROM app_settings WHERE key = $1';
        const result = await query(sql, [key]);
        return result.rows[0] || null;
    }

    static async upsertSetting(key, value) {
        const sql = `
            INSERT INTO app_settings (key, value)
            VALUES ($1, $2)
            ON CONFLICT (key) DO UPDATE
            SET value = EXCLUDED.value,
                updated_at = CURRENT_TIMESTAMP
            RETURNING key, value, updated_at
        `;
        const result = await query(sql, [key, value]);
        return result.rows[0];
    }

    static async getOpenAIRealtimeModel() {
        const setting = await this.getSetting(REALTIME_MODEL_KEY);
        if (!setting) {
            return {
                key: REALTIME_MODEL_KEY,
                value: DEFAULT_REALTIME_MODEL,
                updated_at: null,
                isDefault: true
            };
        }

        return {
            key: REALTIME_MODEL_KEY,
            value: setting.value || DEFAULT_REALTIME_MODEL,
            updated_at: setting.updated_at,
            isDefault: false
        };
    }

    static async setOpenAIRealtimeModel(modelName) {
        if (!modelName || typeof modelName !== 'string' || !modelName.trim()) {
            throw new Error('Model name cannot be empty');
        }

        const cleanValue = modelName.trim();
        const result = await this.upsertSetting(REALTIME_MODEL_KEY, cleanValue);
        return {
            key: result.key,
            value: result.value,
            updated_at: result.updated_at,
            isDefault: false
        };
    }

    static getRealtimeModelDefault() {
        return DEFAULT_REALTIME_MODEL;
    }
}

Settings.REALTIME_MODEL_KEY = REALTIME_MODEL_KEY;
Settings.DEFAULT_REALTIME_MODEL = DEFAULT_REALTIME_MODEL;

module.exports = Settings;
