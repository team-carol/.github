# `.github`

이 레포지토리는 **team-carol** 조직의 기본값(default) 파일을 담습니다.
개별 레포에 같은 파일이 없을 때 GitHub 이 여기 있는 파일을 대신 사용합니다.

## 구조

```
.
├── profile/
│   ├── README.md              # 조직 프로필 페이지에 렌더링되는 내용
│   └── assets/                # banner-*.svg (히어로) · card-*.svg (프로젝트 카드)
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

1. `profile/README.md` 내용은 조직 레포를 읽어 채워두었습니다. 갱신 시 이 파일을 수정합니다.
2. `profile/assets/*.svg` 는 [`carol/docs/DESIGN.md`](https://github.com/team-carol/carol/blob/main/docs/DESIGN.md)
   팔레트(canvas `#0d0d0d` · accent `#9333ea`/`#c084fc`)로 만든 SVG 입니다.
   프로젝트가 바뀌면 `card-*.svg` 의 텍스트/좌측 accent 색만 고치면 됩니다.
3. GitHub README 는 `<style>`·웹폰트가 막혀서 폰트는 시스템 폴백입니다.
   (SVG 안에서 Inter/JetBrains Mono 를 못 불러옵니다.)
4. `main` 브랜치에 푸시하면 `https://github.com/team-carol` 페이지에 바로 반영됩니다.
5. `SECURITY.md` · `CODE_OF_CONDUCT.md` 의 신고 연락처는 조직에 맞게 채워주세요.

## 참고

- 프로필 README 는 **공개(public)** `.github` 레포에서만 동작합니다.
- 프로필 페이지 렌더링에는 상대 경로(`./assets/...`)가 그대로 동작합니다.
- 조직 전체 기본값 파일 문서: <https://docs.github.com/communities>
