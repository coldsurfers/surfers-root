const path = require('path')
const { getDefaultConfig } = require('@react-native/metro-config')
const { getConfig } = require('react-native-builder-bob/metro-config')
const pkg = require('../package.json')
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks')
const { makeMetroConfig } = require('@rnx-kit/metro-config')

const root = path.resolve(__dirname, '..')
const monorepoRoot = path.resolve(root, '../../')

const config = makeMetroConfig({
  resolver: {
    resolveRequest: MetroSymlinksResolver(),
    nodeModulesPaths: [path.resolve(root, 'node_modules'), path.resolve(monorepoRoot, 'node_modules')],
  },
})
/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
module.exports = config
// module.exports = getConfig(defaultConfig, {
//   root,
//   pkg,
//   project: __dirname,
// });
