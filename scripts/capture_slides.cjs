/**
 * HTML 슬라이드를 이미지로 캡처하는 스크립트
 * 사용법: node scripts/capture_slides.js <html_file_path> [output_dir]
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function captureSlides(htmlFilePath, outputDir) {
    // 절대 경로로 변환
    const absoluteHtmlPath = path.resolve(htmlFilePath);

    // 출력 디렉토리 설정 (기본값: HTML 파일과 같은 디렉토리의 slides 폴더)
    if (!outputDir) {
        outputDir = path.join(path.dirname(absoluteHtmlPath), 'slides');
    }

    // 출력 디렉토리 생성
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log(`📄 HTML 파일: ${absoluteHtmlPath}`);
    console.log(`📁 출력 디렉토리: ${outputDir}`);

    // 브라우저 실행
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();

        // 슬라이드 크기에 맞게 뷰포트 설정 (1280x720)
        await page.setViewport({
            width: 1280,
            height: 720,
            deviceScaleFactor: 2  // 고해상도 캡처 (2배)
        });

        // HTML 파일 로드
        await page.goto(`file://${absoluteHtmlPath}`, {
            waitUntil: 'networkidle0',
            timeout: 30000
        });

        // 폰트 및 이미지 로딩 대기
        await page.evaluate(() => {
            return new Promise((resolve) => {
                if (document.fonts && document.fonts.ready) {
                    document.fonts.ready.then(resolve);
                } else {
                    setTimeout(resolve, 1000);
                }
            });
        });

        // 추가 대기 (D3 차트 등 동적 콘텐츠 렌더링)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 모든 슬라이드 요소 찾기
        const slides = await page.$$('.slide');
        console.log(`🎯 발견된 슬라이드 수: ${slides.length}`);

        if (slides.length === 0) {
            console.error('❌ 슬라이드를 찾을 수 없습니다. .slide 클래스를 확인해주세요.');
            return;
        }

        // 각 슬라이드 캡처
        for (let i = 0; i < slides.length; i++) {
            const slideNumber = i + 1;
            const outputPath = path.join(outputDir, `slide_${String(slideNumber).padStart(2, '0')}.png`);

            // 슬라이드 요소로 스크롤
            await slides[i].scrollIntoView();

            // 잠시 대기 (애니메이션 완료)
            await new Promise(resolve => setTimeout(resolve, 300));

            // 슬라이드 캡처
            await slides[i].screenshot({
                path: outputPath,
                type: 'png'
            });

            console.log(`✅ 슬라이드 ${slideNumber} 저장: ${outputPath}`);
        }

        console.log(`\n🎉 완료! ${slides.length}개의 슬라이드가 이미지로 저장되었습니다.`);
        console.log(`📁 저장 위치: ${outputDir}`);

    } catch (error) {
        console.error('❌ 오류 발생:', error.message);
    } finally {
        await browser.close();
    }
}

// CLI 실행
const args = process.argv.slice(2);

if (args.length === 0) {
    console.log(`
사용법: node scripts/capture_slides.js <html_file_path> [output_dir]

예시:
  node scripts/capture_slides.js output/hr_report_gpt5.1_20260116/3_html_result.html
  node scripts/capture_slides.js output/hr_report_gpt5.1_20260116/3_html_result.html ./my_slides
  `);
    process.exit(1);
}

const htmlFilePath = args[0];
const outputDir = args[1];

captureSlides(htmlFilePath, outputDir);
