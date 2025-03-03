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
runCommand('rm -rf ./node_modules/prisma/libquery_engine-rhel-openssl-3.0.x.so.node')
runCommand('rm -rf ./node_modules/prisma/libquery_engine-darwin-arm64.dylib.node')
runCommand('rm -rf ./node_modules/.prisma')
runCommand(`cp -R ${__dirname}/../../../../node_modules/.prisma ./node_modules/.prisma`)
runCommand('rm -rf ./node_modules/.prisma/client/libquery_engine-rhel-openssl-3.0.x.so.node')
runCommand('rm -rf ./node_modules/.prisma/client/libquery_engine-darwin-arm64.dylib.node')
runCommand('rm -rf ./node_modules/prisma/libquery_engine-rhel-openssl-1.0.x.so.node')
runCommand('rm -rf ./package')
runCommand('zip -r build.zip ./build package.json serverless.yml node_modules')
