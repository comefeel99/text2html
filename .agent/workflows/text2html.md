---
description: Text to HTML Slide Generation Workflow
---

This workflow outlines the steps to convert a text request into an HTML slide presentation using a 4-stage multi-agent process.

**핵심 원칙**: 정보 밀도를 최대화하여 원본 자료의 모든 주제와 수치를 슬라이드에 반영

---

1. **Research Phase**
   - Read the user's request.
   - Read `prompts/1_research.md`.
   - Use the `search_web` tool to gather relevant information and URLs as per the prompt instructions. 
   - Focus on gathering diverse data points, statistics, and source references.

2. **Report Phase** (정보 구조화)
   - Read `prompts/2_report.md`.
   - Combine the user's request and the gathered research results.
   - **핵심**: 원본 자료의 모든 주제를 섹션으로 분리하고, 각 섹션에 권장 슬라이드 타입 지정
   - Output: 구조화된 보고서 (섹션별 핵심 메시지, 세부 내용, 관련 수치, 출처)

3. **HTML Generation Phase** (슬라이드 생성)
   - Read `prompts/3_html_gen.md`.
   - Use the structured report from the previous step.
   - **슬라이드 타입 선택**: TABLE, CARD_GRID, TIMELINE, KPI_DASHBOARD, BULLET_CARD
   - **정보 밀도 기준**: 슬라이드당 최소 3개 정보 블록, 모든 수치 포함, 출처 표시
   - Output: 초기 HTML 슬라이드 (보고서 섹션 수 = 슬라이드 수)

4. **Review and Refine Phase** (검토 및 보완)
   - Read `prompts/4_review.md`.
   - **정보 완전성 검증**: 누락된 섹션/수치 확인
   - **시각적 품질 검증**: 레이아웃, 색상 일관성, 가독성
   - **기술적 검증**: 라이브러리, D3.js 차트 렌더링
   - Correct and refine the HTML code.
   - Save the final HTML to a file (e.g., `output.html`) and present it to the user.

---

**품질 체크리스트**:
- [ ] 원본 자료의 모든 주제가 슬라이드로 변환됨
- [ ] 모든 수치 데이터(%, 일수, 비율)가 시각적으로 강조됨
- [ ] 출처 정보가 표시됨
- [ ] 빈 공간이 50% 이상인 슬라이드 없음
