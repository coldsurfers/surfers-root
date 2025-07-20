#!/usr/bin/env node

import { runEsbuild } from './esbuild.core.mjs';

// --- CLI 인자 파싱 ---
const args = process.argv.slice(2);
let outfileArg = '';
const outfileIndex = args.indexOf('--out-file');
if (outfileIndex !== -1 && args[outfileIndex + 1]) {
  outfileArg = args[outfileIndex + 1];
}

runEsbuild({ outfile: outfileArg });
