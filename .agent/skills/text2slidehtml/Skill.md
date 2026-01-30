---
name: Text to HTML Slide Generator
description: 텍스트 문서나 주제를 시각적으로 뛰어난 HTML 슬라이드 프레젠테이션으로 변환합니다. 리서치, 구조화, HTML 생성의 3단계 프로세스를 통해 정보 밀도가 높은 슬라이드를 생성합니다.
---

# Text to HTML Slide Generator

텍스트 기반 요청을 시각적으로 뛰어난 HTML 슬라이드 프레젠테이션으로 변환하는 3단계 멀티 에이전트 프로세스입니다.

## 핵심 원칙
- **정보 밀도 최대화**: 원본 자료의 모든 주제와 수치를 슬라이드에 반영
- **섹션당 1 슬라이드**: 누락 없이 모든 정보를 시각화
- **수치 강조**: 모든 데이터를 시각적으로 강조
- **구체성 필수**: 추상적 설명 대신 구체적 도구명, 기업명, 사례 포함

---

## Workflow

### Phase 1: Research (리서치)
**목적**: PPT 제작에 필요한 다양한 자료 수집

참조: `resources/1_research.md`

**작업 내용**:
- 사용자 요청 분석
- `search_web` 도구로 관련 정보 및 URL 수집
- 다양한 각도의 데이터, 통계, 출처 수집

---

### Phase 2: Report (보고서 구조화)
**목적**: 수집된 자료를 슬라이드에 적합한 구조로 변환

참조: `resources/2_report.md`

**작업 내용**:
- 원본 자료의 모든 주제를 섹션으로 분리
- 각 섹션에 권장 슬라이드 타입 지정
- 구조화된 보고서 출력 (섹션별 핵심 메시지, 세부 내용, 수치, 출처)

**권장 슬라이드 타입**:
| 정보 유형 | 권장 타입 |
|----------|----------|
| 비교/호환성 데이터 | TABLE |
| 3개 이상 항목 나열 | CARD_GRID |
| 단계별/시간순 정보 | TIMELINE |
| 핵심 성과 지표 | KPI_DASHBOARD |
| 상세 설명/정책 | BULLET_CARD |
| 시계열 전망/예측 | LINE_CHART_ANNOTATED |
| 비율/배분 데이터 | PIE_CHART |
| 수치 비교 | BAR_CHART |
| 프로세스/흐름 | PROCESS_FLOW |
| A vs B 비교 | COMPARISON_DIAGRAM |
| 핵심 장점/가치 | PILLAR_CARD |
| 인프라/역량 설명 | INFRASTRUCTURE_CARD |
| 제품 갤러리 | PRODUCT_GALLERY |
| 기능 비교표 | FEATURE_COMPARISON_TABLE |
| 브랜드 A vs B | BRAND_COMPARISON |

---

### Phase 3: HTML Generation (슬라이드 생성)
**목적**: 구조화된 보고서를 HTML 슬라이드로 변환

참조: `resources/3_html_gen.md`

**기술 스택**:
- TailwindCSS (스타일링)
- D3.js (차트/시각화)
- Font Awesome (아이콘)

**슬라이드 규격**: 1280x720px

**정보 밀도 기준 (강화됨)**:
- 슬라이드당 **최소 5개 정보 블록**
- 각 슬라이드에 **최소 1개의 수치/통계** 포함
- 모든 수치 **강조 표시** (색상, 크기)
- 출처 **인라인 표시** (슬라이드 내 각주)
- 구체적 도구/기업명 **5개 이상** 포함

---

## 품질 체크리스트
- [ ] 원본 자료의 모든 주제가 슬라이드로 변환됨
- [ ] 모든 수치 데이터(%, 일수, 비율)가 시각적으로 강조됨
- [ ] 출처 정보가 표시됨
- [ ] 빈 공간이 50% 이상인 슬라이드 없음

---

## Example Input/Output

### Input
```
나스닥 100 지수와 주요 기술주에 대한 2025년 전망 자료를 만들어줘
```

### Output
- 리서치 결과 (URL 리스트)
- 구조화된 보고서 (섹션별 정리)
- HTML 슬라이드 파일 (output.html)
  - 타이틀 슬라이드
  - 지수 전망 (LINE_CHART_ANNOTATED)
  - 섹터별 분석 (CARD_GRID)
  - 핵심 지표 (KPI_DASHBOARD)
  - 결론 슬라이드
