# `.github`

이 레포지토리는 **team-carol** 조직의 기본값(default) 파일을 담습니다.
개별 레포에 같은 파일이 없을 때 GitHub 이 여기 있는 파일을 대신 사용합니다.

## 구조

```
.
├── profile/
│   └── README.md              # 조직 프로필 페이지에 렌더링되는 내용 (생성물, 마크다운만)
├── src/profile/               # 프로필 생성기 (TypeScript)
│   ├── content.ts             # 소개 글 · 프로젝트 설명/스택/순서 — 사람이 고치는 파일
│   ├── github.ts              # 조직의 공개 레포 목록 읽기
│   ├── render.ts              # 마크다운 조립, 배지 색은 디자인 시스템 토큰
│   └── build.ts               # 실행 진입점 (--check 지원)
├── .github/
│   ├── ISSUE_TEMPLATE/        # 조직 전체 기본 이슈 템플릿
│   │   ├── bug_report.yml
│   │   ├── feature_request.yml
│   │   └── config.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── CONTRIBUTING.md            # 기여 가이드 (조직 전체 기본값)
├── CODE_OF_CONDUCT.md         # 행동 강령
├── SECURITY.md                # 보안 취약점 제보 절차
└── SUPPORT.md                 # 도움 요청 경로
```

## 편집 방법

1. `profile/README.md` 는 **생성물**입니다. 직접 고치지 말고 `src/profile/content.ts` 를 고친 뒤 다시 만듭니다.

   ```bash
   npm ci
   npm run build      # profile/README.md 다시 쓰기
   npm run check      # 쓰지 않고 최신인지 확인만
   ```

   - 프로젝트 표는 조직의 **공개 레포** 목록(GitHub API)에서 나옵니다. 비공개·보관·포크 레포는 빠집니다.
     `content.ts` 에 없는 새 공개 레포는 GitHub 설명과 주 언어로 자동으로 들어갑니다.
   - 정보는 전부 글자로 나갑니다(검색·에이전트가 읽을 수 있게). 이미지는 맨 위 링크 배지뿐이고,
     색은 [`@team-carol/design-system`](https://github.com/team-carol/carol-design-system) 토큰에서 가져옵니다.
   - Node 22.18 이상이 TypeScript 를 바로 실행하므로 별도 컴파일 단계가 없습니다.
2. `main` 브랜치에 푸시하면 `https://github.com/team-carol` 페이지에 바로 반영됩니다.
   `profile` 워크플로가 푸시 · 매일 · 수동 실행 때 README 를 다시 만들고, 달라졌을 때만 커밋합니다.
3. `SECURITY.md` · `CODE_OF_CONDUCT.md` 의 신고 연락처는 조직에 맞게 채워주세요.

## 참고

- 프로필 README 는 **공개(public)** `.github` 레포에서만 동작합니다.
- 조직 전체 기본값 파일 문서: <https://docs.github.com/communities>
