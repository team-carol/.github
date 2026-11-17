// profile/README.md 를 만든다.
//   node src/profile/build.ts          → 파일을 쓴다
//   node src/profile/build.ts --check  → 쓰지 않고, 커밋된 파일이 낡았으면 exit 1

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { ORG, content, hidden, projects } from "./content.ts";
import { fetchPublicRepos } from "./github.ts";
import { projectRows, renderProfile } from "./render.ts";

const OUT = fileURLToPath(new URL("../../profile/README.md", import.meta.url));
const check = process.argv.includes("--check");

const repos = await fetchPublicRepos(ORG);
if (repos.length === 0) throw new Error(`${ORG} 의 공개 레포를 하나도 못 읽었습니다. 쓰지 않고 멈춥니다.`);

const rows = projectRows(repos, projects, hidden);
const next = renderProfile(ORG, content, rows);

const names = new Set(repos.map((r) => r.name));
for (const name of Object.keys(projects)) {
  if (!names.has(name)) console.warn(`경고: content.ts 의 "${name}" 은 공개 레포가 아니라 표에서 빠졌습니다.`);
}
for (const { repo } of rows) {
  if (!(repo.name in projects)) console.warn(`알림: "${repo.name}" 은 content.ts 에 없어 GitHub 설명·언어로 채웠습니다.`);
}

const prev = (await readFile(OUT, "utf8").catch(() => "")).replace(/\r\n/g, "\n");
if (prev === next) {
  console.log(`profile/README.md 최신 (프로젝트 ${rows.length}개)`);
} else if (check) {
  console.error("profile/README.md 가 낡았습니다. `npm run build` 후 커밋하세요.");
  const a = prev.split("\n");
  const b = next.split("\n");
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (a[i] === b[i]) continue;
    if (a[i] !== undefined) console.error(`- ${a[i]}`);
    if (b[i] !== undefined) console.error(`+ ${b[i]}`);
  }
  process.exitCode = 1;
} else {
  await writeFile(OUT, next);
  console.log(`profile/README.md 갱신 (프로젝트 ${rows.length}개)`);
}
