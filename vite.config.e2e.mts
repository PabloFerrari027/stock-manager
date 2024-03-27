import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.development' });

export default defineConfig({
	test: {
		include: ['src/**/*.e2e.spec.ts'],
		exclude: ['src/**/*.unit.spec.ts'],
		setupFiles: ['./src/shared/tests/setupE2E.ts'],
		poolOptions: {
			threads: {
				singleThread: true,
			},
		},
		testTimeout: 30 * 1000,
		env: {
			NODE_ENV: 'test-e2e',
		},
	},
	plugins: [tsconfigPaths()],
});
