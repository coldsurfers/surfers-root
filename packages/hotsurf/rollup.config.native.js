/* eslint-disable @typescript-eslint/no-var-requires */
const typescript = require('rollup-plugin-typescript2')

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
    },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
  ],
}
