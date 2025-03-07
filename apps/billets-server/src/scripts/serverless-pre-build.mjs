import { execSync } from 'child_process'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const runCommand = (command) => {
  try {
    console.log(`Running: ${command}`)
    execSync(command, { stdio: 'inherit' })
  } catch (error) {
    console.error(`Error executing: ${command}\n`, error)
    process.exit(1)
  }
}

// Execute commands sequentially
runCommand('pnpm install:sharp')
runCommand('pnpm build')
runCommand('node ./src/scripts/serverless-monorepo.js')
runCommand('pnpm prisma:generate')

// prisma layer
runCommand('mkdir -p .prisma-layer/nodejs/node_modules/.prisma')
runCommand('mkdir -p .prisma-layer/nodejs/node_modules/@prisma')

runCommand('cp -r ../../node_modules/.prisma .prisma-layer/nodejs/node_modules')
runCommand('cp -r node_modules/@prisma .prisma-layer/nodejs/node_modules')

// node modules layer
runCommand('mkdir -p .node-modules-layer/nodejs/node_modules')

runCommand('cp -r node_modules .node-modules-layer/nodejs')

// @img module layer
runCommand('mkdir -p .img-modules-layer/nodejs/node_modules')

runCommand('cp -r node_modules/@img .img-modules-layer/nodejs/node_modules')
