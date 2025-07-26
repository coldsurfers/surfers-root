#!/usr/bin/env node
import path from 'node:path';
import { Command, Option } from 'commander';
import { execa } from 'execa';
import pkg from '../../package.json';

type BuildOptions = {
  outFile: string;
};

const { version: pkgVersion } = pkg;

const program = new Command();

program
  .command('version')
  .description('Reveal the version of package')
  .action(() => {
    console.log(`Current version is ${pkgVersion}`);
  });

program
  .command('build')
  .description('build react native with esbuild')
  .addOption(new Option('-o, --out-file <out-file>', 'The out file to bundle the code for'))
  .action(async (options: BuildOptions) => {
    if (!options.outFile) {
      throw Error('out file option (-o, --out-file) is required');
    }
    console.log('run esbuild.mjs');
    const esbuildCliMjs = path.resolve(__dirname, '../../scripts/esbuild.cli.mjs');
    await execa('rm', ['-rf', 'build/.transpiled']);
    await execa('rm', ['-rf', 'build/out']);
    await execa('node', [esbuildCliMjs, '--out-file', options.outFile]);
  });

program.parse(process.argv);
