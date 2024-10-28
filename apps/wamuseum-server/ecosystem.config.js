module.exports = {
  apps: [
    {
      name: 'wamuseum-server',
      script: 'start-server.js',
      cwd: 'dist/src', // Set working directory to the standalone output
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
