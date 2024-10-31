module.exports = {
  apps: [
    {
      name: 'coldsurf-io',
      script: 'server.js',
      cwd: '.next/standalone/apps/coldsurf-io', // Set working directory to the standalone output
      env: {
        NODE_ENV: 'production',
        PORT: 4001,
      },
    },
  ],
}
