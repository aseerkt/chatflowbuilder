import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      include: ['src/**/*.test.tsx'],
      setupFiles: ['./src/setup-vitest.ts'],
      coverage: {
        include: ['src/**'],
      },
    },
  }),
)
