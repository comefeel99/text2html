# 아이디어 인박스

## 📥 원본 (사용자 작성 영역)
<!-- 여기에 생각나는 대로 자유롭게 작성하세요 -->
<!-- 예시: "테스트 자동화 개선하고 싶음", "에러 처리 로직 정리 필요" -->

테마 테스트 

1. Theme A: Corporate Glass
주제: 2025 엔터프라이즈 SaaS 보안 트렌드
특징: backdrop-filter: blur, Apple Blue 포인트 컬러, 깔끔한 글래스모피즘
결과물: output/test_theme_a/3_html_result.html
2. Theme B: Premium Warm
주제: 2025 핸드드립 커피 시장 트렌드
특징: 웜톤 배경(#fffdf7), Poppins 폰트, 유기적 SVG 장식
결과물: output/test_theme_b/3_html_result.html
3. Theme C: Cinematic
주제: SpaceX 스타십: 화성 이주 비전
특징: 전체 화면 배경 이미지, Dark Overlay, 웅장한 텍스트 배치
결과물: output/test_theme_c/3_html_result.html
4. Theme D: Construct
주제: 테슬라 사이버트럭 vs 포드 F-150 라이트닝
특징: 강렬한 대비(High Contrast), 직각 디자인, 굵은 폰트(Black Weight)
결과물: output/test_theme_d/3_html_result.html



무료 이미지를 활용한 슬라이드 디자인  품질 향상 방안


---

## 📋 정리됨 (AI 정리 영역)

### 1. 테스트 샘플 케이스 추가
- **설명**: `test_sample/` 폴더에 다양한 테스트 케이스 추가
- **배경**: 현재 test1~test4 (4개)만 존재, 더 다양한 케이스 필요
- **사용자 결정**: 사용자가 직접 추가 예정
- **상태**: ⏸️ 대기 (사용자 작업)

### 2. Output 폴더 정리
- **설명**: output 파일들을 `hr_report_gpt5.1_20260116` 형식의 폴더로 구조화
- **상태**: ✅ 완료 (2026-01-29)


---

## ✅ 진행 결정됨
<!-- 사용자가 "예"로 체크한 항목들이 여기로 이동됩니다 -->

*(현재 진행 중인 항목 없음)*

---

## 🚀 완료
<!-- 수행 완료된 항목들 -->

### 2026-01-30: prompts 폴더 삭제
- 루트의 `prompts/` 폴더 삭제 완료
- `.agent/skills/text2slidehtml/resources/`와 중복되어 정리함

### 2026-01-30: IDE 테스트 워크플로우 정리
- `.agent/workflows/text2html.md` → `ide-test.md`로 이름 변경
- API 없이 IDE에서 사용할 수 있도록 내용 정리
- 사용법: `/ide-test` 명령으로 호출

### 2026-01-30: 테스트 후 슬라이드 자동 캡처 구현
- `src/runner.js`에 슬라이드 캡처 기능 추가
- 워크플로우 성공 시 자동으로 `capture_slides.cjs` 실행
- 캡처 결과는 output 폴더 내 `slides/` 디렉토리에 저장
- `--no-capture` 옵션으로 캡처 비활성화 가능

### 2026-01-29: Output 폴더 정리
- `output/` 폴더 내 파일들을 구조화된 폴더로 정리
- 명명 규칙: `{프로젝트명}_{모델}_{날짜}` (예: `hr_report_gpt5.1_20260116`)

### 2026-01-29: Skill 이름 변경
- `html2slidehtml` → `text2slidehtml`로 스킬 이름 변경

---

## 📖 사용 방법

1. **아이디어 추가**: `📥 원본` 영역에 자유롭게 작성
2. **정리 요청**: "인박스 정리해줘" 라고 말하기
3. **검토 & 결정**: 질문에 답변하고 진행 여부 체크
4. **실행 요청**: "진행 결정된 것 수행해줘" 라고 말하기
