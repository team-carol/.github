// 조직의 공개 레포 목록을 GitHub API 에서 읽는다.

export interface Repo {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  homepage: string | null;
}

interface ApiRepo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  homepage: string | null;
  private: boolean;
  visibility?: string;
  archived: boolean;
  fork: boolean;
}

/**
 * 공개 레포만 돌려준다. 토큰이 비공개 레포를 볼 수 있어도 프로필에 새지 않도록
 * 요청(type=public)과 응답(private / visibility) 양쪽에서 거른다.
 */
export async function fetchPublicRepos(org: string): Promise<Repo[]> {
  const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
  const headers: Record<string, string> = {
    accept: "application/vnd.github+json",
    "x-github-api-version": "2022-11-28",
    "user-agent": "org-profile-generator",
  };
  if (token) headers.authorization = `Bearer ${token}`;

  const repos: Repo[] = [];
  for (let page = 1; ; page++) {
    const res = await fetch(
      `https://api.github.com/orgs/${org}/repos?type=public&per_page=100&page=${page}`,
      { headers },
    );
    if (!res.ok) {
      throw new Error(`GitHub API ${res.status} ${res.statusText}: ${(await res.text()).slice(0, 200)}`);
    }
    const batch = (await res.json()) as ApiRepo[];
    for (const r of batch) {
      if (r.private || (r.visibility !== undefined && r.visibility !== "public")) continue;
      if (r.archived || r.fork) continue;
      repos.push({
        name: r.name,
        url: r.html_url,
        description: r.description?.trim() || null,
        language: r.language,
        homepage: r.homepage?.trim() || null,
      });
    }
    if (batch.length < 100) break;
  }
  return repos;
}
