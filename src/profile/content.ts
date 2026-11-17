// 프로필에 들어가는 글. 사람이 고치는 파일은 여기 하나다.
// 레포 목록 자체는 GitHub API(공개 레포)에서 오고, 여기서는 설명·스택·순서만 덮어쓴다.

export const ORG = "team-carol";

export interface ProjectOverride {
  /** 표에 쓸 설명. 없으면 GitHub 레포 설명을 쓴다. */
  description?: string;
  /** 스택. 없으면 GitHub 가 판정한 주 언어를 쓴다. */
  stack?: string[];
}

/**
 * 키 순서가 곧 표의 순서다. 여기 없는 공개 레포는 이름순으로 뒤에 붙는다.
 * 여기 있어도 공개 레포가 아니면(비공개·삭제) 표에 나오지 않는다.
 */
export const projects: Record<string, ProjectOverride> = {
  carol: {
    description:
      "maimai DX NET 프로필 확인 Discord 봇. 북마클릿 동기화, `satori` + `resvg` PNG 렌더, 타 게임 레이팅 치환, 일일 성과(`/성과`)",
    stack: ["TypeScript", "Node.js", "discord.js", "PostgreSQL"],
  },
  "carol-extension": {
    description:
      "maimaiDX NET을 한국어로 보고 곡을 별명으로 찾는 크롬 확장. 번역 사전 418 · 곡명 817 · 별명 3,486. 선택적 carol 프로필 동기화",
    stack: ["TypeScript", "WXT", "MV3"],
  },
  "carol-keyring": {
    description: "maimai 프로필을 보여 주는 전자잉크 키링. 펌웨어와, BLE로 화면을 보내는 웹 앱",
    stack: ["TypeScript", "React", "C++", "PlatformIO", "BLE"],
  },
  "carol-web": {
    description: "캐롤봇 랜딩 페이지. 노션 DB의 트윗 링크로 패치노트 자동 생성, ko / en / ja 다국어",
    stack: ["Next.js 16", "Tailwind CSS v4"],
  },
  "carol-design-system": {
    description: "team carol 공용 디자인 시스템. 색·타이포그래피 토큰, CSS, React 컴포넌트를 `@team-carol/design-system` 패키지로 배포",
    stack: ["TypeScript", "React", "CSS", "tsup"],
  },
  "carol-issue": {
    description:
      "Discord 제보를 받아 AI로 GitHub Issue 초안을 만들고 GitHub App으로 발행하는 triage 서비스. carol 본체와 HTTP API로 분리",
    stack: ["TypeScript", "OpenAPI / Scalar"],
  },
  "carol-ops": {
    description: "carol 운영 대시보드. Docker 컨테이너 상태 확인과 설정 값 편집",
    stack: ["Go", "React", "Docker"],
  },
  ".github": {
    description: "이 프로필과 조직 전체 기본 커뮤니티 파일",
    stack: [],
  },
};

/** 공개 레포여도 표에서 빼고 싶은 것. */
export const hidden: string[] = [];

export const content = {
  title: ORG,
  tagline: "maimai DX NET을 Discord와 브라우저에서 — 봇 · 확장 · 이슈 triage",

  about: [
    [
      "**carol** 은 [maimai DX NET](https://maimaidx-eng.com/) 프로필을 Discord에서 확인하는 봇입니다.",
      "SEGA 계정 정보를 받지 않고, 사용자가 이미 로그인해 둔 브라우저에서 실행한 **북마클릿이 보내주는 HTML만 파싱**합니다.",
      "프로필·최근 플레이·레이팅표 이미지, CHUNITHM / SDVX / Arcaea 레이팅 체계 환산, 일일 성과 카드(`/성과`) 등을 제공합니다.",
    ],
    [
      "`team-carol` 은 carol 봇과 그 주변 도구 — 브라우저 확장, 전자잉크 키링, 제보 triage 서비스, 랜딩 페이지, 디자인 시스템 — 를 함께 개발합니다.",
    ],
  ],

  stack: [
    { area: "언어", items: ["TypeScript", "Go", "C++"] },
    { area: "봇 · 서버", items: ["Node.js", "discord.js", "PostgreSQL", "satori + resvg"] },
    { area: "웹", items: ["Next.js 16", "React", "Tailwind CSS v4"] },
    { area: "브라우저 확장", items: ["WXT", "Manifest V3"] },
    { area: "펌웨어", items: ["PlatformIO", "BLE", "전자잉크"] },
    { area: "인프라", items: ["Docker", "Cloudflare Tunnel"] },
  ],

  contribute: [
    `💬 [Discussions](https://github.com/orgs/${ORG}/discussions) — 질문과 아이디어`,
    "🐛 버그·기능 제안은 각 레포의 Issues, carol 이용 중이라면 Discord `/문의`",
    `📄 [기여 가이드](https://github.com/${ORG}/.github/blob/main/CONTRIBUTING.md) · [행동 강령](https://github.com/${ORG}/.github/blob/main/CODE_OF_CONDUCT.md)`,
  ],

  footer: `carol 은 SEGA 및 maimai 와 무관한 비공식 프로젝트입니다. · © 2026 ${ORG}`,
};

export type Content = typeof content;
