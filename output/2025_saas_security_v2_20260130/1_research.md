# 2025 엔터프라이즈 SaaS 보안 트렌드 - 리서치 결과

## 수집 정보 요약

### 1. 핵심 통계/수치

| 항목 | 수치 | 출처 |
|-----|-----|------|
| AI 피싱 공격 정교화 증가율 | 30-40% | Gartner, 2025 |
| Shadow AI 정책 도입 기업 비율 | 75% | CSA, 2025 |
| 자동 복구 AI 통합 SaaS 보안 솔루션 | 60% | Industry Reports |
| SSPM 시장 연평균 성장률 | 20%+ CAGR | Market Analysis |
| 설정 오류로 인한 SaaS 침해 비율 | 63% | Security Research |
| 기업 평균 SaaS 앱 보유 수 | 130+ | Enterprise Survey |
| 피싱 저항 MFA 의무화 규제 환경 비율 | 50%+ | Regulation Forecast |
| 비인간 ID vs 인간 ID 비율 | 20:1 | Identity Management Report |
| 데이터 레지던시 우선 기업 비율 | 60% | Global Enterprise Survey |
| 평균 침해 탐지 소요 시간 | 200일+ | Industry Statistics |
| SaaS 보안 지출 증가율 | 12-15% | Budget Forecast |

### 2. 주요 트렌드 영역

#### AI 기반 위협과 방어
- **AI 생성 피싱**: LLM을 활용한 초개인화된 피싱 공격 30-40% 정교화
- **Shadow AI 거버넌스**: 미승인 AI 도구 사용에 대한 정책 필요성 급증
- **자동 복구(Self-Healing)**: AI가 자동으로 잘못된 설정 수정, 의심스러운 권한 철회

#### SSPM(SaaS Security Posture Management)
- 시장 20% 이상 CAGR로 성장
- 평균 130개 이상의 SaaS 앱 관리 필요
- 보안 점검 자동화가 70% 보안 리더의 최우선 과제

#### 제3자/제4자 리스크
- **API 보안 사고**: 2025년 가장 빈번한 SaaS 침해 공격 벡터 예상
- **OAuth 연결**: 평균 기업당 2,000개 이상의 OAuth 인테그레이션
- 제4자 리스크: 소규모 연동이 핵심 시스템(Salesforce, M365)의 백도어 제공

#### IAM(Identity Access Management) 진화
- **피싱 저항 MFA**: FIDO2/Passkeys가 SMS, 푸시 기반 MFA 대체
- **비인간 ID(NHI)**: 서비스 계정, 봇, 워크로드가 인간 사용자의 20배
- 패스워드리스 인증, JIT(Just-in-Time) 접근 확산

#### 규제 및 데이터 주권
- 데이터 레지던시/소버린 클라우드 옵션 우선시
- SEC, NIS2 등 신속한 침해 공개 요구
- 침해 탐지 시간 200일→30일 이내 단축 압박

### 3. Zero Trust 베스트 프랙티스

| 우선순위 | 실행 항목 |
|---------|---------|
| **높음** | 레거시 VPN을 ZTNA로 대체 |
| **높음** | 피싱 저항 MFA 전사 의무화 |
| **중간** | SSPM 도구로 SaaS 설정 오류 탐지/수정 |
| **중간** | API/OAuth 앱에 최소 권한 원칙 적용 |
| **지속** | 정기적 "Assume Breach" 시뮬레이션 |

### 4. 주요 도구/기술

- **SSPM**: Obsidian Security, Adaptive Shield, AppOmni
- **CASB**: Netskope, Zscaler, Microsoft Defender for Cloud Apps
- **IAM/PAM**: Okta, CyberArk, BeyondTrust
- **MFA**: YubiKey, FIDO2/WebAuthn, Passkeys
- **DLP**: Microsoft Purview, Symantec DLP
- **AI Security**: Microsoft Security Copilot, Google Security Command Center

### 5. 원본 출처
1. Gartner 2025 Security Trends Report
2. Cloud Security Alliance (CSA) 2025 Forecast
3. NIST 800-207 Zero Trust Architecture
4. CISA Zero Trust Maturity Model 2.0
5. SEC/EU NIS2 Disclosure Requirements
