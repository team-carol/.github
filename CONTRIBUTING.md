# 기여 가이드

Carol 프로젝트에 관심 가져주셔서 감사합니다. 이 문서는 조직 전체의 기본 기여 절차입니다.
개별 레포에 별도의 `CONTRIBUTING.md` 가 있으면 그쪽을 우선합니다.

## 시작하기 전에

- [행동 강령](./CODE_OF_CONDUCT.md)을 읽고 동의해주세요.
- 큰 변경은 먼저 이슈나 Discussion 으로 논의해주세요.

## 개발 흐름

1. 레포를 포크하고 브랜치를 만듭니다: `git checkout -b feat/짧은-설명`
2. 변경 후 커밋합니다. 커밋 메시지는 [Conventional Commits](https://www.conventionalcommits.org/) 권장:
   - `feat:` 새 기능 · `fix:` 버그 수정 · `docs:` 문서 · `refactor:` 리팩터링 · `test:` 테스트 · `chore:` 기타
3. 테스트와 린트를 통과시킵니다.
4. PR 을 엽니다. 템플릿의 체크리스트를 채워주세요.

## PR 리뷰 기준

- 하나의 PR 은 하나의 목적만 담습니다.
- 동작 변경에는 테스트를 함께 추가합니다.
- 공개 API 변경 시 문서를 업데이트합니다.

## 질문

[Discussions](https://github.com/orgs/team-carol/discussions) 에 남겨주세요.
