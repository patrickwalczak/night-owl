import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
	schema: 'src/shared/lib/db/schema.prisma',
	migrations: {
		path: 'src/shared/lib/db/migrations',
	},
	datasource: {
		url: env('DATABASE_URL'),
	},
});
