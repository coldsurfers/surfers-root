// biome-ignore lint/suspicious/noRedundantUseStrict: <explanation>
'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const detectLibc = require('detect-libc');

const runtimeLibc = () => (detectLibc.isNonGlibcLinuxSync() ? detectLibc.familySync() : '');

const runtimePlatformArch = () => `${process.platform}${runtimeLibc()}-${process.arch}`;

console.log(runtimePlatformArch());
