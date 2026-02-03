---
description: API 기반 4가지 테마 자동화 테스트 (Auto Versioning)
---

API를 사용하여 4가지 테마에 대한 슬라이드 생성을 병렬로 테스트합니다.
실행 시마다 `v{N+1}` 버전을 자동으로 생성하며, 결과를 검증합니다.

> **Feature**: Auto Versioning, Parallel Execution, Result Validation

## Workflow Steps

### Step 1: 테스트 환경 점검
- `.env` 파일의 `LLM=custom` 및 모델 ID 확인
- 입력 데이터 파일 존재 여부 확인 (`output/*_v2_...`)
- 실행 스크립트: `scripts/run_concurrent_tests.js`

### Step 2: API 테스트 실행
// turbo
`node scripts/run_concurrent_tests.js` 명령을 실행합니다.

**실행 내용:**
- 4개 테마(SaaS, Coffee, SpaceX, Cybertruck) 동시 실행
  - Theme A (SaaS Security): `output/2025_saas_security_v2_20260130`
    2025 엔터프라이즈 SaaS 보안 트렌드
  - Theme B (Coffee): `output/handdrip_coffee_trends_v2_20260130`
    2025 핸드드립 커피 시장 트렌드
  - Theme C (Starship): `output/spacex_starship_mars_v2_20260130`
    SpaceX 스타십: 화성 이주 비전
  - Theme D (Cybertruck): `output/cybertruck_vs_f150_v2_20260130`
    테슬라 사이버트럭 vs 포드 F-150 라이트닝
- `output` 폴더를 스캔하여 다음 버전(`vN+1`) 자동 결정
- 각 폴더에 `run.log` 및 HTML 결과 저장

### Step 3: 결과 검증
- **성공 기준**: 모든 테스트의 Exit Code가 0이고, HTML 파일이 정상적으로 생성됨(1KB 이상)
- **실패 시**: 각 출력 폴더의 `run.log`를 확인하여 오류 분석

## Quality Checklist
- [ ] 모든 테스트가 `[완료]` 상태인가?
- [ ] 생성된 폴더의 버전이 기존 버전보다 높은가?
- [ ] HTML 파일이 브라우저에서 올바르게 열리는가?