module.exports = {
  apps: [
    {
      name: 'billets-web',
      script: 'server.js',
      cwd: '.next/standalone/apps/billets-web', // Set working directory to the standalone output
      env: {
        NODE_ENV: 'production',
        PORT: 4001,
      },
    },
  ],
}
