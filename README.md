# net-hbkr-status-static

HBKR **STATUS**의 GitHub Pages용 독립 prototype 저장소입니다.

- Production review URL: https://status.hbkr.net/
- Repository type: `static`
- Current implementation: static interactive prototype
- Backend, database, authentication, payment, live API: not connected

## Product boundary

HBKR 공개 프로토타입 endpoint의 도달 가능성을 확인하는 정적 상태 페이지.

화면의 인물, 프로젝트, 상태와 수치는 정보 구조 검토용 sample이며 실제 운영 사실을 의미하지 않습니다.

## Local preview

```bash
npm run check
npm run dev
```

## Deployment

`main`에 push하면 GitHub Actions가 GitHub Pages로 배포합니다. Custom domain은 `status.hbkr.net`입니다.
