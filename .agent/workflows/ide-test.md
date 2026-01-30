---
description: IDE 기반 텍스트 → HTML 슬라이드 생성 테스트 워크플로우
---

API 없이 IDE에서 텍스트를 HTML 슬라이드로 변환하는 워크플로우입니다.

> **스킬 사용**: 이 워크플로우는 `text2slidehtml` 스킬을 기반으로 합니다.
> 
> 스킬 위치: `.agent/skills/text2slidehtml/Skill.md`

---

## 사전 준비

1. 사용자로부터 슬라이드로 만들 내용/주제 확인
2. 필요 시 관련 자료 파일 확인

---

## Workflow Steps

### Step 1: 스킬 로드
`.agent/skills/text2slidehtml/Skill.md` 파일을 읽어 전체 프로세스 이해

### Step 2: Research Phase (리서치)
- 참조: `.agent/skills/text2slidehtml/resources/1_research.md`
- 사용자 요청 분석
- **IDE 모드**: 사용자가 제공한 자료 또는 파일 기반으로 정보 수집

### Step 3: Report Phase (보고서 구조화)
- 참조: `.agent/skills/text2slidehtml/resources/2_report.md`
- 수집된 자료를 섹션별로 구조화
- 각 섹션에 권장 슬라이드 타입 지정

### Step 4: HTML Generation Phase (슬라이드 생성)
- 참조: `.agent/skills/text2slidehtml/resources/3_html_gen.md`
- 구조화된 보고서를 HTML 슬라이드로 변환
- 기술 스택: TailwindCSS, D3.js, Font Awesome
- 슬라이드 규격: 1280x720px

### Step 5: 결과 저장
- 최종 HTML을 `output/` 폴더에 저장
- **폴더명 규칙**: `{주제}_{버전}_{날짜}` (예: `hr_report_v1_20260130`)
- **버전 관리**: 
  - 동일한 주제의 폴더가 이미 존재할 경우, 기존 폴더를 수정하지 않음
  - 버전을 순차적으로 증가시켜 새로운 폴더 생성 (v1 → v2 → v3)
- 파일명: `3_html_result.html`

---

## 품질 체크리스트

- [ ] 원본 자료의 모든 주제가 슬라이드로 변환됨
- [ ] 모든 수치 데이터(%, 일수, 비율)가 시각적으로 강조됨
- [ ] 출처 정보가 표시됨
- [ ] 빈 공간이 50% 이상인 슬라이드 없음
