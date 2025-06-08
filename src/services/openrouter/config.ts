export const OPEN_ROUTER_CONFIG = {
    API_URL: 'https://openrouter.ai/api/v1/chat/completions',
    MODEL_NAME: 'openai/gpt-3.5-turbo-0125',
    TOKEN: process.env.OPEN_ROUTER_API_KEY || '',
    HTTP_REFERER: process.env.API_URL || 'empty',
    X_TITLE: process.env.API_TITLE || 'Trainary Backend',
}
