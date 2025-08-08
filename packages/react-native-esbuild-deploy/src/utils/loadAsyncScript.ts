import RNFS from 'react-native-fs';
import { ensureDirAndWriteFile } from './rnfs';
import { runScript } from './runScript';

const JS_CACHE_PATH = `${RNFS.DocumentDirectoryPath}`;

export const loadAsyncScript = async <T>({
  path,
  skipCache,
  bundleHostUrl,
}: {
  path: string;
  skipCache?: boolean;
  bundleHostUrl: string;
}): Promise<T> => {
  const cachedUrl = `${JS_CACHE_PATH}${path}`;
  try {
    const exists = await RNFS.exists(cachedUrl);

    if (exists && !skipCache) {
      const cachedScriptText = await RNFS.readFile(cachedUrl, 'utf8');
      const result = runScript<T>(cachedScriptText, cachedUrl);
      return result.exports.default;
    }
  } catch (e) {
    console.error(e);
  }

  const url = `${bundleHostUrl}${path}`;
  const response = await fetch(url);
  const scriptText = await response.text();
  const result = runScript<T>(scriptText, url);

  try {
    ensureDirAndWriteFile(cachedUrl, scriptText);
  } catch (e) {
    console.error(e);
  }

  return result.exports.default;
};
