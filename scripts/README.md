# scripts

## `gen-assets.js`

`profile/assets/*.svg` (히어로 배너 + 프로젝트 카드) 를 생성합니다.
carol 디자인 시스템([`carol/docs/DESIGN.md`](https://github.com/team-carol/carol/blob/main/docs/DESIGN.md))
팔레트로 satori 렌더 → **모든 글리프를 `<path>` 로 아웃라인**하므로 SVG 에 폰트 의존성이 없고
GitHub 에서 뷰어 환경과 무관하게 동일하게 보입니다.

```bash
npm i satori @resvg/resvg-js
node scripts/gen-assets.js
```

- 폰트(Pretendard, JetBrains Mono)는 첫 실행 시 `scripts/.fonts/` 로 자동 다운로드됩니다. (git 무시)
- 카드 문구·색을 바꾸려면 `gen-assets.js` 의 `CARDS` 객체와 `banner()` 를 수정 후 재실행하세요.
