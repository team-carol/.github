# `.github`

이 레포지토리는 **Carol** 조직의 기본값(default) 파일을 담습니다.
개별 레포에 같은 파일이 없을 때 GitHub 이 여기 있는 파일을 대신 사용합니다.

## 구조

```
.
├── profile/
│   ├── README.md              # 조직 프로필 페이지에 렌더링되는 내용
│   └── assets/                # 배너 등 프로필용 이미지
├── .github/
│   ├── ISSUE_TEMPLATE/        # 조직 전체 기본 이슈 템플릿
│   │   ├── bug_report.yml
│   │   ├── feature_request.yml
│   │   └── config.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── CONTRIBUTING.md            # 기여 가이드 (조직 전체 기본값)
├── CODE_OF_CONDUCT.md         # 행동 강령
├── SECURITY.md                # 보안 취약점 제보 절차
├── SUPPORT.md                 # 도움 요청 경로
└── FUNDING.yml → .github/FUNDING.yml
```

## 편집 방법

1. `profile/README.md` 의 `{{ ... }}` 자리표시자를 실제 값으로 교체합니다.
2. `profile/assets/banner-*.svg` 를 실제 배너 이미지로 교체합니다 (PNG/JPG 도 가능).
3. `main` 브랜치에 푸시하면 `https://github.com/team-carol` 페이지에 바로 반영됩니다.

## 참고

- 프로필 README 는 **공개(public)** `.github` 레포에서만 동작합니다.
- 프로필 페이지 렌더링에는 상대 경로(`./assets/...`)가 그대로 동작합니다.
- 조직 전체 기본값 파일 문서: <https://docs.github.com/communities>
