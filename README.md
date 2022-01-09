# sink

Web app to track where your time goes

Dev `api/.env` file:

```sh
export HOST=127.0.0.1
export PORT=8080
export SESSION_SECRET=xxx
export REDIS_HOST=localhost
export REDIS_PORT=6379
export GITHUB_CLIENT_ID=xxx
export GITHUB_CLIENT_SECRET=xxx

TYPEORM_CONNECTION=better-sqlite3
TYPEORM_DATABASE=./db.sqlite
TYPEORM_SYNCHRONIZE=false
TYPEORM_LOGGING=true
TYPEORM_ENTITIES=dist/src/models/*.js
TYPEORM_MIGRATIONS=dist/src/migrations/*.js

#export TYPEORM_HOST=localhost
#export TYPEORM_USERNAME=root
#export TYPEORM_PASSWORD=admin
#export TYPEORM_PORT=3000
```
