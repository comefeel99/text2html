# Research Notes: 2025 Enterprise SaaS Security Trends

## 1. 핵심 통계 및 트렌드
### General Stats
- **SaaS 보안 우선순위**: 86%의 조직이 SaaS 보안을 높은 우선순위로 간주함 [1]
- **예산 증액**: 76%의 조직이 SaaS 보안 예산 증액 계획 [2]
- **Shadow IT**: 엔터프라이즈 앱의 48%가 Shadow IT [3], 직원 55%가 보안 승인 없이 SaaS 도입 [1]
- **데이터 노출**: 63% 조직이 외부 데이터 과다 공유 경험 [3]
- **신원 관리**: SaaS 사용자의 85%가 과도한 권한 보유 [5], 46% 조직이 비인간(Non-Human) 신원 모니터링에 어려움 [1]
- **공격 증가**: 클라우드 타겟 공격 2025년 상반기 136% 급증 [7]

### Market Size
- **SaaS 보안 시장**: 2025년 약 $26B 규모 전망, CAGR 19% 성장 (2020-2025) [Persistence Market Research]
- **Application Security**: 2025년 $13.64B 규모 전망 [Mordor Intelligence]

## 2. 주요 침해 사고 (2024-2025)
- **Snowflake (2024)**: MFA 미설정 계정을 통한 크리덴셜 스터핑. AT&T, Ticketmaster 등 대형 피해.
- **Microsoft Midnight Blizzard (Jan 2024)**: MFA 없는 테스트 테넌트 침투 -> 임원진 이메일 탈취.
- **Dropbox Sign (Apr 2024)**: 서비스 계정 탈취, 고객 데이터 및 MFA 정보 유출.
- **Salesforce Phishing Campaign (2025)**: 음성 피싱(Vishing) 및 악성 OAuth 앱을 통한 대규모 공격 (Adidas, Dior 등 90+ 기업 피해).
- **Cloudflare Atlassian (2024)**: 유출된 자격 증명과 방치된 서비스 토큰 악용.

## 3. 핵심 도구 및 기술 솔루션
### SSPM (SaaS Security Posture Management)
- **기능**: 설정 오류 감지, Shadow IT 탐지, 컴플라이언스 준수.
- **주요 벤더**: AppOmni, Netskope, Adaptive Shield, Grip Security, Waldo Security.

### IAM (Identity & Access Management)
- **기능**: SSO, 적응형 MFA, 수명주기 관리.
- **주요 벤더**: Okta, Auth0, Microsoft Entra ID.

### DSPM (Data Security Posture Management)
- **기능**: 데이터 분류, 흐름 식별, 유출 방지.
- **주요 벤더**: Sentra.io, Varonis, DoControl.

### Compliance Automation
- **주요 벤더**: Vanta, Drata.

## 4. 2025 보안 전략 (Actionable Items)
1.  **Zero Trust Architecture**: "신뢰하지 말고 검증하라". 모든 접근에 MFA 적용 및 지속적 검증.
2.  **Shadow IT Visibility**: SSPM/CASB를 통해 미승인 앱 식별 및 통제 (48% -> 10% 목표).
3.  **Non-Human Identity Management**: API 키, OAuth 토큰의 주기적 로테이션 및 모니터링.
4.  **AI Governance**: AI 도구 사용 가이드라인 수립 및 데이터 유출 방지 대책 마련.

## 5. 원본 출처 (References)
- [1] Cloud Security Alliance (CSA)
- [2] BetterCloud State of SaaSOps
- [3] SellersCommerce Shadow IT Report
- [4] Grip Security SaaS Identity Risk Report
- [5] Josys SaaS Management Report
- [6] Wing Security SaaS Threat Report
- [7] AppSecure Cloud Threat Report
