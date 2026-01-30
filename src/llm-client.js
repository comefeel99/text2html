/**
 * LLM Client Module
 * OpenAI 및 Custom LLM 서버 연결을 위한 클라이언트
 */

import 'dotenv/config';
import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';

// LLM Provider 설정
const LLM_PROVIDER = process.env.LLM || 'openai';
const isCustomLLM = LLM_PROVIDER === 'custom';

// Custom LLM 설정
const CUSTOM_LLM_URL = process.env.CUSTOM_LLM_URL;
const CUSTOM_LLM_API_KEY = process.env.CUSTOM_LLM_API_KEY || 'null';
const CUSTOM_MODEL = process.env.CUSTOM_MODEL;

// 환경변수 검증
function validateEnv() {
    if (isCustomLLM) {
        if (!CUSTOM_LLM_URL) {
            console.error('❌ 오류: LLM=custom 설정 시 CUSTOM_LLM_URL이 필요합니다.');
            process.exit(1);
        }
        if (!CUSTOM_MODEL) {
            console.error('❌ 오류: LLM=custom 설정 시 CUSTOM_MODEL이 필요합니다.');
            process.exit(1);
        }
    }
}

validateEnv();

// 모델 선택
const MODEL = isCustomLLM ? CUSTOM_MODEL : (process.env.OPENAI_MODEL || 'gpt-4');

// OpenAI 호환 클라이언트 생성
const openai = new OpenAI({
    baseURL: isCustomLLM ? CUSTOM_LLM_URL : undefined,
    apiKey: isCustomLLM ? CUSTOM_LLM_API_KEY : process.env.OPENAI_API_KEY
});

/**
 * LLM 설정 정보 반환
 */
export function getLLMConfig() {
    return {
        provider: isCustomLLM ? 'custom' : 'openai',
        model: MODEL,
        url: isCustomLLM ? CUSTOM_LLM_URL : 'api.openai.com',
        isCustomLLM
    };
}

/**
 * LLM API 호출
 */
export async function callLLM(systemPrompt, userMessage, options = {}) {
    const { phaseName = 'unknown', outputDir = '.' } = options;
    const startTime = Date.now();
    console.log('  → API 호출 중...');

    const response = await openai.chat.completions.create({
        model: MODEL,
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage }
        ],
        max_completion_tokens: 50000,
        reasoning_effort: 'high'
    });

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    const usage = response.usage;
    const content = response.choices[0].message.content;

    console.log(`  → 입력 토큰: ${usage?.prompt_tokens?.toLocaleString() || 'N/A'}`);
    console.log(`  → 출력 토큰: ${usage?.completion_tokens?.toLocaleString() || 'N/A'}`);
    console.log(`  → 처리 시간: ${elapsed}초`);

    // 로그 파일에 기록
    const logEntry = {
        timestamp: new Date().toISOString(),
        phase: phaseName,
        model: MODEL,
        provider: isCustomLLM ? 'custom' : 'openai',
        url: isCustomLLM ? CUSTOM_LLM_URL : 'api.openai.com',
        input_tokens: usage?.prompt_tokens || 0,
        output_tokens: usage?.completion_tokens || 0,
        elapsed_seconds: parseFloat(elapsed),
        input_preview: userMessage.substring(0, 200) + '...',
        output_preview: content?.substring(0, 200) + '...'
    };

    const logPath = path.join(outputDir, 'llm_calls.log');
    await fs.appendFile(logPath, JSON.stringify(logEntry) + '\n', 'utf-8');

    return content;
}

/**
 * 간단한 API 테스트
 */
export async function testConnection() {
    console.log('API 호출 중...');

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
        return true;
    } catch (error) {
        console.log('\n❌ 테스트 실패!');
        console.log(`에러: ${error.message}`);
        return false;
    }
}
