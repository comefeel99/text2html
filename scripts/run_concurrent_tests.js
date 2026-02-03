import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.dirname(__dirname);
const OUTPUT_BASE = path.join(PROJECT_ROOT, 'output');

// 현재 날짜 (YYYYMMDD)
const TODAY = new Date().toISOString().slice(0, 10).replace(/-/g, '');

// 테스트 설정
const TESTS = [
    {
        name: 'Theme A (SaaS Security)',
        key: '2025_saas_security',
        input: 'output/2025_saas_security_v2_20260130/1_research.md',
        query: '2025 엔터프라이즈 SaaS 보안 트렌드'
    },
    {
        name: 'Theme B (Coffee Trends)',
        key: 'handdrip_coffee_trends',
        input: 'output/handdrip_coffee_trends_v2_20260130/1_research.md',
        query: '2025 핸드드립 커피 시장 트렌드'
    },
    {
        name: 'Theme C (SpaceX Starship)',
        key: 'spacex_starship_mars',
        input: 'output/spacex_starship_mars_v2_20260130/1_research.md',
        query: 'SpaceX 스타십: 화성 이주 비전'
    },
    {
        name: 'Theme D (Cybertruck)',
        key: 'cybertruck_vs_f150',
        input: 'output/cybertruck_vs_f150_v2_20260130/1_research.md',
        query: '테슬라 사이버트럭 vs 포드 F-150 라이트닝'
    }
];

// 자동 버전 계산 함수
function getNextVersion(key) {
    let maxVersion = 0;

    if (fs.existsSync(OUTPUT_BASE)) {
        const files = fs.readdirSync(OUTPUT_BASE);
        const regex = new RegExp(`^${key}_v(\\d+)_\\d{8}$`);

        files.forEach(file => {
            const match = file.match(regex);
            if (match) {
                const ver = parseInt(match[1]);
                if (ver > maxVersion) maxVersion = ver;
            }
        });

        // kimi_k2.5 같은 특수 버전도 있다면 고려할 수 있지만, 
        // 여기서는 표준 v{Number} 포맷을 따릅니다.
    }

    // 이전에 v5까지 생성했다면 v6가 됨
    // 만약 vN 형식이 없는 경우(kimi 이름 등) 안전하게 v1부터 시작하거나 
    // 기존 최대값(예: 5)을 고려
    if (maxVersion === 0) maxVersion = 5; // 기본적으로 기존 v5 이후부터 시작

    return maxVersion + 1;
}

async function runTest(test) {
    return new Promise((resolve, reject) => {
        const nextVer = getNextVersion(test.key);
        const folderName = `${test.key}_v${nextVer}_${TODAY}`;
        const outputDir = path.join('output', folderName);
        const outputPath = path.join(PROJECT_ROOT, outputDir);

        // 출력 폴더 생성
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath, { recursive: true });
        }

        const logStream = fs.createWriteStream(path.join(outputPath, 'run.log'));

        console.log(`[시작] ${test.name} → ${folderName}`);

        const args = [
            'src/runner.js',
            '--skip-research',
            `--input=${test.input}`,
            `--output-dir=${outputDir}`,
            test.query
        ];

        const startTime = Date.now();
        const child = spawn('node', args, {
            cwd: PROJECT_ROOT,
            env: process.env
        });

        child.stdout.pipe(logStream);
        child.stderr.pipe(logStream);

        child.on('close', (code) => {
            const duration = ((Date.now() - startTime) / 1000).toFixed(1);
            const htmlFile = path.join(outputPath, '3_html_result.html');
            const hasHtml = fs.existsSync(htmlFile);

            let fileSize = 0;
            if (hasHtml) {
                const stats = fs.statSync(htmlFile);
                fileSize = (stats.size / 1024).toFixed(1); // KB
            }

            if (code === 0 && hasHtml && fileSize > 1) {
                console.log(`[완료] ${test.name} (${duration}s)`);
                console.log(`       ✓ Ver: v${nextVer} | Size: ${fileSize}KB`);
                resolve({ test, success: true, version: nextVer, duration });
            } else {
                console.error(`[실패] ${test.name} (Exit Code: ${code})`);
                if (!hasHtml) console.error(`       ❌ HTML 파일 미생성`);
                else if (fileSize <= 1) console.error(`       ⚠️ HTML 파일이 너무 작음 (${fileSize}KB)`);

                console.error(`       → 로그 확인: ${outputDir}/run.log`);
                reject(new Error(`${test.name} failed`));
            }
        });
    });
}

async function main() {
    console.log('='.repeat(60));
    console.log('API Based Concurrent Test Runner');
    console.log(`Target: ${TESTS.length} Scenarios`);
    console.log('Date: ' + TODAY);
    console.log('='.repeat(60));

    const startTime = Date.now();

    try {
        const results = await Promise.allSettled(TESTS.map(runTest));

        const totalDuration = ((Date.now() - startTime) / 1000).toFixed(1);
        const successCount = results.filter(r => r.status === 'fulfilled').length;

        console.log('\n' + '='.repeat(60));
        console.log(`✅ Method: Auto-Versioning | Total Time: ${totalDuration}s`);
        console.log(`Success: ${successCount} / ${TESTS.length}`);
        console.log('='.repeat(60));

        if (successCount < TESTS.length) process.exit(1);

    } catch (error) {
        console.error('\n❌ Critical Error:', error);
        process.exit(1);
    }
}

main();
