# Surfers Root

해당 레포는 [COLDSURF](https://coldsurf.io) 서비스를 만들기 위해 개발하고 있는 앱 및 웹 서비스와 패키지들이 합쳐져 있는 모노레포입니다.
pnpm workspace로 이루어져 있어요.
apps, packages, mini-apps로 워크스페이스가 분리되어 있어요.

## apps
apps의 구조에 대해 간략히 설명드릴게요.

```
apps/                   # 애플리케이션들
├── billets-app/        # RN 모바일 앱 (COLDSURF 앱)
├── billets-web/        # Nextjs 웹 앱 (COLDSURF 웹)
├── billets-server/     # Fastify + Prisma를 활용한 서버
├── billets-cron/       # 데이터를 주입하기 위한 supabase functions
├── wamuseum-client/    # 어드민 Nextjs 클라이언트
├── wamuseum-server/    # 어드민 GraphQL 서버
└── surf-tree/          # surf-tree
```

현재 운영하고 있는 서비스는 COLDSURF라는 웹과 앱 서비스 두개가 있어요.
또한, 데이터를 전달하고 여러 DB 상호작용을 하기 위한 Fastify 서버가 하나 띄워져 있어요.
웹 클라이언트와 서버는 모두 aws serverless와 lambda 기반으로 배포하고 있어요.

## packages
packages의 구조에 대해 간략히 설명드릴게요.

```
packages/               # 공유 패키지들
├── api-sdk/            # openapi-fetch와 openapi-typescript로 api 호출부를 관리해요.
├── ocean-road/         # UI 컴포넌트 라이브러리이자 일종의 디자인시스템 역할도 수행하고 있어요.
├── ocean-road-design-tokens/         # 디자인 토큰을 자동화하고 있어요.
├── shared-utils/       # 공통 유틸리티
├── prisma-schema/      # Prisma DB 스키마를 공통적으로 관리해요
├── react-native-esbuild-deploy/     # esbuild를 사용하여 RN 미니앱을 띄우기 위한 빌드과정을 거쳐요.
├── navigation-utils/   # 공통 네비게이션 타입을 관리해요.
├── db-migration/       # 자주 쓰는 db 마이그레이션 스크립트를 코드로 관리해요.
```

## mini-apps
mini-apps의 구조에 대해 간략히 설명드릴게요.

```
mini-apps/              # RN 마이크로 서비스를 담당하는 미니앱들이 들어있어요.
├── settings-mini-app/  # 실험용으로 만든 설정 페이지에 대한 미니앱이에요.
```

## Linting
린트는 biome를 사용하고 있어요. eslint보다 속도가 훨씬 빠르고, eslint 못지 않게 IDE 지원도 잘 되고 있는 것 같아 사용하고 있어요.

## Versions
버전 시스템은 changesets를 통해 관리하고 있어요.
배포 CI를 깃헙액션으로 돌리진 않지만, 태그 푸시는 필요했고 깃헙 릴리즈 노트 관리는 필요했어요.
따라서 main에 머지 되면, changesets를 통해 PR을 만들고 태그푸시해요.

## 📄 라이선스
이 프로젝트는 MIT 라이선스 하에 배포되고 있어요.
아직은 수익화를 하고 있지 않기에, 오픈소스로 공개하고 있어요.
