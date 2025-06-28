module.exports = {
  apps: [
    {
      name: 'wamuseum-client',
      script: 'server.js',
      cwd: '.next/standalone/apps/wamuseum-client', // Set working directory to the standalone output
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
