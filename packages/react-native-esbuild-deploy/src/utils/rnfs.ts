import RNFS from 'react-native-fs';

export async function ensureDirAndWriteFile(filePath: string, content: string) {
  const dirPath = filePath.substring(0, filePath.lastIndexOf('/')); // 디렉토리 경로 추출

  try {
    const exists = await RNFS.exists(dirPath);

    if (!exists) {
      console.log('📂 디렉토리 없음 → 생성', dirPath);
      await RNFS.mkdir(dirPath);
    }

    await RNFS.writeFile(filePath, content, 'utf8');
    console.log('✅ 파일 저장 완료:', filePath);
  } catch (err) {
    console.error('❌ 파일 저장 실패:', err);
  }
}
