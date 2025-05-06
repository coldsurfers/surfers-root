import semver from 'semver'

export function compareVersion(version1: string, version2: string) {
  return semver.compare(version1, version2)
}
