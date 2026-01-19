import 'dotenv/config';
import OpenAI from 'openai';

// LLM Provider 설정
const LLM_PROVIDER = process.env.LLM || 'openai';
const isCustomLLM = LLM_PROVIDER === 'custom';
const CUSTOM_LLM_URL = process.env.CUSTOM_LLM_URL;
const CUSTOM_LLM_API_KEY = process.env.CUSTOM_LLM_API_KEY || 'null';
const CUSTOM_MODEL = process.env.CUSTOM_MODEL;
const MODEL = isCustomLLM ? CUSTOM_MODEL : (process.env.OPENAI_MODEL || 'gpt-4');

console.log('='.repeat(40));
console.log('LLM API 연결 테스트');
console.log('='.repeat(40));
console.log(`[Provider] ${isCustomLLM ? 'Custom LLM' : 'OpenAI'}`);
if (isCustomLLM) {
    console.log(`[URL] ${CUSTOM_LLM_URL}`);
}
console.log(`[Model] ${MODEL}`);

const openai = new OpenAI({
    baseURL: isCustomLLM ? CUSTOM_LLM_URL : undefined,
    apiKey: isCustomLLM ? CUSTOM_LLM_API_KEY : process.env.OPENAI_API_KEY
});

async function testAPI() {
    console.log('\nAPI 호출 중...');

    try {
        const response = await openai.chat.completions.create({
            model: MODEL,
            messages: [
                { role: 'user', content: '안녕하세요. 간단히 "테스트 성공"이라고 답해주세요.' }
            ]
        });

        console.log('\n✅ 테스트 성공!');
        console.log(`응답: ${response.choices[0].message.content}`);
        console.log(`사용 토큰: ${response.usage?.total_tokens || 'N/A'}`);
    } catch (error) {
        console.log('\n❌ 테스트 실패!');
        console.log(`에러: ${error.message}`);
    }
}

testAPI();
