import 'dotenv/config';
import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CLI arguments parsing
const args = process.argv.slice(2);
const skipResearch = args.includes('--skip-research');
const userRequestArg = args.find(arg => !arg.startsWith('--'));

// --phase 옵션: 특정 단계만 실행
const phaseArg = args.find(arg => arg.startsWith('--phase='));
const targetPhase = phaseArg ? phaseArg.split('=')[1] : null;

// --prompt 옵션: 커스텀 프롬프트 파일 경로
const promptArg = args.find(arg => arg.startsWith('--prompt='));
const customPromptPath = promptArg ? promptArg.split('=')[1] : null;

// --input 옵션: 입력 파일 경로 (skip-research 시 사용)
const inputArg = args.find(arg => arg.startsWith('--input='));
const customInputPath = inputArg ? inputArg.split('=')[1] : null;

// --output-dir 옵션: 출력 폴더 경로
const outputDirArg = args.find(arg => arg.startsWith('--output-dir='));
const customOutputDir = outputDirArg ? outputDirArg.split('=')[1] : null;

// Configuration
const SKILL_DIR = path.join(__dirname, '.agent/skills/html2slidehtml');
const OUTPUT_DIR = customOutputDir
    ? path.join(__dirname, customOutputDir)
    : path.join(__dirname, 'output');

// LLM Provider 설정
const LLM_PROVIDER = process.env.LLM || 'openai';
const isCustomLLM = LLM_PROVIDER === 'custom';

// Custom LLM 설정
const CUSTOM_LLM_URL = process.env.CUSTOM_LLM_URL;
const CUSTOM_LLM_API_KEY = process.env.CUSTOM_LLM_API_KEY || 'null';
const CUSTOM_MODEL = process.env.CUSTOM_MODEL;

// 환경변수 검증
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

// 모델 선택
const MODEL = isCustomLLM ? CUSTOM_MODEL : (process.env.OPENAI_MODEL || 'gpt-4');

// OpenAI 호환 클라이언트 생성
const openai = new OpenAI({
    baseURL: isCustomLLM ? CUSTOM_LLM_URL : undefined,
    apiKey: isCustomLLM ? CUSTOM_LLM_API_KEY : process.env.OPENAI_API_KEY
});

// Phase definitions
const PHASES = [
    {
        name: 'research',
        promptFile: 'resources/1_research.md',
        outputFile: '1_research_result.md',
        description: 'Research Phase - 자료 수집'
    },
    {
        name: 'report',
        promptFile: 'prompts/2_report.md',
        outputFile: '2_report_result.md',
        description: 'Report Phase - 보고서 구조화'
    },
    {
        name: 'html_gen',
        promptFile: 'resources/3_html_gen.md',
        outputFile: '3_html_result.html',
        description: 'HTML Generation Phase - 슬라이드 생성'
    },

];

/**
 * Load prompt file content
 */
async function loadPrompt(filename, useCustomPrompt = false) {
    // 커스텀 프롬프트 사용 시 프로젝트 루트 기준 경로
    if (useCustomPrompt && customPromptPath) {
        const customFilePath = path.join(__dirname, customPromptPath);
        console.log(`  → 커스텀 프롬프트 사용: ${customPromptPath}`);
        return await fs.readFile(customFilePath, 'utf-8');
    }
    const filepath = path.join(SKILL_DIR, filename);
    try {
        // Try loading from SKILL_DIR
        return await fs.readFile(filepath, 'utf-8');
    } catch (e) {
        // If not found in SKILL_DIR, try loading from project root (e.g. prompts/)
        if (filename.startsWith('prompts/')) {
            const localPath = path.join(__dirname, filename);
            console.log(`  → 프로젝트 로컬 프롬프트 사용: ${filename}`);
            return await fs.readFile(localPath, 'utf-8');
        }
        throw e;
    }
}

/**
 * Call OpenAI API with the given prompt
 */
async function callLLM(systemPrompt, userMessage, phaseName = 'unknown') {
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

    const logPath = path.join(OUTPUT_DIR, 'llm_calls.log');
    await fs.appendFile(logPath, JSON.stringify(logEntry) + '\\n', 'utf-8');

    return content;
}

/**
 * Validate LLM response
 */
function validateResponse(content, phaseName) {
    if (!content || content.trim() === '') {
        throw new Error(`빈 응답 수신`);
    }
    if (content.length < 50) {
        console.warn(`  ⚠️ 경고: 응답이 너무 짧음 (${content.length}자)`);
    }
    return true;
}

/**
 * Save result to file
 */
async function saveResult(filename, content) {
    const filepath = path.join(OUTPUT_DIR, filename);
    await fs.writeFile(filepath, content, 'utf-8');
    console.log(`  → 저장됨: ${filepath}`);
}

/**
 * Run the 4-phase workflow
 */
async function runWorkflow(userRequest) {
    console.log('\n' + '='.repeat(60));
    console.log('html2slidehtml Test Runner');
    console.log('='.repeat(60));

    // LLM 설정 정보 출력
    if (isCustomLLM) {
        console.log(`[LLM] Custom: ${CUSTOM_LLM_URL}`);
    } else {
        console.log('[LLM] OpenAI');
    }
    console.log(`[Model] ${MODEL}`);
    console.log(`\n입력: "${userRequest}"\n`);

    // Ensure output directory exists
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    let previousResult = userRequest;
    const results = {};

    for (const phase of PHASES) {
        console.log(`\n[${phase.description}]`);
        console.log('-'.repeat(40));

        // Skip research phase if --skip-research flag is set
        if (phase.name === 'research' && skipResearch) {
            console.log('  → research 단계 스킵 (기존 결과 파일 사용)');
            const inputFilePath = customInputPath
                ? path.join(__dirname, customInputPath)
                : path.join(OUTPUT_DIR, '1_research_result.md');
            const existingResult = await fs.readFile(inputFilePath, 'utf-8');
            console.log(`  → 입력 파일: ${inputFilePath}`);
            results[phase.name] = existingResult;
            previousResult = existingResult;
            console.log(`  ✓ ${phase.name} 스킵 완료`);
            continue;
        }

        // --phase 옵션: 특정 단계만 실행
        if (targetPhase && phase.name !== targetPhase) {
            console.log(`  → ${phase.name} 단계 스킵 (--phase=${targetPhase} 옵션)`);
            const existingFile = path.join(OUTPUT_DIR, phase.outputFile);
            try {
                const existingResult = await fs.readFile(existingFile, 'utf-8');
                results[phase.name] = existingResult;
                previousResult = existingResult;
                console.log(`  ✓ 기존 결과 로드: ${phase.outputFile}`);
            } catch {
                console.log(`  ⚠️ 기존 결과 파일 없음, 빈 값으로 진행`);
            }
            continue;
        }

        // Load prompt template (html_gen 단계에서 커스텀 프롬프트 지원)
        const useCustomPrompt = phase.name === 'html_gen' && customPromptPath;
        const promptTemplate = await loadPrompt(phase.promptFile, useCustomPrompt);

        // Build the prompt with context
        let systemPrompt = promptTemplate;
        let userMessage = '';

        if (phase.name === 'research') {
            userMessage = userRequest;
        } else if (phase.name === 'report') {
            systemPrompt = promptTemplate
                .replace('{{user_request}}', userRequest)
                .replace('{{research_result}}', previousResult);
            userMessage = `사용자 요청: ${userRequest}\n\n연구 결과:\n${previousResult}`;
        } else if (phase.name === 'html_gen') {
            systemPrompt = promptTemplate
                .replace('{{report_content}}', previousResult);
            userMessage = `다음 보고서를 HTML 슬라이드로 변환해주세요:\n\n${previousResult}`;
        }

        // Call LLM with error handling
        try {
            const result = await callLLM(systemPrompt, userMessage, phase.name);

            // Validate response
            validateResponse(result, phase.name);

            // Save result
            await saveResult(phase.outputFile, result);

            // Store for next phase
            results[phase.name] = result;
            previousResult = result;

            console.log(`  ✓ ${phase.name} 완료`);
        } catch (error) {
            console.error(`\n❌ ${phase.name} 단계 실패: ${error.message}`);
            console.error('워크플로우를 중단합니다.');
            process.exit(1);
        }

    }

    console.log('\n' + '='.repeat(60));
    console.log('✅ 워크플로우 완료!');
    console.log(`최종 결과: ${path.join(OUTPUT_DIR, '3_html_result.html')}`);
    console.log('='.repeat(60) + '\n');

    return results;
}
// --help 옵션
if (args.includes('--help')) {
    console.log(`
사용법: node test_runner.js [옵션] [요청]

옵션:
  --skip-research       research 단계 스킵 (기존 결과 사용)
  --phase=<name>        특정 단계만 실행 (research|report|html_gen)
  --prompt=<path>       html_gen 단계에서 커스텀 프롬프트 파일 사용
  --input=<path>        입력 파일 경로 (skip-research 시 사용)
  --output-dir=<path>   출력 폴더 경로
  --help                도움말 출력

예시:
  node test_runner.js --phase=html_gen "KODEX 분석"
  node test_runner.js --phase=html_gen --prompt=info/3_html_gen.md
  node test_runner.js --skip-research "나스닥 전망"
  node test_runner.js --skip-research \\
    --input=output/hr_report_gpt5.1_20260116/1_research_result.md \\
    --output-dir=output/hr_report_custom_20260119
`);
    process.exit(0);
}

// Main execution
const userRequest = userRequestArg || '나스닥 100 지수 2025년 전망 슬라이드를 만들어줘';

if (skipResearch) {
    console.log('\n[옵션] --skip-research: research 단계를 건너뜁니다.');
}

if (targetPhase) {
    console.log(`\n[옵션] --phase=${targetPhase}: ${targetPhase} 단계만 실행합니다.`);
}

runWorkflow(userRequest).catch(console.error);
