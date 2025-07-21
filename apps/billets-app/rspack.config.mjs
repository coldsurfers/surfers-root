import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as Repack from '@callstack/repack';
import { ReanimatedPlugin } from '@callstack/repack-plugin-reanimated';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Rspack configuration enhanced with Re.Pack defaults for React Native.
 *
 * Learn about Rspack configuration: https://rspack.dev/config/
 * Learn about Re.Pack configuration: https://re-pack.dev/docs/guides/configuration
 */

/** @type {(env: import('@callstack/repack').EnvOptions) => import('@rspack/core').Configuration} */
export default (env) => {
  const { platform = process.env.PLATFORM, mode = 'development' } = env;

  if (!platform) {
    throw new Error('Missing platform');
  }

  console.log('platform', platform);
  console.log('mode', mode);

  process.env.BABEL_ENV = mode;

  return {
    mode,
    output: {
      path: path.resolve(__dirname, 'build/generated', platform),
    },
    context: __dirname,
    entry: './index.js',
    resolve: {
      ...Repack.getResolveOptions(platform),
      alias: {
        react: new URL('../../node_modules/react', import.meta.url).pathname,
        '@coldsurfers/ocean-road/native': new URL(
          '../../packages/ocean-road/src/native/index.ts',
          import.meta.url
        ).pathname,
        '@/screens': new URL('./src/screens', import.meta.url).pathname,
        '@/navigations': new URL('./src/navigations', import.meta.url).pathname,
        '@/lib': new URL('./src/lib', import.meta.url).pathname,
        '@/ui': new URL('./src/ui', import.meta.url).pathname,
        '@/features': new URL('./src/features', import.meta.url).pathname,
        '@/types': new URL('./src/types', import.meta.url).pathname,
        assets: new URL('./assets', import.meta.url).pathname,
      },
    },
    module: {
      rules: [
        ...Repack.getJsTransformRules(),
        ...Repack.getAssetTransformRules(),
        {
          type: 'javascript/auto',
          test: /(@hot-updater|hot-updater)/,
          use: {
            loader: 'babel-loader', // Babel을 Webpack에서 사용
            options: {
              babelrc: false,
              configFile: false,
              presets: ['module:@react-native/babel-preset'],
              plugins: ['hot-updater/babel-plugin'],
            },
          },
        },
      ],
    },
    plugins: [new Repack.RepackPlugin(), new ReanimatedPlugin()],
    // devServer: {
    //   host: platform === 'ios' ? '0.0.0.0' : 'localhost',
    // },
  };
};
