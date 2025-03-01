// https://github.com/callstack/repack/blob/2390ead8ae0da12f7af59422b4de6b6162acf635/apps/tester-federation-v2/rspack.config.host-app.mjs
// @ts-check
import * as Repack from '@callstack/repack'
import { ReanimatedPlugin } from '@callstack/repack-plugin-reanimated'
import rspack from '@rspack/core'
import path from 'node:path'

const dirname = Repack.getDirname(import.meta.url)

/** @type {(env: import('@callstack/repack').EnvOptions) => import('@rspack/core').Configuration} */
export default (env) => {
  const {
    mode = 'development',
    context = dirname,
    entry = './index.js',
    platform = process.env.PLATFORM,
    minimize = mode === 'production',
    devServer = undefined,
    bundleFilename = undefined,
    sourceMapFilename = undefined,
    assetsPath = undefined,
  } = env

  if (!platform) {
    throw new Error('Missing platform')
  }

  process.env.BABEL_ENV = mode

  return {
    mode,
    devtool: false,
    context,
    entry,
    resolve: {
      ...Repack.getResolveOptions(platform),
      alias: {
        'react': new URL('../../node_modules/react', import.meta.url).pathname,
        '@coldsurfers/ocean-road/native': new URL('../../packages/ocean-road/src/native/index.ts', import.meta.url)
          .pathname,
        '@/screens': new URL('./src/screens', import.meta.url).pathname,
        '@/navigations': new URL('./src/navigations', import.meta.url).pathname,
        '@/lib': new URL('./src/lib', import.meta.url).pathname,
        '@/ui': new URL('./src/ui', import.meta.url).pathname,
        '@/features': new URL('./src/features', import.meta.url).pathname,
        '@/types': new URL('./src/types', import.meta.url).pathname,
        'assets': new URL('./assets', import.meta.url).pathname,
      },
    },
    output: {
      clean: true,
      hashFunction: 'xxhash64',
      path: path.join(dirname, 'build', 'host-app', platform),
      filename: 'index.bundle',
      chunkFilename: '[name].chunk.bundle',
      publicPath: Repack.getPublicPath({ platform, devServer }),
      uniqueName: 'BilletsApp',
    },
    optimization: {
      minimize,
      chunkIds: 'named',
    },
    module: {
      rules: [
        Repack.REACT_NATIVE_LOADING_RULES,
        Repack.NODE_MODULES_LOADING_RULES,
        Repack.FLOW_TYPED_MODULES_LOADING_RULES,
        {
          test: /\.[jt]sx?$/,
          type: 'javascript/auto',
          exclude: [/node_modules/],
          use: {
            loader: 'builtin:swc-loader',
            options: {
              env: {
                targets: { 'react-native': '0.75.3' },
              },
              jsc: {
                assumptions: {
                  setPublicClassFields: true,
                  privateFieldsAsProperties: true,
                },
                externalHelpers: true,
                transform: {
                  react: {
                    runtime: 'automatic',
                  },
                },
              },
            },
          },
        },
        {
          test: Repack.getAssetExtensionsRegExp(Repack.ASSET_EXTENSIONS),
          use: {
            loader: '@callstack/repack/assets-loader',
            options: {
              platform,
              devServerEnabled: Boolean(devServer),
            },
          },
        },
        {
          test: /\.(js|jsx)$/, // JavaScript 및 JSX 파일 처리
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader', // Babel을 Webpack에서 사용
            options: {
              configFile: './babel.config.js', // babel.config.js 사용
            },
          },
        },
      ],
    },
    plugins: [
      new Repack.RepackPlugin({
        context,
        mode,
        platform,
        devServer,
        output: {
          bundleFilename,
          sourceMapFilename,
          assetsPath,
        },
      }),
      // silence missing @react-native-masked-view optionally required by @react-navigation/elements
      new rspack.IgnorePlugin({
        resourceRegExp: /^@react-native-masked-view/,
      }),
      new ReanimatedPlugin(),
    ],
  }
}
