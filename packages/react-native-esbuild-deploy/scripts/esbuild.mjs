#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import * as babel from '@babel/core';
import esbuild from 'esbuild';
import glob from 'fast-glob';

const inputDir = 'src';
const outDir = 'build/.transpiled';
const entryFile = 'index.js'; // Babel transpiled entry

// Step 1: Clean output dir
await fs.rm(outDir, { recursive: true, force: true });
await fs.mkdir(outDir, { recursive: true });

// Step 2: Find all .tsx files
const files = await glob(`${inputDir}/**/*.{ts,tsx}`);

// Step 3: Transpile each file
await Promise.all(
  files.map(async (filePath) => {
    const relativePath = path.relative(inputDir, filePath);
    const outputPath = path.join(outDir, relativePath).replace(/\.tsx?$/, '.js');

    const { code } = await babel.transformFileAsync(filePath, {
      configFile: './babel.config.js',
      filename: filePath,
    });

    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, code);
  })
);

// Step 4: esbuild bundle
await esbuild.build({
  entryPoints: [path.join(outDir, entryFile)],
  bundle: true,
  platform: 'node', // or 'neutral'
  format: 'cjs', // 핵심 설정
  target: ['esnext'],
  outfile: 'build/out/index.bundle.js',
  external: [
    'react',
    'react-native',
    'react-native-reanimated',
    '@d11/react-native-fast-image',
    'react-native-gesture-handler',
    '@gorhom/bottom-sheet',
    '@tanstack/react-query',
  ],
  banner: { js: 'module.exports = {};' },
  define: {
    global: 'globalThis', // 👈 핵심!
  },
  // resolveDir: outDir, // 중요: 상대경로 기준 지정
});

console.log('✅ react-native-esbuild-deploy build complete.');
