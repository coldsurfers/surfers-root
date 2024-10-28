module.exports = {
  apps: [
    {
      name: 'blog-client',
      script: 'server.js',
      cwd: '.next/standalone/apps/blog-client', // Set working directory to the standalone output
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
      },
    },
  ],
}
