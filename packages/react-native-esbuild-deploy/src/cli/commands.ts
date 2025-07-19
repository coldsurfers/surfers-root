#!/usr/bin/env node
import { Command, Option } from 'commander';
import { execa } from 'execa';
import pkg from '../../package.json';

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
  .action(async () => {
    console.log('run esbuild.mjs');
    await execa('rm', ['-rf', 'build/.transpiled']);
    await execa('rm', ['-rf', 'build/out']);
    await execa('node', ['./scripts/esbuild.mjs']);
  });

program.parse(process.argv);
