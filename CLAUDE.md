# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 참고하는 가이드입니다.

## 프로젝트 개요

Text-to-HTML 슬라이드 생성기: 텍스트 요청을 HTML 슬라이드 프레젠테이션(1280x720px)으로 변환하는 다단계 AI 파이프라인. OpenAI 호환 LLM을 사용하여 3단계 워크플로우로 처리합니다.

## 명령어

```bash
# 전체 파이프라인 실행
npm test                              # 또는: node test_runner.js "주제"

# 특정 단계만 실행
node test_runner.js --phase=html_gen "주제"
node test_runner.js --phase=research "주제"
node test_runner.js --phase=report "주제"

# 리서치 단계 건너뛰기 (기존 결과 사용)
node test_runner.js --skip-research "주제"
node test_runner.js --skip-research --input=output/1_research_result.md

# HTML 생성에 커스텀 프롬프트 사용
node test_runner.js --phase=html_gen --prompt=info/3_html_gen.md

# 커스텀 출력 디렉토리 지정
node test_runner.js --output-dir=output/my_experiment "주제"

# 슬라이드를 PNG 이미지로 캡처
node scripts/capture_slides.cjs output/3_html_result.html
node scripts/capture_slides.cjs output/3_html_result.html ./custom_output_dir

# LLM 연결 테스트
node test_api.js
```

## 아키텍처

**3단계 파이프라인:**

1. **Research** (`prompts/1_research.md`) → `output/1_research_result.md`
   - LLM이 주제에 대한 웹 리서치 수행

2. **Report** (`prompts/2_report.md`) → `output/2_report_result.md`
   - 리서치 결과를 슬라이드용 섹션 형식으로 구조화

3. **HTML Generation** (`prompts/3_html_gen.md`) → `output/3_html_result.html`
   - TailwindCSS + D3.js 슬라이드 생성 (1280x720px)
   - 슬라이드 유형: TABLE, CARD_GRID, TIMELINE, KPI_DASHBOARD, BULLET_CARD, LINE_CHART_ANNOTATED, PIE_CHART, BAR_CHART, PROCESS_FLOW, COMPARISON_DIAGRAM, PILLAR_CARD, INFRASTRUCTURE_CARD, PRODUCT_GALLERY, FEATURE_COMPARISON_TABLE, BRAND_COMPARISON

**주요 파일:**
- `test_runner.js` - CLI 파싱을 포함한 메인 오케스트레이터
- `prompts/` - 단계별 프롬프트 템플릿 (로컬 오버라이드)
- `.agent/skills/html2slidehtml/resources/` - 기본 프롬프트 템플릿
- `scripts/capture_slides.cjs` - Puppeteer 기반 슬라이드 캡처

## 설정

`.env` 환경 변수:
```bash
LLM=openai                    # 'openai' 또는 'custom'
OPENAI_API_KEY=your_key
OPENAI_MODEL=gpt-4

# 커스텀 OpenAI 호환 서버용 (Ollama, vLLM, LMStudio):
# CUSTOM_LLM_URL=http://localhost:11434/v1
# CUSTOM_LLM_API_KEY=NONE
# CUSTOM_MODEL=llama3.2:3b
```

## 기술 스택

- Node.js (ES modules)
- openai SDK (OpenAI 호환 API 클라이언트)
- puppeteer (슬라이드 캡처)
- TailwindCSS + D3.js + Font Awesome (HTML 출력)

## 출력

모든 출력은 `output/` 디렉토리에 저장:
- `1_research_result.md`, `2_report_result.md`, `3_html_result.html`
- `llm_calls.log` - API 호출 메트릭 (JSON-L 형식)
- 버전별 실험 출력을 위한 하위 디렉토리
