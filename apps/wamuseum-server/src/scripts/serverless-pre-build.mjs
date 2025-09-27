import { execSync } from 'node:child_process'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const runCommand = (command) => {
  try {
    console.log(`Running: ${command}`)
    execSync(command, { stdio: 'inherit' })
  } catch (error) {
    console.error(`Error executing: ${command}\n`, error)
    /**
     * skip process exit
     */
    // process.exit(1)
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

// node modules light layer
runCommand('mkdir -p .node-modules-layer-wamuseum-server-light/nodejs/node_modules')
runCommand('cp -r node_modules .node-modules-layer-wamuseum-server-light/nodejs')
// remove heavy modules
runCommand('rm -rf .node-modules-layer/nodejs/node_modules/date-fns')
runCommand('rm -rf .node-modules-layer/nodejs/node_modules/@graphql-codegen')
runCommand('rm -rf .node-modules-layer/nodejs/node_modules/@graphql-tools')
runCommand('rm -rf .node-modules-layer/nodejs/node_modules/@firebase')
runCommand('rm -rf .node-modules-layer/nodejs/node_modules/@babel')
runCommand('rm -rf .node-modules-layer/nodejs/node_modules/rxjs')
runCommand('rm -rf .node-modules-layer/nodejs/node_modules/@aws-sdk')
runCommand('rm -rf .node-modules-layer/nodejs/node_modules/@apollo')
runCommand('rm -rf .node-modules-layer/nodejs/node_modules/firebase-admin')
runCommand('rm -rf .node-modules-layer/nodejs/node_modules/web-streams-polyfill')

// node modules heavy layer
runCommand('mkdir -p .node-modules-layer-wamuseum-server-heavy/nodejs/node_modules')
runCommand('cp -r node_modules/date-fns .node-modules-layer-wamuseum-server-heavy/nodejs/node_modules')
runCommand('cp -r node_modules/@graphql-codegen .node-modules-layer-wamuseum-server-heavy/nodejs/node_modules')
runCommand('cp -r node_modules/@graphql-tools .node-modules-layer-wamuseum-server-heavy/nodejs/node_modules')
runCommand('cp -r node_modules/@firebase .node-modules-layer-wamuseum-server-heavy/nodejs/node_modules')
runCommand('cp -r node_modules/@babel .node-modules-layer-wamuseum-server-heavy/nodejs/node_modules')
runCommand('cp -r node_modules/rxjs .node-modules-layer-wamuseum-server-heavy/nodejs/node_modules')
runCommand('cp -r node_modules/@aws-sdk .node-modules-layer-wamuseum-server-heavy/nodejs/node_modules')
runCommand('cp -r node_modules/@apollo .node-modules-layer-wamuseum-server-heavy/nodejs/node_modules')
runCommand('cp -r node_modules/firebase-admin .node-modules-layer-wamuseum-server-heavy/nodejs/node_modules')
runCommand('cp -r node_modules/web-streams-polyfill .node-modules-layer-wamuseum-server-heavy/nodejs/node_modules')

// @img module layer
runCommand('mkdir -p .img-modules-layer/nodejs/node_modules')

runCommand('cp -r node_modules/@img .img-modules-layer/nodejs/node_modules')
