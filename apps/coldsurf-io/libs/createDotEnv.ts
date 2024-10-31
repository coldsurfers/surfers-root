/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const fs = require('fs')

function createDotEnv() {
  const targetPath = path.resolve(__dirname, '../.env.local')
  const targetEnvnames = [
    'SITE_URL',
    'GOOGLE_OAUTH_CLIENT_ID',
    'GOOGLE_OAUTH_CLIENT_SECRET',
    'AUTH_SECRET',
    'BASE_URL',
    'NOTION_DATABASE_ID',
    'NOTION_TOKEN',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
    'TOSS_PAYMENTS_CLIENT_KEY',
    'TOSS_PAYMENTS_CLIENT_SECRET',
  ]
  let targetData = ''
  targetEnvnames.forEach((envname, index) => {
    const targetEnvValue = process.env[envname]
    if (index === 0) {
      targetData += `${envname}=${targetEnvValue ?? ''}`
    } else {
      targetData += `\n${envname}=${targetEnvValue ?? ''}`
    }
  })
  fs.writeFileSync(targetPath, targetData)
}

createDotEnv()
