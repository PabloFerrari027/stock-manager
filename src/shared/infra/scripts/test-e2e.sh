DIR="$(cd "$(dirname "$0")" && pwd)"
source $DIR/setenv.sh
docker-compose --project-name maestro_dev -f docker/docker-compose.dev.yml up -d 
echo '🟡 - Waiting for database to be ready...'
$DIR/wait-for-it.sh "${POSTGRESQL_DATABASE_URL}" -- echo '🟢 - Database is ready!'
npx prisma generate --schema=./src/shared/infra/prisma/mongoDB/schema.prisma
npx prisma generate --schema=./src/shared/infra/prisma/postgreSQL/schema.prisma
npx prisma migrate deploy --schema=./src/shared/infra/prisma/postgreSQL/schema.prisma