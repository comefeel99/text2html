/**
 * LLM API 연결 테스트
 */

import { getLLMConfig, testConnection } from './llm-client.js';

console.log('='.repeat(40));
console.log('LLM API 연결 테스트');
console.log('='.repeat(40));

const config = getLLMConfig();
console.log(`[Provider] ${config.isCustomLLM ? 'Custom LLM' : 'OpenAI'}`);
if (config.isCustomLLM) {
    console.log(`[URL] ${config.url}`);
}
console.log(`[Model] ${config.model}`);
console.log('');

testConnection();
