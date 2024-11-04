/* eslint-disable @typescript-eslint/no-var-requires */
const { babel } = require('@rollup/plugin-babel')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const peerDepsExternal = require('rollup-plugin-peer-deps-external')
const css = require('rollup-plugin-import-css')
const json = require('@rollup/plugin-json')
const pkg = require('./package.json')

const extensions = ['.js', '.jsx', '.ts', '.tsx']

const config = {
  input: './src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'esm',
    },
  ],
  plugins: [
    peerDepsExternal(),
    nodeResolve({
      extensions,
    }),
    babel({
      extensions,
      babelHelpers: 'bundled',
      presets: ['@babel/preset-typescript', ['@babel/preset-react', { runtime: 'automatic' }]],
    }),
    css(),
    json(),
  ],
}

module.exports = config
