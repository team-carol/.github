// content + 공개 레포 목록 → profile/README.md 문자열. 네트워크·파일 접근 없는 순수 함수.
//
// 원칙: 정보는 전부 글자로 나간다. 이미지는 맨 위 링크 배지 둘뿐이고(색은 디자인 시스템 토큰),
// 배지가 가리키는 곳은 본문에도 글자 링크로 다시 나온다.

import { accent, background, text } from "@team-carol/design-system";
import type { Content, ProjectOverride } from "./content.ts";
import type { Repo } from "./github.ts";

const hex = (color: string) => color.replace(/^#/, "");

/** shields.io 정적 배지 경로 규칙: `-` → `--`, `_` → `__`, 공백 → `_` */
const shieldsText = (s: string) =>
  encodeURIComponent(s.replace(/-/g, "--").replace(/_/g, "__").replace(/ /g, "_"));

function badge(opts: { label: string; href: string; color: string; logo: string; logoColor: string }): string {
  const src =
    `https://img.shields.io/badge/${shieldsText(opts.label)}-${hex(opts.color)}` +
    `?style=flat-square&logo=${opts.logo}&logoColor=${hex(opts.logoColor)}`;
  return `<a href="${opts.href}"><img src="${src}" alt="${opts.label}"></a>`;
}

/** 표 셀 안에서 깨지는 문자 정리 */
const cell = (s: string) => s.replace(/\r?\n/g, " ").replace(/\|/g, "\\|").trim();

export interface ProjectRow {
  repo: Repo;
  description: string;
  stack: string[];
}

/** overrides 의 키 순서대로, 나머지는 이름순으로 뒤에. */
export function projectRows(
  repos: Repo[],
  overrides: Record<string, ProjectOverride>,
  hidden: string[],
): ProjectRow[] {
  const order = Object.keys(overrides);
  const rank = (name: string) => {
    const i = order.indexOf(name);
    return i === -1 ? order.length : i;
  };
  return repos
    .filter((r) => !hidden.includes(r.name))
    .sort((a, b) => rank(a.name) - rank(b.name) || a.name.localeCompare(b.name))
    .map((repo) => {
      const o = overrides[repo.name];
      return {
        repo,
        description: o?.description ?? repo.description ?? "",
        stack: o?.stack ?? (repo.language ? [repo.language] : []),
      };
    });
}

function projectsTable(rows: ProjectRow[]): string {
  const lines = ["| 프로젝트 | 설명 | 스택 |", "| --- | --- | --- |"];
  for (const { repo, description, stack } of rows) {
    // 사이트 링크는 이름 칸을 넓히지 않도록 설명 끝에, 도메인을 글자로 드러내서 붙인다.
    const site = repo.homepage
      ? `[${repo.homepage.replace(/^https?:\/\//, "").replace(/\/$/, "")}](${repo.homepage})`
      : "";
    const desc = [cell(description), site].filter(Boolean).join(" — ");
    lines.push(`| [**${repo.name}**](${repo.url}) | ${desc || "—"} | ${cell(stack.join(" · ")) || "—"} |`);
  }
  return lines.join("\n");
}

export function renderProfile(
  org: string,
  content: Content,
  rows: ProjectRow[],
): string {
  const badges = [
    badge({
      label: "carol",
      href: `https://github.com/${org}/carol`,
      color: accent.accent,
      logo: "discord",
      logoColor: accent.accentInk,
    }),
    badge({
      label: "Discussions",
      href: `https://github.com/orgs/${org}/discussions`,
      color: background.surface2,
      logo: "github",
      logoColor: text.ink,
    }),
  ];

  const stack = [
    "| 영역 | 기술 |",
    "| --- | --- |",
    ...content.stack.map((g) => `| ${cell(g.area)} | ${cell(g.items.join(" · "))} |`),
  ].join("\n");

  return `<!--
  ${org} 조직 프로필 (https://github.com/${org})
  이 파일은 생성물입니다. 직접 고치지 말고 src/profile/content.ts 를 고친 뒤 \`npm run build\` 하세요.
  프로젝트 목록은 조직의 공개 레포에서, 배지 색은 @team-carol/design-system 토큰에서 옵니다.
-->

<h1 align="center">${content.title}</h1>

<p align="center">
  ${content.tagline}
</p>

<p align="center">
  ${badges.join("\n  ")}
</p>

## ABOUT

${content.about.map((p) => p.join("\n")).join("\n\n")}

## PROJECTS

${projectsTable(rows)}

## STACK

${stack}

## CONTRIBUTE

${content.contribute.map((l) => `- ${l}`).join("\n")}

---

<p align="center">
  <sub>${content.footer}</sub>
</p>
`;
}
