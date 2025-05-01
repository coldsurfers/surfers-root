import { defineConfig } from 'tsup'

export default defineConfig({
  entry: process.env.NODE_ENV === 'development' ? ['src/start-server.ts'] : ['src/lambda.ts'],
  outDir: 'build',
  target: 'node18',
  platform: 'node',
  format: ['cjs'],
  // clean: true,
  // watch: true,
  splitting: false,
  sourcemap: true,
  minify: false,
  shims: false,
  dts: true,
})
