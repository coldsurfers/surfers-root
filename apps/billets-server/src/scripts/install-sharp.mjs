import fetch from 'node-fetch'
import fs from 'node:fs'
import path from 'node:path'
import * as tar from 'tar'
// import sharpPkg from '../../../../node_modules/.pnpm/sharp@0.33.5/node_modules/sharp/package.json' with { type: 'json' }
import sharpPkg from '../../../../node_modules/sharp/package.json' with { type: 'json' }

const npmJsTarballHost = 'https://registry.npmjs.org'
const __dirname = import.meta.dirname

async function installSharpLinux() {
  const { optionalDependencies } = sharpPkg
  const sharpLinuxX64Version = optionalDependencies['@img/sharp-linux-x64']
  const sharpLibvipsLinuxX64Version = optionalDependencies['@img/sharp-libvips-linux-x64']

  const urlsToFetch = [
    `${npmJsTarballHost}/@img/sharp-linux-x64/-/sharp-linux-x64-${sharpLinuxX64Version}.tgz`,
    `${npmJsTarballHost}/@img/sharp-libvips-linux-x64/-/sharp-libvips-linux-x64-${sharpLibvipsLinuxX64Version}.tgz`,
  ]

  const tarballBuffers = await Promise.all(
    urlsToFetch.map(async (url, index) => {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch tarball: ${response.statusText}`)
      }

      // Create a buffer from the response
      const tarballBuffer = await response.buffer()
      return {
        tarballBuffer,
        moduleName: index === 0 ? '@img/sharp-linux-x64' : '@img/sharp-libvips-linux-x64',
      }
    }),
  )

  tarballBuffers.map(({ tarballBuffer, moduleName }) => {
    // Create a stream from the buffer and extract the desired file
    const extractStream = tar.extract({
      //   filter: (path) => path.endsWith(targetFileName), // Only extract the desired file
      onentry: (entry) => {
        console.log(`Extracting: ${entry.path}`)
      },
    })

    // Pipe the tarball buffer to the tar extract stream
    extractStream.on('entry', (entry) => {
      const outputPath = path.resolve(__dirname, `../../node_modules/${moduleName}`, entry.path.replace('package/', ''))
      if (!fs.existsSync(path.dirname(outputPath))) {
        fs.mkdirSync(path.dirname(outputPath), { recursive: true })
      }
      const writeStream = fs.createWriteStream(outputPath)
      entry.pipe(writeStream)
      console.log(`Saved file: ${outputPath}`)
    })

    extractStream.end(tarballBuffer)
  })
}

installSharpLinux()
