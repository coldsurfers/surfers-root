const path = require('node:path');
const fs = require('fs-extra');

/**
 * 주어진 경로를 입력받아 모든 node_modules 해석 경로를 반환합니다 (전역 포함 경로는 제외)
 * @param {string} p - 기준 경로
 * @returns {string[]} - node_modules 경로 목록
 */
function getNodeModulePaths(p) {
  const result = [];
  const paths = p.split(path.sep); // 경로를 디렉터리 단위로 분할
  while (paths.length) {
    result.push(path.join(paths.join(path.sep) || path.sep, 'node_modules')); // 현재 경로의 node_modules 경로 추가
    paths.pop(); // 상위 경로로 이동
  }
  return result;
}

/**
 * 지정된 경로에 심볼릭 링크 생성
 * @param {string} target - 대상 경로
 * @param {string} f - 링크를 생성할 위치
 * @param {string} type - 링크 타입 ('junction' 등)
 */
async function link(target, f, type) {
  await fs.ensureDir(path.dirname(f)); // 부모 디렉터리가 존재하지 않으면 생성
  await fs.symlink(target, f, type).catch((e) => {
    if (e.code === 'EEXIST' || e.code === 'EISDIR') {
      return; // 이미 존재하는 경우 무시
    }
    throw e; // 기타 오류 발생 시 예외 처리
  });
}

/**
 * 주어진 패키지를 찾아서 node_modules에 심볼릭 링크를 생성하는 함수 (재귀적으로 실행)
 * @param {string} name - 패키지명
 * @param {string} fromPath - 패키지를 찾을 기준 경로
 * @param {string} toPath - 링크를 생성할 node_modules 경로
 * @param {Set<string>} created - 이미 생성된 패키지 목록
 * @param {string[]} resolved - 이미 처리된 패키지 목록
 */
async function linkPackage(name, fromPath, toPath, created, resolved) {
  if (resolved.includes(name)) {
    return; // 이미 처리된 패키지는 중복 실행 방지
  }

  const paths = getNodeModulePaths(fromPath); // 해당 경로에서 node_modules 경로 목록 가져오기
  const pkg = require.resolve(`./${path.join(name, 'package.json')}`, { paths }); // 패키지 경로 찾기
  console.log(pkg); // 패키지 경로 출력
  const target = path.relative(path.join(toPath, path.dirname(name)), path.dirname(pkg)); // 상대 경로 계산

  if ((pkg.match(/node_modules/g) || []).length <= 1 && !created.has(name)) {
    created.add(name); // 생성된 패키지 목록에 추가
    await link(target, path.join(toPath, name), 'junction'); // 심볼릭 링크 생성
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { dependencies = {} } = require(pkg); // 해당 패키지의 dependencies 가져오기
  await Promise.all(
    Object.keys(dependencies).map((dep) =>
      linkPackage(dep, path.dirname(pkg), toPath, created, resolved.concat([name]))
    )
  ); // 의존성 패키지를 재귀적으로 처리
}

/**
 * 메인 실행 함수: 프로젝트 내의 dependencies를 순회하며 심볼릭 링크를 생성
 */
async function main() {
  const projectDir = path.resolve(__dirname, '../../'); // 프로젝트 최상위 경로
  const pkgPath = path.resolve(__dirname, '../../package.json'); // package.json 경로
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pkg = require(pkgPath); // package.json 파일 불러오기
  const { dependencies = {} } = pkg; // dependencies 목록 가져오기

  console.log('Creating dependency symlinks');
  const contents = new Set();
  await Promise.all(
    Object.keys(dependencies).map((name) =>
      linkPackage(name, projectDir, path.join(projectDir, 'node_modules'), contents, [])
    )
  ); // 모든 dependencies를 linkPackage로 처리
}

main(); // 스크립트 실행
