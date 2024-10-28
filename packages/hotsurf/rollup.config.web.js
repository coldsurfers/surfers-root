const typescript = require('rollup-plugin-typescript2')
const alias = require('@rollup/plugin-alias')
const path = require('path')

const projectRootDir = path.resolve(__dirname)

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.web.js',
      format: 'cjs',
    },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
    alias({
      find: 'react-native',
      replacement: path.resolve(projectRootDir, './alias.js'),
    }),
  ],
}
