import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    entry: ['src/cli/commands.ts'],
    format: ['esm', 'cjs'],
    outDir: 'build/cli',
    dts: true,
    shims: true,
  },
]);
