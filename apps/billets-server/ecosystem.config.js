module.exports = {
  apps: [
    {
      name: 'billets-server',
      script: 'start-server.js',
      cwd: 'dist/src', // Set working directory to the standalone output
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
