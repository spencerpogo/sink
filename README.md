# sink

Work-in-progress web app for time tracking.

It should:

- be as automatic as possible, but still have powerful manual tracking
- have tag and hierarchy based tracking
- have good analytics and data export
- be easily self-hostable

## Tech-stack

Backend:

- Typescript + Node.JS
- Express
- GraphQL API with `type-graphql`
- SQLite database with `typeorm` and `better-sqlite3`

Frontend:

- Typescript + React
- Chakra UI

## Roadmap:

- [ ] MVP
- [ ] Calendar view of tasks
- [ ] Open-window tracker
- [ ] Firefox extension
- [ ] WakaTime integration

## Development

### Backend (API)

1. Open the `api` directory.
2. Install dependencies with `yarn install`.
3. Create a `.env` file something like this:

```sh
export HOST=127.0.0.1
export PORT=8080
export SESSION_SECRET=xxx
export REDIS_HOST=localhost
export REDIS_PORT=6379
export GITHUB_CLIENT_ID=xxx
export GITHUB_CLIENT_SECRET=xxx
export DATABASE_FILENAME=./db.sqlite

TYPEORM_CONNECTION=better-sqlite3
TYPEORM_DATABASE=./db.sqlite
TYPEORM_SYNCHRONIZE=false
TYPEORM_LOGGING=true
TYPEORM_ENTITIES=dist/src/models/*.js
TYPEORM_MIGRATIONS=dist/src/migrations/*.js
TYPEORM_MIGRATIONS_DIR=src/migrations
```

You'll need to fill in `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`, which you can
[generate on GitHub.com](https://github.com/settings/apps).

4. In one terminal, `yarn watch`, and in another `source .env && yarn dev`.

### Frontend

1. Open the `frontend` directory.
2. Install dependencies with `yarn install`
3. Configure the API URL with `export NEXT_PUBLIC_API_URL=http://127.0.0.1:8080` or
   wherever you are hosting the API
4. Start development server with `yarn dev`
