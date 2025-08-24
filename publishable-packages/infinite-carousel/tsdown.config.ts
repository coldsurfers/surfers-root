import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    outDir: 'dist',
    dts: true,
    external: [
      'framer-motion',
      'lucide-react',
      '@emotion/react',
      '@emotion/styled',
      '@emotion/css',
      '@coldsurfers/ocean-road',
      '@coldsurfers/ocean-road-design-tokens',
      'react',
      'react-dom',
    ],
  },
]);
