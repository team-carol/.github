<!--
  team-carol 조직 프로필 (https://github.com/team-carol)
  이 파일은 생성물입니다. 직접 고치지 말고 src/profile/content.ts 를 고친 뒤 `npm run build` 하세요.
  프로젝트 목록은 조직의 공개 레포에서, 배지 색은 @team-carol/design-system 토큰에서 옵니다.
-->

<h1 align="center">team-carol</h1>

<p align="center">
  maimai DX NET을 Discord와 브라우저에서 — 봇 · 확장 · 이슈 triage
</p>

<p align="center">
  <a href="https://github.com/team-carol/carol"><img src="https://img.shields.io/badge/carol-ff9294?style=flat-square&logo=discord&logoColor=3a1e1e" alt="carol"></a>
  <a href="https://github.com/orgs/team-carol/discussions"><img src="https://img.shields.io/badge/Discussions-2e2e33?style=flat-square&logo=github&logoColor=f2edef" alt="Discussions"></a>
</p>

## ABOUT

**carol** 은 [maimai DX NET](https://maimaidx-eng.com/) 프로필을 Discord에서 확인하는 봇입니다.
SEGA 계정 정보를 받지 않고, 사용자가 이미 로그인해 둔 브라우저에서 실행한 **북마클릿이 보내주는 HTML만 파싱**합니다.
프로필·최근 플레이·레이팅표 이미지, CHUNITHM / SDVX / Arcaea 레이팅 체계 환산, 일일 성과 카드(`/성과`) 등을 제공합니다.

`team-carol` 은 carol 봇과 그 주변 도구 — 브라우저 확장, 전자잉크 키링, 제보 triage 서비스, 랜딩 페이지, 디자인 시스템 — 를 함께 개발합니다.

## PROJECTS

| 프로젝트 | 설명 | 스택 |
| --- | --- | --- |
| [**carol**](https://github.com/team-carol/carol) | maimai DX NET 프로필 확인 Discord 봇. 북마클릿 동기화, `satori` + `resvg` PNG 렌더, 타 게임 레이팅 치환, 일일 성과(`/성과`) | TypeScript · Node.js · discord.js · PostgreSQL |
| [**carol-extension**](https://github.com/team-carol/carol-extension) | maimaiDX NET을 한국어로 보고 곡을 별명으로 찾는 크롬 확장. 번역 사전 418 · 곡명 817 · 별명 3,486. 선택적 carol 프로필 동기화 | TypeScript · WXT · MV3 |
| [**carol-keyring**](https://github.com/team-carol/carol-keyring) · [사이트](https://keyring.team-carol.com/) | maimai 프로필을 보여 주는 전자잉크 키링. 펌웨어와, BLE로 화면을 보내는 웹 앱 | TypeScript · React · C++ · PlatformIO · BLE |
| [**carol-web**](https://github.com/team-carol/carol-web) · [사이트](https://www.team-carol.com/) | 캐롤봇 랜딩 페이지. 노션 DB의 트윗 링크로 패치노트 자동 생성, ko / en / ja 다국어 | Next.js 16 · Tailwind CSS v4 |
| [**carol-design-system**](https://github.com/team-carol/carol-design-system) · [사이트](https://design-system.team-carol.com/) | team carol 공용 디자인 시스템. 색·타이포그래피 토큰, CSS, React 컴포넌트를 `@team-carol/design-system` 패키지로 배포 | TypeScript · React · CSS · tsup |
| [**carol-issue**](https://github.com/team-carol/carol-issue) | Discord 제보를 받아 AI로 GitHub Issue 초안을 만들고 GitHub App으로 발행하는 triage 서비스. carol 본체와 HTTP API로 분리 | TypeScript · OpenAPI / Scalar |
| [**carol-ops**](https://github.com/team-carol/carol-ops) | carol 운영 대시보드. Docker 컨테이너 상태 확인과 설정 값 편집 | Go · React · Docker |
| [**.github**](https://github.com/team-carol/.github) | 이 프로필과 조직 전체 기본 커뮤니티 파일 | — |

## STACK

| 영역 | 기술 |
| --- | --- |
| 언어 | TypeScript · Go · C++ |
| 봇 · 서버 | Node.js · discord.js · PostgreSQL · satori + resvg |
| 웹 | Next.js 16 · React · Tailwind CSS v4 |
| 브라우저 확장 | WXT · Manifest V3 |
| 펌웨어 | PlatformIO · BLE · 전자잉크 |
| 인프라 | Docker · Cloudflare Tunnel |

## CONTRIBUTE

- 💬 [Discussions](https://github.com/orgs/team-carol/discussions) — 질문과 아이디어
- 🐛 버그·기능 제안은 각 레포의 Issues, carol 이용 중이라면 Discord `/문의`
- 📄 [기여 가이드](https://github.com/team-carol/.github/blob/main/CONTRIBUTING.md) · [행동 강령](https://github.com/team-carol/.github/blob/main/CODE_OF_CONDUCT.md)

---

<p align="center">
  <sub>carol 은 SEGA 및 maimai 와 무관한 비공식 프로젝트입니다. · © 2026 team-carol</sub>
</p>
