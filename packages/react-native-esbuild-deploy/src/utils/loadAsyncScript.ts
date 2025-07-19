import type { ReactNode } from 'react';
import RNFS from 'react-native-fs';
import { runScript } from './runScript';

const JS_CACHE_PATH = `${RNFS.DocumentDirectoryPath}`;

export const loadAsyncScript = async ({
  path,
  skipCache,
  bundleHostUrl,
}: {
  path: string;
  skipCache?: boolean;
  bundleHostUrl: string;
}): Promise<{
  SomeScreen: () => ReactNode;
}> => {
  const cachedUrl = `${JS_CACHE_PATH}${path}`;
  const exists = await RNFS.exists(cachedUrl);

  if (exists && !skipCache) {
    const cachedScriptText = await RNFS.readFile(cachedUrl, 'utf8');
    const result = runScript(cachedScriptText, cachedUrl);
    return result.exports.default;
  }

  const url = `${bundleHostUrl}${path}`;
  const response = await fetch(url);
  const scriptText = await response.text();
  const result = runScript(scriptText, url);

  await RNFS.writeFile(cachedUrl, scriptText, 'utf8');

  return result.exports.default;
};
